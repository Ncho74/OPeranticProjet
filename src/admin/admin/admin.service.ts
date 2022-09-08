import {BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from './Schamas/admin.schema';
import { CreateAdmin } from './tdo/create.tdo.admin';
import * as  bcrypt from 'bcrypt'
import { UpdateAdmin } from './tdo/update.tdo.admin';
import { ForgetPassword } from './tdo/forget-password';
@Injectable()
export class AdminService {
    constructor(@InjectModel(Admin.name) private readonly model:Model<AdminDocument>){}
    async findAll():Promise <Admin[]>{
        return this.model.find().exec()
    
      }

      async create(createAdmin:CreateAdmin):Promise<Admin>{
  
        const {password}=createAdmin
       
        
          return await new this.model({... createAdmin,password:await bcrypt.hash(password,10),createdAt:Date(),}).save()
      
      }
      async update(id:string,updateAdmin:UpdateAdmin):Promise<Admin>{
  

     
        return await this.model.findByIdAndUpdate(id,updateAdmin).exec();
      } 
      async findOne(data:any):Promise<Admin>{
        return  await this.model.findOne(data)
     }
     async findId(id:string):Promise<Admin>{
        return this.model.findById(id).exec()
    }
    async delete(id:string):Promise<Admin>{
      return this.model.findByIdAndDelete(id).exec()
  }
  
  async deletAll(){
    return this.model.deleteMany().exec()
  }
  async forgetPassword(forgetPassword:ForgetPassword):Promise<any>{
    const {email}=forgetPassword
    const user=await this.findOne({email})
     if(!user){
        throw new BadRequestException("Email invalide")
     }


  }

}