import { MetadataKeys } from "./metadataKeys";
import { RequestHandler, Request, Response, NextFunction } from "../../utils/server";

/**
 *
 * @param keys string of arguments to test
 * @returns decorator that defines metadata
 */
export function bodyValidator(...keys: string[]) {
  return function (target: any, key: string) {
    Reflect.defineMetadata(MetadataKeys.VALIDATOR, keys, target, key);
  };
}

/**
 * Middleware for quick validation
 * @param keys: strings to be tested for availability on req.body
 */
export function validatorMiddleware(keys: string[]): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      res.status(422).send("invalid request");
      return;
    }
    for (let key of keys) {
      if (!req.body[key]) {
        res.status(422).send(`missing ${key} in request`);
        return;
      }
    }
    next();
  };
}
