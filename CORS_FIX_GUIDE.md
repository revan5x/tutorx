# CORS Fix for Backend at tutor-sphere-server-side.vercel.app

## The Problem
Your frontend at `https://tutorx.vercel.app` is being blocked by CORS when trying to access the backend at `https://tutor-sphere-server-side.vercel.app`.

## The Solution
You need to update the CORS configuration in your backend code that's deployed at `tutor-sphere-server-side.vercel.app`.

## CORS Configuration to Add/Update

Add this CORS configuration to your backend server (usually in the main server file, like `index.js` or `server.js`):

```javascript
const cors = require("cors");

// CORS configuration - Allow all Vercel deployments
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, curl, etc.)
    if (!origin) {
      return callback(null, true);
    }
    
    // Allow all Vercel deployments (production)
    if (origin && origin.endsWith(".vercel.app")) {
      return callback(null, true);
    }
    
    // Allow localhost (development)
    if (origin && (origin.startsWith("http://localhost") || origin.startsWith("https://localhost"))) {
      return callback(null, true);
    }
    
    // Allow specific production domains
    const allowedOrigins = [
      "https://tutor-sphere-client-side.vercel.app",
      "https://tutorx.vercel.app"
    ];
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // Default: allow (most permissive)
    callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: [
    "Content-Type", 
    "Authorization", 
    "X-Requested-With", 
    "Accept", 
    "Origin",
    "Access-Control-Request-Method",
    "Access-Control-Request-Headers"
  ],
  exposedHeaders: ["Content-Length", "Content-Type"],
  preflightContinue: false,
  optionsSuccessStatus: 204
};

// Apply CORS middleware - MUST be before any routes
app.use(cors(corsOptions));

// Additional CORS headers middleware (ensures headers are always set)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  // Set CORS headers for all requests
  if (origin && (origin.endsWith(".vercel.app") || origin.startsWith("http://localhost") || origin.includes("localhost"))) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Accept, Origin, Access-Control-Request-Method, Access-Control-Request-Headers");
  }
  
  next();
});

// Explicit OPTIONS handler for all routes (catches preflight requests)
app.options("*", (req, res) => {
  const origin = req.headers.origin;
  if (origin) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Accept, Origin, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.header("Access-Control-Max-Age", "86400"); // 24 hours
  }
  res.status(204).send();
});
```

## Steps to Fix

1. **Find your backend repository** that deploys to `tutor-sphere-server-side.vercel.app`
2. **Update the CORS configuration** using the code above
3. **Make sure CORS middleware is applied BEFORE any routes**
4. **Commit and push** to trigger a new deployment
5. **Wait for Vercel to redeploy** (check Vercel dashboard)

## Quick Test

After deploying, test if CORS is working:
```bash
curl -X OPTIONS https://tutor-sphere-server-side.vercel.app/logout \
  -H "Origin: https://tutorx.vercel.app" \
  -H "Access-Control-Request-Method: POST" \
  -v
```

You should see `Access-Control-Allow-Origin: https://tutorx.vercel.app` in the response headers.

## Important Notes

- The CORS middleware **MUST** be placed **BEFORE** all your route definitions
- The `app.options("*")` handler should be added right after CORS middleware
- Make sure to install `cors` package: `npm install cors`

