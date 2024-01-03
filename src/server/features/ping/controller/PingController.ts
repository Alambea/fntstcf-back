import { type NextFunction, type Request, type Response } from "express";

class PingController {
  getPong(_req: Request, res: Response, _next: NextFunction) {
    res.status(200).json({ message: "🏓" });
  }
}

export default PingController;
