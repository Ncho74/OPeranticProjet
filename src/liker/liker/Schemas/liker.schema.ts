import{Prop,Schema,SchemaFactory} from '@nestjs/mongoose'
import { Document,Types } from 'mongoose';
import { Citation } from 'src/citation/citation/Schemas/citation.schema';

export type LikerDocument=Liker & Document

@Schema({_id:false})

export class Liker{

    id_like:Types.ObjectId;
    @Prop({default:null})
    like:Number
    @Prop({type:[Types.ObjectId],ref:Citation.name})
    id_cit:Citation[]
}
   
export const  LikerSchema=SchemaFactory.createForClass(Liker)