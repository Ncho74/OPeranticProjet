import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from 'src/admin/admin/admin.module';
import { CitationModule } from 'src/citation/citation/citation.module';
import { AutorController } from './autor.controller';
import { AutorService } from './autor.service';
import { Autor, AutorSchema } from './Schemas/autor.schema';

@Module({
    imports:[MongooseModule.forFeature([{name:Autor.name,schema:AutorSchema}]),
    AdminModule,
    forwardRef(() => CitationModule),
    ],
    controllers:[AutorController],
    providers:[ AutorService,],
    exports:[AutorModule,AutorService]
})
export class AutorModule {}
