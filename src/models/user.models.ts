import { Schema, model } from "mongoose";
import { UserModel } from "../types";

const userSchema = new Schema<UserModel>({
  profileImageRef: String,
  artistMedia: {
    type: Schema.Types.ObjectId,
    ref: "ArtistMedia",
  },
  events: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
  ],

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
  bio: {
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
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
    address: {
      type: String,
    },
    country: {
      type: String,
    },
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
  inTopSearches: {
    type: Boolean,
    default: false,
  },
  inTopTrending: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: Date,
    default: new Date(),
  },
});

const UserSchema = model<UserModel>("User", userSchema);
export default UserSchema;
