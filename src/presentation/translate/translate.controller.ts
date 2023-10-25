import { Request, Response } from "express";
import { translate } from "./translate.service";

export class TranslateController {
  constructor() {}

  async translate(req: Request, res: Response) {
    const { fromLanguage, toLanguage, text } = req.body;
    try {
      const result = await translate({
        fromLanguage,
        toLanguage,
        text,
      });
      res.status(200).json({ result });
    } catch (error) {
      //console.log(error);
      res.status(500).json({ error: "Something went wrong" });
    }
  }
}
