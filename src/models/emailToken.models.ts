import { Schema, model } from "mongoose";
import { EmailTokenModel } from "../types";

const emailTokenSchema = new Schema({
  userRef: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  emailTokenString: {
    type: String,
  },
});
const EmailToken = model<EmailTokenModel>("EmailToken", emailTokenSchema);

export default EmailToken;
