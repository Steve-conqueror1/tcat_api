import express from "express";
import dotenv from "dotenv";
import { authRouter, userRouter, emailRouter } from "./routes";
import { errorHandler } from "./middleware/errorHandler";
import cors from "cors";
import {undefinedRoute} from "./middleware/undefinedRoute";

const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

app.use(authRouter);
app.use(userRouter);
app.use(emailRouter);

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DATABASE_URL;

app.use(undefinedRoute)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
  console.log(`Server IP ${DB_URL}`);
});

