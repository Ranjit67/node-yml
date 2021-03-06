import { ObjectId, Document } from "mongoose";

export type userStatus =
  | "active"
  | "inactive"
  | "blocked"
  | "pending"
  | "not-verify";
export type userRole = "admin" | "user" | "artist" | "manager";
export type gender = "Male" | "Female";

export interface UserModel extends Document {
  profileImageRef: string;
  artistMedia: ObjectId;
  events: ObjectId[];
  services: ObjectId[];
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
  location: {
    lat: number;
    lng: number;
    address: string;
    country: string;
  };
  profileImageUrl: string;
  yearsOfExperience: string;
  inTopSearches: Boolean;
  inTopTrending: Boolean;
  bio: String;
  fcmToken: string;
  Dob: Date;
  ratings: number;
  minPrice: number;
  maxPrice: number;
  pricing: Object;
  timestamp: Date;
}
