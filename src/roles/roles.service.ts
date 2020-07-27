
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './roles.model';
import { CreateRoleDto } from './dto/create-roles.dto';
@Injectable()
export class RolesService {
    constructor(@InjectModel('Role') private readonly RoleModel: Model<Role>) { }

    async create(createRoleDto: CreateRoleDto): Promise<any> {
        const createdRole = new this.RoleModel(createRoleDto);
        return createdRole.save();
    }

    async findAll(): Promise<Role[]> {
        return this.RoleModel.find().exec();
    }

    async findOne(roleName: string): Promise<any> {
        return this.RoleModel.findOne({ email: roleName }).exec();
    }

    async findOneById(id: string): Promise<Role> {
        return this.RoleModel.findOne({ _id: id }).exec();
    }

    async findByParam(param: any): Promise<Role> {
        return this.RoleModel.findOne(param).exec();
    }

    async deleteRole(roleId: string) {
        return this.RoleModel.deleteOne({ _id: roleId }).exec();
    }
}
