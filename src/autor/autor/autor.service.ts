import {Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Autor, AutorDocument } from './Schemas/autor.schema';
import { CreateAutor } from './tdo/create.autor';
import { UpdateAutor } from './tdo/update.autor';
@Injectable()
export class AutorService {
    constructor(@InjectModel(Autor.name) private readonly model:Model<AutorDocument>){}

    async findAll(options:any):Promise <Autor[]>{
        return this.model.find(options).exec()
    
      }
      async findId(id:string):Promise<Autor>{
          return this.model.findById(id).exec()
      }
      async create(createAutor:CreateAutor):Promise<Autor>{
      
       
        
          return await new this.model({... createAutor,createdAt:Date(),}).save()
      
       
      }
      async update(id:string,updateAutor:UpdateAutor):Promise<Autor>{
      
    
         
        return await this.model.findByIdAndUpdate(id,updateAutor).exec();
      }
      async delete(id:string):Promise<Autor>{
        return  await this.model.findByIdAndDelete(id).exec()
      }
      async findOne(data:any):Promise<Autor>{
         return  await this.model.findOne(data)
      }
    async  deleteAll(){
      return await this.model.deleteMany()
    }
    async countAut(options:any):Promise<Number>{
      return await this.model.find(options).count()
    }

}
