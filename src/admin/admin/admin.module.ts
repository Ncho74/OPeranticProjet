import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminSchema,Admin} from './Schamas/admin.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports:[
    MongooseModule.forFeature([{name:Admin.name,schema: AdminSchema}]),
    JwtModule.register({ secret: 'secretKey', signOptions: { expiresIn: '1d' },})
],
    controllers:[AdminController],
    providers:[AdminService],
    exports:[AdminModule]
})
export class AdminModule {}
