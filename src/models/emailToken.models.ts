import { Document, Schema, model, ObjectId } from "mongoose";

export interface emailTokenModel extends Document {
  userRef: ObjectId;
  emailTokenString: string;
}

const emailTokenSchema = new Schema({
  userRef: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  emailTokenString: {
    type: String,
  },
});
const EmailToken = model<emailTokenModel>("EmailToken", emailTokenSchema);

export default EmailToken;
