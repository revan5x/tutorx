const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const corsOptions = {
  origin: process.env.NODE_ENV === "production" 
    ? [
        "https://tutor-sphere-client-side.vercel.app",
        "https://tutorx.vercel.app",
        "https://tutorx-*.vercel.app" // Allow all Vercel preview deployments
      ]
    : true, // Allow all origins in development
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  exposedHeaders: ["Content-Length", "Content-Type"],
  preflightContinue: false,
  optionsSuccessStatus: 204
};
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is not set in environment variables!");
  console.log("💡 Please create a .env file in the backend directory with:");
  console.log("   MONGODB_URI=your_mongodb_connection_string");
  console.log("⚠️  Server will start but database operations will fail.");
}

mongoose.connect(MONGODB_URI || "mongodb://localhost:27017/tutorx", { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => {
  console.log("✅ MongoDB connected successfully");
  console.log("📊 Database:", mongoose.connection.name);
  console.log("🌐 Host:", mongoose.connection.host);
})
.catch((error) => {
  console.error("❌ MongoDB connection error:", error.message);
  console.log("⚠️  Server will continue but database operations may fail.");
  console.log("💡 Make sure MONGODB_URI is set correctly in .env file");
  console.log("💡 Example: MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/dbname");
});

// Tutorial schema/model with proper validation
const tutorSchema = new mongoose.Schema({
  // Required fields
  title: {
    type: String,
    required: [true, "Tutorial title is required"],
    trim: true,
    minlength: [3, "Title must be at least 3 characters long"]
  },
  tutorName: {
    type: String,
    required: [true, "Tutor name is required"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"]
  },
  image: {
    type: String,
    required: [true, "Image is required"],
    trim: true
  },
  language: {
    type: String,
    required: [true, "Language is required"],
    trim: true
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price cannot be negative"]
  },
  description: {
    type: String,
    trim: true,
    default: ""
  },
  review: {
    type: Number,
    default: 0,
    min: [0, "Review cannot be negative"],
    max: [5, "Review cannot exceed 5"]
  },
  // Optional fields
  video: {
    type: String,
    default: ""
  },
  videoLink: {
    type: String,
    trim: true,
    default: ""
  },
  // Keep old fields for backward compatibility
  name: {
    type: String,
    trim: true
  },
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // Automatically manage createdAt and updatedAt
});

// Create indexes for better query performance
tutorSchema.index({ email: 1 });
tutorSchema.index({ language: 1 });
tutorSchema.index({ createdAt: -1 });

const Tutor = mongoose.model("Tutor", tutorSchema);

// API endpoints
app.get("/api/tutors", async (req, res) => {
  try {
    const tutors = await Tutor.find();
    res.json(tutors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/tutors", async (req, res) => {
  try {
    // Validate required fields
    const { title, tutorName, email, image, language, price } = req.body;
    
    if (!title || !tutorName || !email || !image || !language || price === undefined) {
      return res.status(400).json({ 
        error: "Missing required fields", 
        required: ["title", "tutorName", "email", "image", "language", "price"] 
      });
    }

    // Create new tutorial
    const tutor = new Tutor({
      title: title.trim(),
      tutorName: tutorName.trim(),
      email: email.toLowerCase().trim(),
      image: image.trim(),
      language: language.trim(),
      price: parseFloat(price),
      description: req.body.description || "",
      review: req.body.review || 0,
      video: req.body.video || "",
      videoLink: req.body.videoLink || "",
      name: req.body.name || tutorName.trim()
    });

    // Save to MongoDB
    const savedTutor = await tutor.save();
    console.log(`✅ Tutorial saved to MongoDB via /api: ${savedTutor._id} - ${savedTutor.title}`);
    
    res.status(201).json({ 
      ok: true, 
      message: "Tutorial saved successfully",
      tutor: savedTutor 
    });
  } catch (error) {
    console.error("❌ Error saving tutorial to MongoDB:", error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message || "Failed to save tutorial" });
  }
});

// Additional endpoints without /api prefix for compatibility
app.get("/tutors", async (req, res) => {
  try {
    // Fetch all tutorials from MongoDB, sorted by newest first
    const tutors = await Tutor.find().sort({ createdAt: -1 });
    console.log(`✅ Fetched ${tutors.length} tutorials from MongoDB`);
    res.json(tutors);
  } catch (error) {
    console.error("❌ Error fetching tutorials from MongoDB:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/tutors", async (req, res) => {
  try {
    // Validate required fields
    const { title, tutorName, email, image, language, price } = req.body;
    
    if (!title || !tutorName || !email || !image || !language || price === undefined) {
      return res.status(400).json({ 
        error: "Missing required fields", 
        required: ["title", "tutorName", "email", "image", "language", "price"] 
      });
    }

    // Create new tutorial
    const tutor = new Tutor({
      title: title.trim(),
      tutorName: tutorName.trim(),
      email: email.toLowerCase().trim(),
      image: image.trim(),
      language: language.trim(),
      price: parseFloat(price),
      description: req.body.description || "",
      review: req.body.review || 0,
      video: req.body.video || "",
      videoLink: req.body.videoLink || "",
      // Backward compatibility
      name: req.body.name || tutorName.trim()
    });

    // Save to MongoDB
    const savedTutor = await tutor.save();
    console.log(`✅ Tutorial saved to MongoDB: ${savedTutor._id} - ${savedTutor.title}`);
    
    res.status(201).json({ 
      ok: true, 
      message: "Tutorial saved successfully",
      tutor: savedTutor 
    });
  } catch (error) {
    console.error("❌ Error saving tutorial to MongoDB:", error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message || "Failed to save tutorial" });
  }
});

// Get tutorials by email - MUST be before /tutors/:id route
app.get("/tutors/email/:email", async (req, res) => {
  try {
    const email = decodeURIComponent(req.params.email).toLowerCase().trim();
    // Fetch from MongoDB
    const tutors = await Tutor.find({ email: email }).sort({ createdAt: -1 });
    console.log(`✅ Fetched ${tutors.length} tutorials from MongoDB for email: ${email}`);
    res.json(tutors);
  } catch (error) {
    console.error("❌ Error fetching tutors from MongoDB:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get single tutor by ID - Must be after specific routes like /tutors/email/:email
app.get("/tutors/:id", async (req, res) => {
  try {
    // Fetch from MongoDB
    const tutor = await Tutor.findById(req.params.id);
    if (!tutor) {
      return res.status(404).json({ error: "Tutor not found in MongoDB" });
    }
    res.json(tutor);
  } catch (error) {
    console.error("❌ Error fetching tutor from MongoDB:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get tutorial by ID (alternative endpoint)
app.get("/tutorial/:id", async (req, res) => {
  try {
    // Fetch from MongoDB
    const tutor = await Tutor.findById(req.params.id);
    if (!tutor) {
      return res.status(404).json({ error: "Tutorial not found in MongoDB" });
    }
    res.json(tutor);
  } catch (error) {
    console.error("❌ Error fetching tutorial from MongoDB:", error);
    res.status(500).json({ error: error.message });
  }
});

// Update tutorial by ID
app.put("/tutorial/:id", async (req, res) => {
  try {
    // Update in MongoDB
    const tutor = await Tutor.findByIdAndUpdate(
      req.params.id, 
      { ...req.body, updatedAt: Date.now() }, 
      { new: true, runValidators: true }
    );
    
    if (!tutor) {
      return res.status(404).json({ error: "Tutorial not found in MongoDB" });
    }
    
    console.log(`✅ Tutorial updated in MongoDB: ${tutor._id}`);
    res.json({ modifiedCount: 1, tutor });
  } catch (error) {
    console.error("❌ Error updating tutorial in MongoDB:", error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
});

// Delete tutorial by ID
app.delete("/tutorial/:id", async (req, res) => {
  try {
    // Delete from MongoDB
    const result = await Tutor.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ error: "Tutorial not found in MongoDB" });
    }
    console.log(`✅ Tutorial deleted from MongoDB: ${req.params.id} - ${result.title || result.name}`);
    res.json({ 
      deletedCount: 1, 
      message: "Tutorial deleted successfully",
      deletedId: req.params.id,
      _id: result._id
    });
  } catch (error) {
    console.error("❌ Error deleting tutorial from MongoDB:", error);
    res.status(500).json({ error: error.message });
  }
});

// Alternative DELETE endpoint for /tutors/:id
app.delete("/tutors/:id", async (req, res) => {
  try {
    const result = await Tutor.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ error: "Tutorial not found in MongoDB" });
    }
    console.log(`✅ Tutorial deleted from MongoDB via /tutors/: ${req.params.id}`);
    res.json({ 
      deletedCount: 1, 
      message: "Tutorial deleted successfully",
      deletedId: req.params.id,
      _id: result._id
    });
  } catch (error) {
    console.error("❌ Error deleting tutorial from MongoDB:", error);
    res.status(500).json({ error: error.message });
  }
});

// Root endpoint to check if server is running
app.get("/", (req, res) => {
  res.json({ message: "TutorX Backend Server is running!", status: "OK" });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// MongoDB status endpoint
app.get("/health/db", async (req, res) => {
  try {
    const dbStatus = mongoose.connection.readyState;
    const statusMap = {
      0: "disconnected",
      1: "connected",
      2: "connecting",
      3: "disconnecting"
    };
    
    // Test query
    const count = await Tutor.countDocuments();
    
    res.json({
      status: "healthy",
      database: statusMap[dbStatus] || "unknown",
      connectionState: dbStatus,
      tutorialsCount: count,
      dbName: mongoose.connection.name,
      dbHost: mongoose.connection.host,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: "unhealthy",
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log(`Health check: http://localhost:${port}/health`);
  console.log(`API endpoints available at http://localhost:${port}/tutors`);
});
