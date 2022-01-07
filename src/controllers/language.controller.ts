import {Request,Response,NextFunction} from "express"
import {BadRequest,GatewayTimeout}  from "http-errors"
import {LanguageSchema} from "../models"
class LanguageController{
    public async create(req:Request,res:Response,next:NextFunction){
      try {
          const {languageName} = req.body
          if(!languageName) throw new BadRequest("Language name is required")
          const languageSave = await LanguageSchema.create({languageName})
          if(!languageSave) throw new GatewayTimeout("Language is not created")
          res.json({data:"Language is added successfully."}) 
      } catch (error) {
          next(error)
      }

    }

    public async getAll(req:Request,res:Response,next:NextFunction){
        try {
            const findAllLanguage = await LanguageSchema.find()
            res.json({data:findAllLanguage})
        } catch (error) {
            next(error)
        }

    }

    public async getOne(req:Request,res:Response,next:NextFunction){
        try {
            const {id} = req.params
            const findOneLanguage = await LanguageSchema.findById(id)
            res.json({data:findOneLanguage})
        } catch (error) {
            next(error)
        }

    }

    public async update(req:Request,res:Response,next:NextFunction){
        try {
            const {languageName,language_id} = req.body
            if(!languageName || !language_id) throw new BadRequest("All fields are required.")
            const updateLanguage = await LanguageSchema.findByIdAndUpdate(language_id,{languageName})
            if(!updateLanguage) throw new GatewayTimeout("Language is not updated.")
            res.json({data:"Language is updated successfully."})
        } catch (error) {
            next(error)
        }

    }
    public async delete(req:Request,res:Response,next:NextFunction){
        try {
            const {language_idsOrId} = req.body
            if(!language_idsOrId?.length  ) throw new BadRequest("Language id or ids are required field.")
            if(Array.isArray(language_idsOrId)){
                const deleteLanguage = await LanguageSchema.deleteMany({_id:{$in:language_idsOrId}})
                if(!deleteLanguage) throw new GatewayTimeout("Language is not deleted.")
                res.json({data:"Languages are deleted successfully."})
            }else{
                const deleteLanguage = await LanguageSchema.findOneAndDelete({_id:language_idsOrId})
                if(!deleteLanguage) throw new GatewayTimeout("Language is not deleted.")
                res.json({data:"Language is deleted successfully."})
            }
           
        } catch (error) {
            next(error)
        }

    }
    
    
}
export default LanguageController;