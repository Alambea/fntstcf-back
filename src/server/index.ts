import morgan from "morgan";
import cors, { type CorsOptions } from "cors";
import app from "./app.js";

const originProduction = process.env.ALLOW_ORIGIN_PRODUCTION!;
const originLocal = process.env.ALLOW_ORIGIN_LOCAL!;

const corsOptions: CorsOptions = {
  origin: [originProduction, originLocal],
};

app.use(morgan("dev"));
app.use(cors(corsOptions));
