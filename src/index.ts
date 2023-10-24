import { config } from "./config";
import { Server } from "./presentation/server";
import express from "express";
import { TranslateController } from "./presentation/translate/translate.controller";
import { TranslateService } from "./presentation/translate/translate.service";

(() => main())();

function main() {
  const app = express();
  const translateService = new TranslateService();
  const translateController = new TranslateController(translateService);

  const server = new Server(config.PORT, app, translateController);
  server.start();
}
