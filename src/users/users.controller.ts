import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('Users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Post()
  async create(@Body() CreateUserDto: CreateUserDto) {
    await this.UsersService.create(CreateUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.UsersService.findAll();
  }
}