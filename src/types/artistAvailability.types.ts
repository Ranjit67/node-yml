import { Document, ObjectId } from "mongoose";

export default interface ArtistAvailabilityModel extends Document {
  artistRef: ObjectId;
  availabilities: [
    {
      isBlocked: boolean;
      date: Date;
    }
  ];
}
