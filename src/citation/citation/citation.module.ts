import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from 'src/admin/admin/admin.module';
import { AdminService } from 'src/admin/admin/admin.service';
import { AutorModule } from 'src/autor/autor/autor.module';
import { AutorService } from 'src/autor/autor/autor.service';
import { CitationController } from './citation.controller';
import { CitationService } from './citation.service';
import { Citation, CitationSchema } from './Schemas/citation.schema';

@Module({
    imports:[
         MongooseModule.forFeature([{name:Citation.name,schema: CitationSchema}]),
          AdminModule,
          AutorModule,
          JwtModule.register({ secret: 'secretKey', signOptions: { expiresIn: '1d' },})


],
    controllers:[CitationController],
    providers:[CitationService,JwtService,],
    exports:[CitationModule]
})
export class CitationModule {}
