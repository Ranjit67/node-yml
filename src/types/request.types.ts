export type requestType =
  | "manager"
  | "pricing"
  | "rescheduledCustomer"
  | "rescheduledArtist"
  | "personalize";

export type requestStatus = "pending" | "accept" | "reject";
