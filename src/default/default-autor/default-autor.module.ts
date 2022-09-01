import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DefaultAutorController } from './default-autor.controller';
import { DefaultAutorService } from './default-autor.service';
import { AutorDefaultSchema, DefaultAutor } from './Schemas/Default.autor.schema';

@Module({
  imports:[ MongooseModule.forFeature([{name: DefaultAutor.name,schema: AutorDefaultSchema}]),],
  providers: [DefaultAutorService],
  controllers:[DefaultAutorController],
  exports:[DefaultAutorService]
})
export class DefaultAutorModule {}
