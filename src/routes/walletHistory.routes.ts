import { Router } from "express";
import { WalletHistory } from "../controllers";

class WalletHistoryRoute {
  public router = Router();
  public path = "/wallet-history";
  private walletHistory = new WalletHistory();
  constructor() {
    this.routes();
  }
  private routes() {
    this.router.get(
      "/all-wallet-history/:userId",
      this.walletHistory.getWalletHistory
    );
    this.router.post(
      "/transaction-details",
      this.walletHistory.transactionDetails
    );
  }
}

export default WalletHistoryRoute;
