import { Controller,Get,Post,Param, Body,Delete,Put,BadRequestException,Req} from '@nestjs/common';
import { CitationService } from './citation.service';
import { CreateCitation } from './tdo/create.citation';
import { UpdateCitation } from './tdo/update.citation';
import{Request} from "express"
import { AutorService } from 'src/autor/autor/autor.service';
import { AdminService } from 'src/admin/admin/admin.service';
import { JwtService } from '@nestjs/jwt';

@Controller('citation')
export class CitationController {
    constructor(
        private readonly citationService:CitationService,
        private readonly autorService:AutorService,
        private readonly adminService:AdminService,
        private readonly jwtService:JwtService
        ){}
    @Get('listCitation/:id')
    async index(@Param('id') id:any){
        const user=await this.adminService.findId(id)
          if(!user){
            return ;
          }
          const {_id}=user
        const citations=await this.citationService.findAll({user:_id});
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
    async findId(@Param('id') id:string){
        const citation= await this.citationService.findId(id);
        const {autor}=citation;
        return await this.autorService.findOne({autor_name:autor})
    }
    @Get("readCitation/:id")
    async readById(@Param('id') id:string){
       
        return await this.citationService.findId(id);
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
        return await this.citationService.count();
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
@Get('favorits/:id')
 async favorites(@Param('id')id:any){
    const user=await this.adminService.findId(String(id))
          if(!user){
            return ;
          }
          const {_id}=user
        const citations=await this.citationService.find({user:_id,favorite:true});
        return citations

 }
 @Get('dashbord/:id')
 async dashbord(@Param('id') id:any){
   const user=await this.adminService.findId(String(id))
   if(!user){
     return;
   }
   const {_id}=user;

   const countCit=await this.citationService.countCit({user:_id});
   const countAut=await this.autorService.countAut({user:_id})
   return {nbrCit:countCit,nbrAutor:countAut}

 }

}
