import express, { Express } from "express";
import cookieSession from "cookie-session";
import { AppRouter } from "./appRouter";

import "../controllers/loginController";

export interface Server extends Express {}
export interface Router extends express.Router {}
export interface Response extends express.Response {}
export interface Request extends express.Request {}
export interface RequestHandler extends express.RequestHandler {}
export interface NextFunction extends express.NextFunction {}

/**
 * @returns promise with instance of a server
 */
export async function createServer(): Promise<Server> {
  const server = express();
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(cookieSession({ keys: ["genericstring"] }));
  server.use(AppRouter.instance);

  return server;
}
