import { Controller ,Get,Body,Post, Param, Put, Delete, BadRequestException} from '@nestjs/common';
import { AutorService } from './autor.service';
import { CreateAutor } from './tdo/create.autor';
import { UpdateAutor } from './tdo/update.autor';

@Controller('autor')
export class AutorController {
    constructor(private readonly autorService:AutorService){}
    
 @Post("addAutor")
    async addAUtor(@Body() createAutor:CreateAutor){
        const {autor_name}=createAutor

       const autor= await this.autorService.findOne({autor_name})

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
@Get()
async all(){
   return this.autorService.findAll()
}
 @Delete(':id')
 async deleteAutor(@Param('id') id: string){
    return this.autorService.delete(id)
 }
 @Put(":id")
 async updateAutor(@Param('id') id:string,@Body()updateAutor:UpdateAutor){
    return this.autorService.update(id,updateAutor)
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
