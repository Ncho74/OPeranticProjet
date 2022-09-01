import{Prop,Schema,SchemaFactory} from '@nestjs/mongoose'
import { Document,Types } from 'mongoose';

export type AdminDocument=Admin & Document

@Schema({_id:true})

export class Admin{

    _id:Types.ObjectId;
    @Prop({required:true})
    pseudo:string;
    @Prop({unique:true,required:true})
    email:string;
    @Prop()
    tel:string;
    @Prop({required:true})
    password:string;
    @Prop()
    completedAt?: Date;
    @Prop({ required: true })
    createdAt: Date;
    @Prop()
     deletedAt?: Date;
}
   
export const  AdminSchema=SchemaFactory.createForClass(Admin)