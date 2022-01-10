import {Document,Schema,model,ObjectId} from "mongoose";

export interface userModel extends Document {
    profileImageFileName: string;
   
    // artistPastEventRef: ObjectId;
    // eventTypeArray: ObjectId[];
    languageArray: ObjectId[];
   
    countryCode: string;
    mobileNumber: string;
    displayName: string;
    email: string;
    password: string;
    role: string;
    
    // professionArray: ObjectId[]; //category data
    gender:string;
    countryName:string;
    profileImageUrl:string;
    
    yearOfExperience:string;
    
    isRequestAccepted: boolean;
    isEmailVerify:boolean;
    fcmToken: string;
    isBlocked: boolean;
    isDeleted: boolean;
    timestamp: Date;


}

const userSchema = new Schema({
    profileImageFileName:{
        type:String,
    },
    fcmToken: {
        type:String, 
    },
    // artistPastEventRef: string;
    // eventTypeArray: string[];
    languageArray: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Language"
        }]
    },
    isBlocked: {
        type:Boolean,
        default:false,
    },
    isDeleted: {
        type:Boolean,
        default:false,
    },
    countryCode: {
        type:String,
    },
    mobileNumber: {
        type:String,
    },
    displayName: {
        type:String,
    },
    email: {
        type:String,
        unique:true,
    },
    password: {
        type:String,
    },
    role: {
        type:String,
    },
    isRequestAccepted: {
        type:Boolean,
        default:false,
    },
    // professionArray: string[]; //category data
    gender:{
        type:String,
    },
    countryName:{
        type:String,
    },
    profileImageUrl:{
        type:String,
    },
    isEmailVerify:{
        type:Boolean,
        default:false,
    },
    yearOfExperience:{
        type:String,
    },
    timestamp:{
        type:Date,
        default:new Date().toString(),
    }
})

const UserSchema = model<userModel>("User",userSchema);
export default UserSchema;