import morgan from "morgan";
import app from "./app.js";

app.disable("x-powered-by");

app.use(morgan("dev"));
