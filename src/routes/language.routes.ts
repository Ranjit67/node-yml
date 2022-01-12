import { Router } from "express";
import { LanguageController } from "../controllers";

class LanguageRoute {
  public router = Router();
  public path = "/language";
  private languageController = new LanguageController();
  constructor() {
    this.routes();
  }
  private routes() {
    this.router.post("/create", this.languageController.create);
    this.router.get("/all-language", this.languageController.getAll);
    this.router.put("/update", this.languageController.update);
    this.router.delete("/delete", this.languageController.delete);
    this.router.get("/all-language/:id", this.languageController.getOne);
  }
}
export default LanguageRoute;
