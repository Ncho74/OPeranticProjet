import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model,PaginateModel} from 'mongoose';
import { Autor } from 'src/autor/autor/Schemas/autor.schema';
import { Citation, CitationDocument } from './Schemas/citation.schema';
import { CreateCitation } from './tdo/create.citation';
import { UpdateCitation } from './tdo/update.citation';
@Injectable()
export class CitationService {
    constructor(
        @InjectModel(Citation.name) private readonly model:Model<CitationDocument>,
        @InjectModel(Citation.name) private pag: PaginateModel<CitationDocument>,
        ) {}
  
    async findId(id:string):Promise<Citation>{
        return this.model.findById(id).exec()
    }
     async findAll(){
        return this.model.find().exec()
    }
    async count():Promise<number>{
        return this.model.count().exec()
    }
    async create(createCitation:CreateCitation):Promise<Citation>{
      
        return await new this.model({... createCitation,createdAt:Date(),}).save()
    
     
    }
    async update(id:string,updateCitation:UpdateCitation):Promise<Citation>{
    
  
       
      return await this.model.findByIdAndUpdate(id,updateCitation).exec();
    }
    async delete(id:string):Promise<Citation>{
      return  await this.model.findByIdAndDelete(id).exec()
    }
    async findOne(data:any):Promise<Citation>{
       return  await this.model.findOne(data)
    }
    async find(options:any):Promise<any>{
        return  await this.model.find(options).populate({
            path:"id_aut",
            select:'autor_name'
          });

    }
    async pagnition():Promise<any>{
        return  await this.pag.find({},  {
            page: Number(1),
            limit: Number(10),
          }).populate({
            path:"id_aut",
            select:'autor_name'
          })

    }
  
    
}
