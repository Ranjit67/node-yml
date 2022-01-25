import { Document, Schema, model, ObjectId } from "mongoose";
import { userStatus, userRole, gender } from "../types";

export interface userModel extends Document {
  profileImageRef: string;
  artistPastEvent: ObjectId;
  eventTypes: ObjectId[];
  //
  category: ObjectId;
  genres: ObjectId[];
  subcategories: ObjectId[];
  //

  languages: ObjectId[];
  countryCode: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: userRole;
  status: userStatus;
  gender: gender;
  location: string;
  profileImageUrl: string;
  yearsOfExperience: string;

  fcmToken: string;
  Dob: Date;
  timestamp: Date;
}

const userSchema = new Schema({
  profileImageRef: String,
  // artistPastEvent: ObjectId;
  // eventTypes: ObjectId[];

  subcategories: [
    {
      type: Schema.Types.ObjectId,
      ref: "SubCategory",
    },
  ],
  genres: [
    {
      type: Schema.Types.ObjectId,
      ref: "Genres",
    },
  ],
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },

  languages: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Language",
      },
    ],
  },
  countryCode: {
    type: String,
  },
  phoneNumber: {
    // required: true,
    unique: true,
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    required: true,
    unique: true,
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
  },
  status: {
    type: String,
    default: "not-verify",
  },
  gender: {
    type: String,
  },
  location: {
    type: String,
  },
  profileImageUrl: {
    type: String,
  },
  yearsOfExperience: {
    type: String,
  },
  fcmToken: {
    type: String,
  },
  Dob: {
    type: Date,
  },
  timestamp: {
    type: Date,
    default: new Date().toString(),
  },
});

const UserSchema = model<userModel>("User", userSchema);
export default UserSchema;
