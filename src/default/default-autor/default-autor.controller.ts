import { Controller ,Get,Post,Param,Delete} from '@nestjs/common';
import { autor } from './data/autor';
import { DefaultAutorService } from './default-autor.service';
@Controller('default-autor')
export class DefaultAutorController {
    constructor(private readonly s:DefaultAutorService){}
    // @Delete(":id")
    // async delete(@Param(':id') id:string){
    //    return  await this.s.delete(id)
    //         .then(()=>{
    //             console.log('Auteur suprimé avec success')
    //         })
    //         .catch((err)=>{
    //             console.log(" ERROR:",err)
    //         })
    // }
    @Get()
    async showAll(){
        return await this.s.findAll()
    
          
        
    }
    @Get("deleteAll")
    async deleteAll(){
        return await this.s.deleteAll()
    }
    @Post("posts")
    async loadAutor(){
       const count=await this.s.count()
       if(count>0){
        return {success:true,message:"Authors Already"};
       }
       for(let i in autor){
        const {autor_name}=autor[i];
         const aut=await this.s.findOne({autor_name});
          if(aut){
            break;
          }
           await this.s.create(autor[i])
                        .then(()=>{
                            console.log(`Auteur ${autor[i].autor_name} a été ajouter avec success`);
                        })
                        .catch((err)=>{
                            console.log("Registor_autor_Error",err)
                        })
       }
    }
}
