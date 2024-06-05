import express, { Express } from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import router from "./routes/index";
import AuthMiddleware from "./middlewares/authMiddleware";
import { ErrorHandlerMidleware } from "./middlewares/errorHandlerMiddleware";

export default class Server {
  private app: Express;
  private port: number | null = null;

  constructor() {
    this.app = express();
  }

  private configEnvironment(): void {
    config();
    this.port = Number(process.env.PORT) ?? 3000;
  }

  private configMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(AuthMiddleware);
  }

  public start(): void {
    this.configEnvironment();
    this.configMiddlewares();

    this.app.use("/api", router);

    this.app.use(ErrorHandlerMidleware);
    this.app.listen(this.port, () => {
      console.log(`Server running on http://localhost:${this.port}`);
    });
  }
}
