import express, { Application } from "express";
import cors from "cors";
import { BaseRouter } from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";

const app: Application = express();

//Parsers
app.use(cors());
app.use(express.json());

//Route
app.use(BaseRouter);

app.get("/", (req, res) => {
  res.send("Glassy server running");
});

//Global error handler
app.use(globalErrorHandler);

export default app;
