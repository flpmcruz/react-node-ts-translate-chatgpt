import { config } from "./config";
import { Server } from "./presentation/server";
import express from "express";
import { TranslateController } from "./presentation/translate/translate.controller";

(() => main())();

function main() {
  const app = express();
  const translateController = new TranslateController();
  const server = new Server(config.PORT, app, translateController);
  server.start();
}
