import { Module } from '@nestjs/common';
import { RolesController} from './roles.controller';
import { RolesService } from './roles.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleSchema } from './roles.model';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Role', schema: RoleSchema }])],
    controllers: [RolesController],
    providers: [RolesService],
    exports:[RolesService]
})
export class RolesModule {}