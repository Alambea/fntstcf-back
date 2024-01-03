import morgan from "morgan";
import app from "./app.js";

app.use(morgan("dev"));
