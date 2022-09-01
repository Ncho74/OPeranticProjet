import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Liker, LikerDocument } from './Schemas/liker.schema';
import { CreateLiker } from './tdo/create.liker';
@Injectable()
export class LikerService {
    constructor(@InjectModel(Liker.name) private readonly model:Model<LikerDocument>){

    }

    async count():Promise<number>{
        return this.model.count().exec()
    }

    async create(createLiker:CreateLiker):Promise<Liker>{
       
        return await new  this.model({... createLiker}).save();
    }

    async delete(id:string):Promise<Liker>{
        return  await  this.model.findByIdAndDelete(id);
    }

}
