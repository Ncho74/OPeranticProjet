import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin/admin.module';
import { CitationModule } from './citation/citation/citation.module';
import { AutorModule } from './autor/autor/autor.module';
import { LikerModule } from './liker/liker/liker.module';
import { DefaultAutorModule } from './default/default-autor/default-autor.module';
import { DefaultCitationModule } from './default/default-citation/default-citation.module';

@Module({
  imports: [
     MongooseModule.forRoot('mongodb://localhost:27017/visionSage'),
     AdminModule,
     CitationModule,
     AutorModule,
     LikerModule,
     DefaultAutorModule,
     DefaultCitationModule,
   
  ],
  controllers: [AppController],
  providers: [AppService,],
  exports:[ 
     DefaultAutorModule,
    DefaultCitationModule,
    AdminModule,
    CitationModule,
    AutorModule,
  ]
})
export class AppModule {}
