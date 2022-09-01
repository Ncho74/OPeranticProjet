import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LikerController } from './liker.controller';
import { LikerService } from './liker.service';
import { Liker, LikerSchema } from './Schemas/liker.schema';

@Module({
    imports:[MongooseModule.forFeature([{name:Liker.name,schema: LikerSchema}])],
    controllers:[ LikerController],
    providers:[ LikerService]
})
export class LikerModule {}
