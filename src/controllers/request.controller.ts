import { Request, Response, NextFunction } from "express";
import { NotAcceptable, BadRequest, Conflict } from "http-errors";
import {
  RequestSchema,
  BookingSchema,
  UserSchema,
  AssignArtistSchema,
} from "../models";
import { requestMessage } from "../resultMessage";
class RequestController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { requestType, receiverUserId, senderUserId, details } = req.body;
      if (!receiverUserId || !senderUserId || !requestType)
        throw new BadRequest(requestMessage.error.allField);
      const createRequest = await RequestSchema.create({
        requestType,
        receiverUser: receiverUserId,
        senderUser: senderUserId,
        details,
        timestamp: new Date(),
      });
      if (!createRequest)
        throw new NotAcceptable(requestMessage.error.notCreated);
      res.json({
        success: {
          message: requestMessage.success.created,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  public async getRequestReceiver(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { receiverUserId } = req.params;
      if (!receiverUserId) throw new BadRequest(requestMessage.error.allField);
      const requestReceiver = await RequestSchema.find({
        receiverUser: receiverUserId,
      })
        .populate("senderUser")
        .populate("booking")
        .populate({
          path: "reschedule",
          select: "rescheduleDate rescheduleBy",
        });
      const findUser: any = await UserSchema.findById(receiverUserId);
      if (findUser?.role === "manager") {
        const findAssignArtist = await AssignArtistSchema.findOne({
          manager: receiverUserId,
        }).select("artists.artist -_id");
        const mapArtist = findAssignArtist?.artists.map(
          (artist: any) => artist.artist
        );
        const requestArtistReceiver = await RequestSchema.find({
          receiverUser: { $in: mapArtist },
          requestType: { $ne: "manager" },
        })
          .populate("senderUser")
          .populate("receiverUser");
        const makeTogether = [...requestReceiver, ...requestArtistReceiver];
        return res.json({
          success: {
            data: makeTogether,
          },
        });
      }
      return res.json({
        success: {
          data: requestReceiver,
        },
      });
    } catch (error: any) {
      if (error?.path === "receiverUser")
        return res.json({
          success: {
            data: [],
          },
        });
      next(error);
    }
  }
  public async getRequestSender(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { senderUserId } = req.params;
      if (!senderUserId) throw new BadRequest(requestMessage.error.allField);
      const requestSender = await RequestSchema.find({
        senderUser: senderUserId,
      })
        .populate("receiverUser")
        .populate("booking")
        .populate({
          path: "reschedule",
          select: "rescheduleDate rescheduleBy",
        });
      res.json({
        success: {
          data: requestSender,
        },
      });
    } catch (error: any) {
      if (error?.path === "senderUser")
        return res.json({
          success: {
            data: [],
          },
        });
      next(error);
    }
  }
  public async acceptPriceSet(req: Request, res: Response, next: NextFunction) {
    try {
      const { requestId, price } = req.body;
      if (!requestId || !price)
        throw new BadRequest(requestMessage.error.allField);
      const findRequest = await RequestSchema.findById(requestId);
      if (!findRequest)
        throw new Conflict(requestMessage.error.requestNotFound);
      const findUpdateBooking = await BookingSchema.findByIdAndUpdate(
        findRequest.booking,
        {
          bookingPrice: price,
        }
      );
      if (!findUpdateBooking)
        throw new Conflict(requestMessage.error.bookingPriceNotUpdated);
      const deleteRequest = await RequestSchema.findByIdAndUpdate(requestId, {
        status: "accept",
      });
      if (!deleteRequest)
        throw new Conflict(requestMessage.error.requestNotDeleted);
      // notification mail send to user
      res.json({
        success: {
          message: requestMessage.success.acceptPriceSet,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
export default RequestController;
