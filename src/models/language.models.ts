import {Document,Schema,model} from "mongoose";

export interface languageModel extends Document {
    languageName: string;
    timestamp: Date;
}

const languageSchema=new Schema({
    languageName:{
        type:String,
        required:true
    },
    timestamp:{
        type:Date,
        default:new Date().toString(),
    }
})

const LanguageSchema = model<languageModel>("Language",languageSchema)
export default LanguageSchema