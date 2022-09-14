import { Controller,Param,Post,Get,Delete, Req ,Put, Body, Res, BadRequestException} from '@nestjs/common';

import { DefaultAutorService } from '../default-autor/default-autor.service';
import { data } from './data/data';
import { DefaultCitationService } from './default-citation.service';
import {Request,Response} from 'express'
import { UpdateDefaultCitation } from './tdo/update.citation.default';
import { naturalCompare } from './compare.likes';
@Controller('default-citation')
export class DefaultCitationController {
   arrAut:any=[];
   arrCit:any=[];
   data:any=[];

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
@Get("author/:author")
async BackEnd(@Param('author') aut:any){

  const dataCit=await this.s.find({autor:aut})
const author=await this.s_aut.findAll()
  this.arrAut=author;
  this.arrAut.sort((val:any)=>{
    if(val.autor_name===aut){
      return 1
    }
    else{
      return -1
    }
  
  })
  this.arrAut.reverse().splice(1,5)
  this.arrCit=dataCit
  
 return [this.arrCit,this.arrAut];
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
    @Get('/favorites')
    async getFavorite(){
       let  data:any=[]
       const authors=await this.s_aut.findAll()
        const list=await this.s.favoritesCitation()
           data=list
        data.sort((_val1:any,_val2:any)=>{

             if(_val1.likes>_val2.likes ){
             
                return 1
              }
             if(_val1.likes<_val2.likes){
                  return -1
               }
              
             
             
        })
        data.splice(1,80)
        return data.reverse()
      }
}

