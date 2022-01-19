import { Router } from "express";
import { WalletController } from "../controllers";

class WalletRoute {
  public router = Router();
  public path = "/wallet";
  private walletController = new WalletController();
  constructor() {
    this.routes();
  }
  private routes() {
    this.router.post("/create", this.walletController.create);
    this.router.get(
      "/get-wallet-balance/:userId",
      this.walletController.getWallet
    );
    // this.router.get("/all-wallet/:userId", this.getAllWallet);
    // this.router.get("/all-wallet-details/:walletId", this.getWalletDetails);
    // this.router.put("/delete", this.delete);
  }
}

export default WalletRoute;
