import { Document, Schema, model, ObjectId } from "mongoose";

export interface ArtistAvailabilityModel extends Document {
  artistRef: ObjectId;
  availabilities: [
    {
      isBlocked: boolean;
      date: Date;
    }
  ];
}
const artistAvailabilitySchema = new Schema({
  artistRef: {
    type: Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
  availabilities: [
    {
      isBlocked: {
        type: Boolean,
        default: false,
      },
      date: {
        type: Date,
      },
    },
  ],
});
const ArtistAvailabilitySchema = model<ArtistAvailabilityModel>(
  "ArtistAvailability",
  artistAvailabilitySchema
);
export default ArtistAvailabilitySchema;
