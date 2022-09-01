import{Prop,Schema,SchemaFactory} from '@nestjs/mongoose'
import { Document,Types } from 'mongoose';

export type AutorDefaultDocument=DefaultAutor & Document

@Schema({_id:true})

export class DefaultAutor{

    _id:Types.ObjectId;
    @Prop({required:true,unique:true})
    autor_name:string;
    @Prop({required:true})
    bio_aut:string;
    @Prop({required:true})
    image:string;
    @Prop()
    completedAt?: Date;

    @Prop({ required: true })
    createdAt: Date;
    @Prop()
     deletedAt?: Date;
}
   
export const  AutorDefaultSchema=SchemaFactory.createForClass(DefaultAutor)