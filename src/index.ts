import express from "express";
import dotenv from "dotenv";
import { authRouter, userRouter, emailRouter } from "./routes";
import { errorHandler, notFountHandler } from "./middleware/errorHandler";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cors({origin: "*", credentials: true}));
dotenv.config();

app.use(cookieParser())

// Logger
app.use(morgan("dev"))

app.use("/api/v1", authRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", emailRouter);

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DATABASE_URL;

app.use(notFountHandler)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
  console.log(`Server IP ${DB_URL}`);
});

