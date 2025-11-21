const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");
const router = require("./routes/activityRoutes.js");
const authRoutes = require("./routes/authRoutes.js");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use("/api/activities", router);
app.use("/api/auth", authRoutes);

connectDB();

app.get('/', (req, res) => {
    res.send("Ecotrack Server is up ....");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));