import { Body, Controller, Get, Post, Delete, Param, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesGuard } from '../auth/roles.guard';

@Controller('Users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) { }

  @Post()
  async create(@Body() CreateUserDto: CreateUserDto) {
    await this.UsersService.create(CreateUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.UsersService.findAll();
  }

  @Get('/profile/:id')
  async findById(@Param("id") id: string): Promise<User> {
    return this.UsersService.findOneById(id);
  }

  @Get('profile')
  // @UseGuards(RolesGuard)
  async getProfile(@Query() profile: { email: string }): Promise<User> {
    return this.UsersService.findByParam(profile);
  }

  @Delete('/:id')
  async deleteUser(@Param("id") id: string) {
    return this.UsersService.deleteUser(id);
  }
}
