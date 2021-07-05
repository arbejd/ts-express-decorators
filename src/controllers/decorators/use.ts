import { MetadataKeys } from "./metadataKeys";
import { RequestHandler } from "../../utils/server";

/**
 * attach middleware to selected method
 */
export function use(middleware: RequestHandler) {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    const middlewares = Reflect.getMetadata(MetadataKeys.MIDDLEWARE, target, key) || [];
    Reflect.defineMetadata(MetadataKeys.MIDDLEWARE, [...middlewares, middleware], target, key);
  };
}
