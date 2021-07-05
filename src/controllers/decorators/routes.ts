import "reflect-metadata";
import { Methods } from "./methods";
import { MetadataKeys } from "./metadataKeys";
import { RequestHandler } from "./../../utils/server";

interface RouteHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}
/**
 * higher order function to make functions define metadata
 * @param method CRUD/REST standard {@link Methods}
 * @returns decorated
 */
function operation(method: string) {
  return function (path: string) {
    return function (target: any, key: string, desc: RouteHandlerDescriptor) {
      Reflect.defineMetadata(MetadataKeys.PATH, path, target, key);
      Reflect.defineMetadata(MetadataKeys.METHOD, method, target, key);
    };
  };
}

export const get = operation(Methods.GET);
export const put = operation(Methods.PUT);
export const post = operation(Methods.POST);
export const del = operation(Methods.DEL);
export const patch = operation(Methods.PATCH);
