import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CitationDefaultDocument, DefaultCitation } from './Schema/citation..default.schema';
import { CreateDefaultCitation } from './tdo/create.citation.default';
import { UpdateDefaultCitation } from './tdo/update.citation.default';

@Injectable()
export class DefaultCitationService {
    constructor(@InjectModel(DefaultCitation.name) private readonly model:Model<CitationDefaultDocument> ){}
    async findId(id:string):Promise<DefaultCitation>{
        return this.model.findById(id).exec()
    }
     async findAll():Promise<DefaultCitation[]>{
        return this.model.find()
                       
    }
    async count():Promise<number>{
        return this.model.count().exec()
    }
    async create(createDefaultCitation:CreateDefaultCitation):Promise<DefaultCitation>{
      
        return await new this.model({... createDefaultCitation,createdAt:Date(),}).save()
    
     
    }
    async update(id:string,updateDefaultCitation :UpdateDefaultCitation ):Promise<DefaultCitation>{

       
      return await this.model.findByIdAndUpdate(id,updateDefaultCitation).exec();
    }
    async delete(id:string):Promise<DefaultCitation>{
      return  await this.model.findByIdAndDelete(id).exec()
    }
    async findOne(data:any):Promise<DefaultCitation>{
       return  await this.model.findOne(data)
    }
    async deleteAll(){
        return await this.model.deleteMany().exec()
    }
    async findfirtsCitation(documentsToSkip = 0, limitOfDocuments?: number) {
        const query = this.model
        .find()
        .sort({ _id: 1 })
        .skip(documentsToSkip)
     
      if (limitOfDocuments) {
        query.limit(limitOfDocuments);
          }
          
          return query
      }

    find(options:any){
      return this.model.find(options).exec()
    }
    async favoritesCitation(){
      const query =  this.model
      .find().exec()
   

        
        return (await query)
    }
    
}

