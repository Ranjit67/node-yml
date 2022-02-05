import { NotificationSchema, UserSchema } from "../models";
import { EmailService } from "../services";
import { BookingContent } from "../emailContent";
import { SERVER_KEY, FCM_PUSH_URL } from "../config";
import axios from "axios";

type notificationObject = {
  title: string;
  body: string;
  sound: string;
};
type emailMessageType = {
  subject: string;
  text: string;
};
class NotificationServices {
  public notificationGenerate(
    sendTo: string,
    receiveFromId: string,
    title: string,
    description: string,
    iconUrl: string,
    emailMessage: emailMessageType,
    notification: notificationObject | undefined = undefined
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const firstUpdateNotification = await NotificationSchema.updateOne(
          { user: sendTo },
          {
            $push: {
              notification: {
                receiveFrom: receiveFromId,
                title,
                description,
                iconUrl,
                timestamp: new Date(),
              },
            },
          },
          { upsert: true }
        );
        // console.log("firstUpdateNotification", firstUpdateNotification);
        const findUserData: any = await UserSchema.findOne({ _id: sendTo });

        const SendEmail = await new EmailService().emailSend(
          findUserData.email,
          emailMessage.subject,
          emailMessage.text
        );
        if (findUserData?.fcmToken && notification) {
          this.pushNotification(findUserData.fcmToken, notification);
        }

        resolve({
          message: "Notification send",
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  private async pushNotification(
    fcmToken: string,
    notification: notificationObject
  ) {
    const body = {
      to: fcmToken,
      data: { notification },
      notification,
      icon: "icon_name",
      tag: fcmToken,
      priority: "high",
    };
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "key=" + SERVER_KEY,
    };
    try {
      await axios.post(FCM_PUSH_URL, body, { headers });
    } catch (error: any) {
      new Error(error);
    }
  }
}
export default NotificationServices;
