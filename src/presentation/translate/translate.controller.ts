import { Request, Response } from "express";
import { TranslateService } from "./translate.service";

export class TranslateController {
  constructor(public readonly translateService: TranslateService) {}

  translate(req: Request, res: Response) {
    res.json({ msg: "Hello World" });
  }
}
