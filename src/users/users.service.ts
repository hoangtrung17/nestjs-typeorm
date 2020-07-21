
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { decode, encode } from 'jwt-simple';
@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly UserModel: Model<User>) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.UserModel(createUserDto);
        return createdUser.save();
    }

    async findAll(): Promise<User[]> {
        return this.UserModel.find().exec();
    }

    async findOne(userName: string): Promise<User> {
        return this.UserModel.findOne({ email: userName }).exec();
    }

    async findOneById(id: string): Promise<User> {
        return this.UserModel.findOne({ _id: id }).exec();
    }

    async deleteUser(userId: string) {
        return this.UserModel.deleteOne({ _id: userId }).exec();
    }

    async findOrCreate(_user): Promise<User> {
        const user = await this.UserModel
            .findOne({ 'name': _user.email })
            .exec();
        if (user) {
            return user;
        }
        //   const createdUser = new this.UserModel({
        //     email: _user.emails[0].value,
        //     facebook: {
        //       id: _user.id,
        //       avatar: _user.photos[0].value
        //     }
        //   });

        const createdUser = new this.UserModel({
            name: _user.emails[0].value
        });
        return createdUser.save()
    }
}
