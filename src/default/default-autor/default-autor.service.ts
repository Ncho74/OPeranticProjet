import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AutorDefaultDocument, DefaultAutor } from './Schemas/Default.autor.schema';
import { CreateDefaultAutor } from './tdo/create.default.autor';
import { UpdateDefaultAutor } from './tdo/update.default.autor';
@Injectable()
export class DefaultAutorService {
        constructor(@InjectModel(DefaultAutor.name) private readonly model:Model<AutorDefaultDocument>){}
        async findId(id:string):Promise<DefaultAutor>{
            return this.model.findById(id).exec()
        }
         async findAll():Promise<DefaultAutor[]>{
            return this.model.find().exec()
        }
        async count():Promise<number>{
            return this.model.count().exec()
        }
        async create(createDefaultAutor:CreateDefaultAutor):Promise<DefaultAutor>{
          
            return await new this.model({... createDefaultAutor,createdAt:Date(),}).save()
        
         
        }
        async update(id:string,updateDefaultAutor :UpdateDefaultAutor ):Promise<DefaultAutor>{
        
      
           
          return await this.model.findByIdAndUpdate(id,updateDefaultAutor).exec();
        }
        async delete(id:string):Promise<DefaultAutor>{
          return  await this.model.findByIdAndDelete(id).exec()
        }
        async findOne(data:any):Promise<DefaultAutor>{
           return  await this.model.findOne(data).exec()
        }
       async deleteAll(){
          return await this.model.deleteMany().exec()
       }
       async find(options:any){
        return await this.model.find(options).exec()
       }
      
        

}
