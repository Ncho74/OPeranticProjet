import { Controller ,Get,Body,Post, Param, Put, Delete, BadRequestException, forwardRef, Inject} from '@nestjs/common';
import { AdminService } from 'src/admin/admin/admin.service';
import { CitationService } from 'src/citation/citation/citation.service';
import { DefaultAutorService } from 'src/default/default-autor/default-autor.service';
import { AutorService } from './autor.service';
import { CreateAutor } from './tdo/create.autor';
import { UpdateAutor } from './tdo/update.autor';

@Controller('autor')
export class AutorController {
    constructor(
      private readonly autorDefault:DefaultAutorService,
     
      private readonly autorService:AutorService,
      private readonly adminService:AdminService,
   
      @Inject(forwardRef(() =>CitationService))
      private readonly cit:CitationService,
      ){}
    
 @Post("addAutor")
    async addAUtor(@Body() createAutor:CreateAutor){
       
        const str =createAutor.autor_name
        createAutor.autor_name= str.charAt(0).toUpperCase() + str.slice(1);
        const {autor_name}=createAutor
       const autor= await this.autorService.findOne({autor_name})
       const defaultAutor= await this.autorDefault.findOne({autor_name})
       if(defaultAutor){
         throw new BadRequestException(`Impossible d\n'ajouter les Auteurs interne  comme ${autor_name}!`)
       }
        if(autor){
            throw new BadRequestException('Cet auteur est dejà ajouter !')
                
          }
            await this.autorService.create(createAutor)
            .then(()=>{
               return {succes:true,message:'Enregistrement effectué avec success'}
            })
            .catch((err)=>{
               console.log('Error-User-SignIn :',err)
            })
   
        }
@Get('allCitation/:id')
async all(@Param('id') id:any){

    const user= await this.adminService.findId(id)
     const {_id}=user;
         if(!user){
            return ;
         }
   return this.autorService.findAll({user:_id})
}
 @Delete(':id')
 async deleteAutor(@Param('id') id: string){
   const aut=await this.autorService.findId(id)
   if(!aut){
      return ;
   }
   const {autor_name}=aut



   await this.cit.remove({autor:autor_name})
    return this.autorService.delete(id)
 }
 @Put(":id")
 async updateAutor(@Param('id') id:string,@Body()updateAutor:UpdateAutor){
    const aut=await this.autorService.findId(id)
    const {autor_name}=aut
    const act=await this.cit.find({autor:autor_name})
    const up=updateAutor.autor_name
    if(!act){
      return;
    }
    const {_id}=act
    await this.cit.updateByCit(_id,{autor:up})

    return await this.autorService.update(id,updateAutor)

 }
 @Get(':id')
 async getAutor(@Param("id") id:string){
    return this.autorService.findId(id)
 }
 @Post("searchAutor")
 async searchAutor(@Body() autor_name:string){
    return this.autorService.findOne({autor_name});

 }

}
