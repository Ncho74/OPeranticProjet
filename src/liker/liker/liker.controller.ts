import { Controller,Get,Post,Param,Delete,Body } from '@nestjs/common';
import { LikerService } from './liker.service';
import { CreateLiker } from './tdo/create.liker';

@Controller('liker')
export class LikerController {
    constructor(private readonly likerService:LikerService){}
    @Get()
    async index(){
        return await this.likerService.count();
    }

    @Post()
    async create(@Body() createLiker:CreateLiker){
        return await this.likerService.create(createLiker);
    }
    @Delete(':id')
      async delete(@Param('id') id:string){
        return await this.likerService.delete(id)
      }
    
}
