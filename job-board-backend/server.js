const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const morgan = require('morgan');
const connectDB = require("./config/db.js");

const app = express();


connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

if (process.env.NODE_ENV = "development" ){
   app.use(morgan('dev'));
}

// Create uploads directory if it doesn't exist
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}




const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});