import { Controller, Get,Body,Post, Param, Put, Delete, BadRequestException,UploadedFile, UseGuards, UseInterceptors, Res, Req, UnauthorizedException} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from './admin.service';
import { CreateAdmin } from './tdo/create.tdo.admin';
import { UpdateAdmin } from './tdo/update.tdo.admin';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path, { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Observable } from 'rxjs';
import {Response,Request} from 'express';
import * as cookieParser from 'cookie-parser';
import { AnyARecord } from 'dns';
import { CitationService } from 'src/citation/citation/citation.service';
import { AutorService } from 'src/autor/autor/autor.service';

export const storage ={   storage: diskStorage({
  destination: './uploads',
  filename:(req, file, callback) => {
      const name = file.originalname.split('.')[0];
      const fileExtName = extname(file.originalname);
      callback(null, `${name}${fileExtName}`);
  }
})

}

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  callback(null, `${name}${fileExtName}`);
};

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService:AdminService,
    private readonly jwtService:JwtService,
    ){}
  // @Get(':id')
  //  async find(@Param('id') id:string){
  //    return  await this.adminService.findId(id)
  //  }
   @Put(':id')
   async update(@Param('id') id:string,@Body() updateAdmin:UpdateAdmin){
  
    
      return await this.adminService.update(id,updateAdmin)
      
   
   } 
   @Get()
   async All(){
    return await this.adminService.findAll()
   } 
   @Delete(':id')
   async delete(@Param("id") id:string){
    return await this.adminService.delete(id)
                                  .then(()=>{
                                    return {success:true,message:"Compte supprimer avec success"}
                                  })
                                  .catch((err)=>{
                                    console.log("Error:",err)
                                  })

   }
   @Post("add-user")
     @UseInterceptors(FileInterceptor('photo',storage))
   async create(@Body() createAdmin:CreateAdmin){

    const {email}=createAdmin
    const custom=await this.adminService.findOne({email})
    if(custom){
      throw new BadRequestException('compte existant !')
          
    }
      const created=await this.adminService.create(createAdmin)
        if(!created){
          return {succes:false, message:'Impossible de create ce compte'}

        }
         return {succes:true, message:'Enregistrement effectué avec success'}
    
   }

   @Post('login')
async login(@Body('email') email:string,@Body('password') password:string,@Res({passthrough:true})response:Response){
  const user=await this.adminService.findOne({email})
  if(!user){
    throw new BadRequestException('email ou mot de passe incorrecte !')
  }
  if( !await bcrypt.compare(password, user.password)){
      throw new BadRequestException('email ou mot de passe incorrecte !')
  } 
   const jwt=await this.jwtService.signAsync({id:user._id,pseudo:user.pseudo})

     return {token:jwt}
  }

  @Get('user/:token')
  async user(@Param("token") token:any){
     try{
      const data=await this.jwtService.verifyAsync(token)
      if(!data){
        throw new UnauthorizedException()
      }
      const {id}=data
      const result=await this.adminService.findId(id)
      return result
     }
     catch(e){
       throw new UnauthorizedException()
     }
  }

}
