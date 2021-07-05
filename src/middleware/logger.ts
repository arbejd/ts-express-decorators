import { NextFunction, Request, Response } from "../utils/server";

export function logger(req: Request, res: Response, next: NextFunction) {
  console.info("template logging");
  next();
}
