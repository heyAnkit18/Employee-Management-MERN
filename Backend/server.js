const express = require('express');
const cors = require('cors');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Use the employee routes
app.use('/api', employeeRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
