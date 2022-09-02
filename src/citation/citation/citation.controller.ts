import { Controller,Get,Post,Param, Body,Delete,Put,BadRequestException,Req} from '@nestjs/common';
import { CitationService } from './citation.service';
import { CreateCitation } from './tdo/create.citation';
import { UpdateCitation } from './tdo/update.citation';
import{Request} from "express"

@Controller('citation')
export class CitationController {
    constructor(private readonly citationService:CitationService){}
    @Get()
    async index(){
        
        const citations=await this.citationService.findAll();
        return citations
    }

    @Post("addCitation")
    async create(@Body() createCitation:CreateCitation){
        const {citation}= createCitation
        const cit= await this.citationService.findOne({citation});
        if(cit){
           throw new BadRequestException('Cette Citation est dejà ajouter !')
        }
        return await this.citationService.create( createCitation);
    }
    @Get(":id")
    async findId(@Param(':id') id:string){
        return await this.citationService.findId(id);;
    }
    @Put(':id')
    async update(@Param('id') id:string,@Body() updateCitation: UpdateCitation){
        return await this.citationService.update(id,updateCitation);
    }
    @Delete(':id')
      async delete(@Param('id') id:string){
        return await this.citationService.delete(id)
      }
    @Get("count")
    async count(){
        return await this.citationService.count ();
    }
    @Get("search")
    async search(@Req() req:Request){
        let options={

        }
        if(req.query.aut){ 
            options={
                $or:[{citation:new RegExp(req.query.s.toString(),'i')},]
            }
        }
        const data=await this.citationService.find(options)
        if(req.query.cit){
            data.sort({
                citation:req.query.cit
            })
        }
        return data.exec()
    }


}
