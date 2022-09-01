import{Prop,Schema,SchemaFactory} from '@nestjs/mongoose'
import { Document,Types } from 'mongoose';
import { Admin } from 'src/admin/admin/Schamas/admin.schema';
import { Autor } from 'src/autor/autor/Schemas/autor.schema';
import * as paginate from "mongoose-paginate-v2";

export type CitationDocument=Citation & Document

@Schema()

export class Citation{

    id_cit:Types.ObjectId;
    @Prop()
    theme_cit:string;
    @Prop({required:true,unique:true})
    citation:string;
    @Prop({required:true})
    id_aut:string;
    @Prop({default:false})
    favorite:boolean;
    @Prop()
    completedAt?: Date;
   

    @Prop({ required: true })
    createdAt: Date;
    @Prop()
     deletedAt?: Date;
}
   
export const  CitationSchema=SchemaFactory.createForClass(Citation)
CitationSchema.plugin(paginate)