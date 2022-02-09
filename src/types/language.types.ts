import { Document } from "mongoose";

export interface LanguageModel extends Document {
  languageName: string;
  timestamp: Date;
}
