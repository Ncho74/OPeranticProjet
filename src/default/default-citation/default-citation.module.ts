import { Module } from '@nestjs/common';
import { DefaultCitationController } from './default-citation.controller';
import { DefaultCitationService } from './default-citation.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DefaultCitation,CitationDefaultSchema  } from './Schema/citation..default.schema';
import { DefaultAutorModule } from '../default-autor/default-autor.module';
@Module({
  imports:[ MongooseModule.forFeature([{name: DefaultCitation.name,schema: CitationDefaultSchema}]),DefaultAutorModule,],
  providers: [DefaultCitationService],
  controllers:[DefaultCitationController]
})
export class DefaultCitationModule {
  
}
