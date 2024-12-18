const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const employeeRoutes = require('./routes/employeeRoutes');  // Adjust the path to where employeeRoutes is located

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Register employee routes
app.use('/api/employees', employeeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
