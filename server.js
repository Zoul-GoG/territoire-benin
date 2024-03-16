import path from "path";
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import territoireRoutes from "./routes/territoire.routes.js";
import cors from 'cors'

/**
 * 
 *          SWAGGER DOC     
 * 
 * */
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger.json'  assert { type: "json" };
/* * 
 * 
 */



dotenv.config();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());


// CORS ERROR
var corsOptions = {
  origin: process.env.CORS_ORIGIN,
  optionsSuccessStatus: 200 
}
app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use("/territoire/v1", territoireRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(
  '/api/docs',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...!!");
  });
}

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5010;
const NODE_ENV = process.env.NODE_ENV || "development";

app.listen(
  PORT,
  console.log(`Server Running in ${NODE_ENV} mode on Port ${PORT}`.yellow.bold)
);
