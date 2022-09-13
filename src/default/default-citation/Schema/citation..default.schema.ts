import{Prop,Schema,SchemaFactory} from '@nestjs/mongoose'
import { Document,SchemaTypes,Types } from 'mongoose';
import { DefaultAutor } from 'src/default/default-autor/Schemas/Default.autor.schema';

export type CitationDefaultDocument=DefaultCitation & Document

@Schema({_id:true})

export class DefaultCitation{

    _id:Types.ObjectId;
    @Prop({required:true,unique:true})
    citation:string;
    @Prop([{ type: SchemaTypes.String, ref: DefaultAutor.name }])
    autor:string;
    @Prop({default:null})
    likes:number
    @Prop()
    completedAt?: Date;
    @Prop({ required: true })
    createdAt: Date;
    @Prop()
     deletedAt?: Date;
}
   
export const  CitationDefaultSchema=SchemaFactory.createForClass(DefaultCitation)