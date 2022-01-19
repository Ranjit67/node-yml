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
export { default as ReviewModel } from "./review.types";
export { default as WalletModel } from "./wallet.types";
export {
  default as WalletHistoryModel,
  transaction,
} from "./walletHistory.types";
export { default as CrowdModel } from "./crowd.types";
