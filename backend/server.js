const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const nftRouter = require("./Routers/nftRouter");
const userRouter = require("./Routers/userRouter");


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const DB = process.env.MONGODB_URI;

const corsOptions = {
  origin: "https://crowdfunding-dapp-web3.vercel.app",
  credentials: true,
};

// Middleware
app.use(express.json({ limit: "100kb" }));
app.use(cors(corsOptions));
app.options("*", cors());

// Routes
app.use("/api/v1/nfts", nftRouter);
app.use("/api/v1/user", userRouter);

// Conexión a la base de datos
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successful!");

    // Iniciar el servidor de Express
    app.listen(port, "0.0.0.0", () => {
      console.log(`App running on port ${port}...`);
    });
  })
  .catch((error) => {
    console.error("DB connection error:", error);
  });

