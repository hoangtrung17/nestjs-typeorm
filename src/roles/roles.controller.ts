import { Body, Controller, Get, Post, Delete, Param, Query, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from './roles.model';
import { CreateRoleDto } from './dto/create-roles.dto';

@Controller('Roles')
export class RolesController {
  constructor(private readonly RolesService:RolesService) { }

  @Post()
  async create(@Body() CreateRoleDto: CreateRoleDto) {
    await this.RolesService.create(CreateRoleDto);
  }

  @Get()
  async findAll(): Promise<Role[]> {
    return this.RolesService.findAll();
  }

  @Get('/:id')
  async findById(@Param("id") id: string): Promise<Role> {
    return this.RolesService.findOneById(id);
  }

  @Delete('/:id')
  async deleteRole(@Param("id") id: string) {
    return this.RolesService.deleteRole(id);
  }
}
