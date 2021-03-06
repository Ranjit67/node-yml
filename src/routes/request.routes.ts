import { Router } from "express";
import { RequestController } from "../controllers";

class RequestRouter {
  public router = Router();
  public path = "/request";
  private requestController = new RequestController();
  constructor() {
    this.routes();
  }
  private routes() {
    this.router.post("/create", this.requestController.create);
    this.router.get(
      "/all-request-receiver/:receiverUserId",
      this.requestController.getRequestReceiver
    );
    this.router.get(
      "/all-request-sender/:senderUserId",
      this.requestController.getRequestSender
    );
    this.router.post(
      "/accept-price-set",
      this.requestController.acceptPriceSet
    );
    this.router.post(
      "/payment-booking-accept-reject-artist",
      this.requestController.paymentBookingAcceptRejectArtist
    );
    this.router.post(
      "/manager-remove",
      this.requestController.createMangerRemoveRequest
    );
    this.router.put(
      "/accept-reject",
      this.requestController.acceptRejectRequest
    );
    this.router.put(
      "/reject-and-accept",
      this.requestController.requestTracker
    );
    this.router.post("/delete", this.requestController.delete);
  }
}
export default RequestRouter;
