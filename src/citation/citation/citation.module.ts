import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CitationController } from './citation.controller';
import { CitationService } from './citation.service';
import { Citation, CitationSchema } from './Schemas/citation.schema';

@Module({
    imports:[
         MongooseModule.forFeature([{name:Citation.name,schema: CitationSchema}]),
],
    controllers:[CitationController],
    providers:[CitationService],
    exports:[CitationModule]
})
export class CitationModule {}
