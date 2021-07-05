import request from "supertest";
import { createServer, Server } from "../utils/server";
let server: Server;
let sendObject: { email?: string; password?: string };

describe("/auth", () => {
  beforeAll(async () => {
    server = await createServer();
  });

  describe("GET /login", () => {
    it("should give a basic form", async () => {
      const response: any = await request(server).get("/auth/login");

      const htmlReg = /<\/?[a-z][\s\S]*>/i;

      expect(response.text).not.toBeNull();
      expect(response.text).toMatch(htmlReg);
    });
  });

  describe("POST /login", () => {
    it("should accept a post with an email and password", async () => {
      sendObject = { email: "email", password: "pass" };
      const response: any = await request(server).post("/auth/login").send(sendObject);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ ...sendObject, checked: true });
    });
    it("should reject a post without an email", async () => {
      sendObject = { password: "pass" };
      const response: any = await request(server).post("/auth/login").send(sendObject);
      expect(response.status).toBe(422);
    });
    it("should reject a post without a password", async () => {
      sendObject = { email: "email" };
      const response: any = await request(server).post("/auth/login").send(sendObject);
      expect(response.status).toBe(422);
    });
    it("should perform the template logging", async () => {
      const spy = jest.spyOn(console, "info");

      sendObject = { email: "email", password: "pass" };
      const response: any = await request(server).post("/auth/login").send(sendObject);
      expect(spy).toHaveBeenCalled();
    });
  });
});
