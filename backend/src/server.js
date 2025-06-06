const app = require('./app');
const connectDB = require('./config/db');
require('dotenv').config();

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
