import{Prop,Schema,SchemaFactory} from '@nestjs/mongoose'
import { Document,Types } from 'mongoose';
import { Admin } from 'src/admin/admin/Schamas/admin.schema';

export type AutorDocument=Autor & Document

@Schema()

export class Autor{
    _id:Types.ObjectId
    @Prop({required:true})
    autor_name:string;
    @Prop()
    dateDeces_aut:string;
    @Prop({required:true})
    lieuNaiss_aut:string;
    @Prop()
    histPart_aut:string;
    @Prop({required:true})
    bio_aut:string;
    @Prop({type:[Types.ObjectId],ref:Admin.name})
    user:string;
    
    @Prop()
    completedAt?: Date;

    @Prop({ required: true })
    createdAt: Date;
    @Prop()
     deletedAt?: Date;
}
   
export const  AutorSchema=SchemaFactory.createForClass(Autor)