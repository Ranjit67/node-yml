export type userStatus =
  | "active"
  | "inactive"
  | "blocked"
  | "pending"
  | "not-verify";
export type userRole = "admin" | "user" | "artist" | "manager";
export type gender = "Male" | "Female";

export { default as SubCategoryModels } from "./subCategory.types";
export { default as GenresModels } from "./genres.types";
export { default as PricingModel } from "./pricing.types";
