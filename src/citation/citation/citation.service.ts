import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model} from 'mongoose';
import { Autor } from 'src/autor/autor/Schemas/autor.schema';
import { Citation, CitationDocument } from './Schemas/citation.schema';
import { CreateCitation } from './tdo/create.citation';
import { UpdateCitation } from './tdo/update.citation';

@Injectable()
export class CitationService {

    constructor(
        @InjectModel(Citation.name) private readonly model:Model<CitationDocument>,
        ) {}
  
    async findId(id:string):Promise<Citation>{
        return this.model.findById(id).exec()
    }
     async findAll(options:any){
        return this.model.find(options).populate({path:'autor',select:'autor_name'})
    }
    async deleteAll(){
      return this.model.deleteMany().exec()
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
        return  await this.model.find(options)

    }

  
    
}
