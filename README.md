# Backend Server Setup

## Prerequisites
- Node.js installed
- MongoDB running (local or cloud)

## Setup Instructions

1. **Install dependencies** (if not already installed):
   ```bash
   npm install
   ```

2. **Create a `.env` file** in the backend directory with your MongoDB connection string:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```

3. **Start the server**:
   ```bash
   npm start
   ```
   Or:
   ```bash
   node index.js
   ```

4. **Verify the server is running**:
   - Open browser: http://localhost:5000/health
   - Should see: `{"status":"healthy","timestamp":"..."}`

## API Endpoints

- `GET /` - Server status
- `GET /health` - Health check
- `GET /tutors` - Get all tutors (from MongoDB)
- `POST /tutors` - Create a new tutor (save to MongoDB)
- `GET /tutors/email/:email` - Get tutors by email (from MongoDB)
- `GET /tutors/:id` - Get tutor by ID (from MongoDB)
- `GET /tutorial/:id` - Get tutorial by ID (from MongoDB)
- `PUT /tutorial/:id` - Update tutorial (in MongoDB)
- `DELETE /tutorial/:id` - Delete tutorial (from MongoDB)

## Troubleshooting

### Port 5000 already in use?
Change the PORT in `.env` file or kill the process using port 5000.

### MongoDB connection error?
- Make sure MongoDB is running
- Check your MONGODB_URI in `.env` file
- For local MongoDB: `mongodb://localhost:27017/tutorx`

### CORS errors?
The server is configured to allow all origins in development mode. Make sure the server is running before testing the frontend.

