import express from "express";
import cors from "cors";
import { TranslateController } from "./translate/translate.controller";

export class Server {
  constructor(
    public readonly port: number,
    public readonly app = express(),
    public readonly translateController: TranslateController
  ) {}

  start() {
    // Middlewares
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Routes
    this.app.post("/api/v1/translate", this.translateController.translate);

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
