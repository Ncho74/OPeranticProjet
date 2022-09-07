import { Controller,Param,Post,Get,Delete, Req ,Put, Body, Res, BadRequestException} from '@nestjs/common';

import { DefaultAutorService } from '../default-autor/default-autor.service';
import { data } from './data/data';
import { DefaultCitationService } from './default-citation.service';
import {Request,Response} from 'express'
import { UpdateDefaultCitation } from './tdo/update.citation.default';
@Controller('default-citation')
export class DefaultCitationController {
    constructor(private readonly s:DefaultCitationService,private readonly s_aut:DefaultAutorService){}
    @Get("citation/:id")
    async show(@Param("id") id:string){
     
     try{
      const citation= await this.s.findId(id)
      if(!citation){
        throw new BadRequestException("Impossible d'afficher cette citation !")
      }
      const {autor}=citation
      const aut=await this.s_aut.findOne({autor_name:autor})
  
      return aut
     }
     catch(err){
      return {success:true,message:"Citation introuvable !"}
     }
    }
    @Get()
    async fetchAll(){
      return await this.s.findfirtsCitation(20)
      //return await this.s.deleteAll()
    }
    @Post("posts")
    async post(){
        const count=await this.s.count()
        if(count>0){
            return {success:true,message:"Citation already !"}
        }
        for(let a in data){
        
          
          await this.s.create(data[a])
            .then(()=>{
             return {success:true,message:"Citation with success !"}
          })
          .catch((err)=>{
              console.log("Registor_citation_Error",err)
          })
                 

                 
    
         
        }      
    }
@Get("author")
async BackEnd(@Req() req: Request){
  let options={}
  if(req.query.author){
    options={
      $or:[
        {
          autor: new RegExp(req.query.author.toString(),'i')
        }
      ]

    }

  }
  const data=await this.s.find(options)

  return data
}
 @Put("/likes/:id")
 async likes(@Param("id") id:string,@Body() updateDefaultCitation:UpdateDefaultCitation){
     await this.s.update(id,updateDefaultCitation)
                  .then(()=>{
                    return true;
                  }).
                  catch((err)=>{
                     console.log("Erreur",err)
                  })
 }
 @Get(":id")
 async getByid(@Param("id") id:string){
   return await this.s.findId(id)
 }

}

