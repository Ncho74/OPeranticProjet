import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AutorController } from './autor.controller';
import { AutorService } from './autor.service';
import { Autor, AutorSchema } from './Schemas/autor.schema';

@Module({
    imports:[MongooseModule.forFeature([{name:Autor.name,schema:AutorSchema}])],
    controllers:[AutorController],
    providers:[ AutorService],
    exports:[AutorModule, AutorService]
})
export class AutorModule {}
