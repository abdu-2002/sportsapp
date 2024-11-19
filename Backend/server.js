const express = require('express');
const connectDB = require('./config/db');
const cors = require("cors");
const dotenv = require('dotenv');

const app = express();
dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

const authRoutes = require('./routes/authRoutes');
const teamRoutes = require('./routes/teamRoutes');
const playerRoutes = require('./routes/playerRoutes');
const fixtureRoutes = require('./routes/fixtureRoutes');
const attendanceRoutes = require('./routes/attendance');

app.use('/api/auth', authRoutes);
app.use('/api', teamRoutes);
app.use('/api', playerRoutes);
app.use('/api', fixtureRoutes);
app.use('/api', attendanceRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
