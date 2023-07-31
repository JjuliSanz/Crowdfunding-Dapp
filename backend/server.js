// const mongoose = require("mongoose");
// const next = require("next");
// const dotenv = require("dotenv");

// const dev = process.env.NODE_ENV !== "production";
// const nextServer = next({ dev });
// const handle = nextServer.getRequestHandler();

// dotenv.config();
// const app = require("./Api/app");

// const DB = process.env.MONGODB_URI;
// const port = parseInt(process.env.PORT, 10) || 3000;

// const startServer = async () => {
//   try {
//     // Conexión a la base de datos
//     await mongoose.connect(DB);
//     console.log("DB connection successful!");

//     // Preparar el servidor Next.js
//     await nextServer.prepare();

//     // Configurar las rutas de Next.js
//     app.get("*", (req, res) => {
//       return handle(req, res);
//     });

//     // Iniciar el servidor de Express
//     app.listen(port, "0.0.0.0", () => {
//       console.log(`App running on port ${port}...`);
//     });
//   } catch (error) {
//     // Capturar y manejar errores
//     console.error("Error en la inicialización del servidor:", error);
//   }
// };

// startServer();

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
  origin: "https://crowdfunding-web3-swart.vercel.app",
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

