export type requestType =
  | "manager"
  | "pricing"
  | "rescheduledCustomer"
  | "rescheduledArtist"
  | "personalize"
  | "payment"
  | "managerRemove";

export type requestStatus = "pending" | "accept" | "reject";
