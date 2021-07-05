import express from "express";

/**
 * Singleton of router from {@link express}
 */
export class AppRouter {
  private static currInstance: express.Router;

  static get instance(): express.Router {
    if (!AppRouter.currInstance) {
      AppRouter.currInstance = express.Router();
    }
    return AppRouter.currInstance;
  }
}
