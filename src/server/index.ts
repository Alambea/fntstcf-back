import morgan from "morgan";
import cors, { type CorsOptions } from "cors";
import app from "./app.js";
import {
  endpointNotFound,
  generalErrorHandler,
} from "./middlewares/errors/errorsMiddlewares.js";
import pingRouter from "./features/ping/router/pingRouter.js";
import usersRouter from "./features/user/router/usersRouter.js";

const originProduction = process.env.ALLOW_ORIGIN_PRODUCTION!;
const originLocal = process.env.ALLOW_ORIGIN_LOCAL!;
const corsOptions: CorsOptions = {
  origin: [originProduction, originLocal],
};

app.use(morgan("dev"));
app.use(cors(corsOptions));

app.use("/", pingRouter);
app.use("/users", usersRouter);

app.use(endpointNotFound);
app.use(generalErrorHandler);
