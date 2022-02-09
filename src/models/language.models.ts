import { Schema, model } from "mongoose";

import { LanguageModel } from "../types";

const languageSchema = new Schema<LanguageModel>({
  languageName: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: new Date(),
  },
});

const LanguageSchema = model<LanguageModel>("Language", languageSchema);
export default LanguageSchema;
