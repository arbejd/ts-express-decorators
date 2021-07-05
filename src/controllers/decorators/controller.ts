import { Router } from "../../utils/server";
import { AppRouter } from "../../utils/appRouter";
import { Methods } from "./methods";
import { MetadataKeys } from "./metadataKeys";
import { validatorMiddleware } from "./bodyValidator";

/**
 * Harvest metadata from other decorators and sets up the router
 * @param routePrefix prefixed to the specific route definitions
 */
export function controller(routePrefix: string) {
  return function (target: Function) {
    const router: Router = AppRouter.instance;
    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];

      const path: String = Reflect.getMetadata(MetadataKeys.PATH, target.prototype, key);
      const method: Methods = Reflect.getMetadata(MetadataKeys.METHOD, target.prototype, key);
      const middlewares = Reflect.getMetadata(MetadataKeys.MIDDLEWARE, target.prototype, key) || [];
      const validatorProps: string[] =
        Reflect.getMetadata(MetadataKeys.VALIDATOR, target.prototype, key) || [];

      const validator = validatorMiddleware(validatorProps);

      if (path) {
        router[method](`${routePrefix}${path}`, ...middlewares, validator, routeHandler);
      }
    }
  };
}
