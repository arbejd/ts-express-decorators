import { Request, Response } from "../utils/server";
import { get, controller, bodyValidator, post, use } from "./decorators";
import { logger } from "../middleware/logger";

@controller("/auth")
class LoginController {
  @get("/login")
  getLogin(req: Request, res: Response): void {
    res.send(`<form method="POST">
          <div>
          <label>Email</label>
          <input name="email"/>
          </div>
          <div><input name="password" type="password"/>
          </div>
          <button>Submit</button>
          </form>
          `);
  }

  @use(logger)
  @post("/login")
  @bodyValidator("email", "password")
  postLogin(req: Request, res: Response): void {
    const { email, password } = req.body;
    res.send({ email, password, checked: true });
  }
}
