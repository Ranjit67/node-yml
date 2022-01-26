import { NotificationSchema } from "../models";

class NotificationServices {
  public notificationGenerate(
    sendTo: string,
    receiveFromId: string,
    title: string,
    description: string,
    iconUrl: string
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

        resolve({
          message: "Notification send",
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}
export default NotificationServices;
