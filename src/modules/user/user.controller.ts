import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @MessagePattern('create_user')
  create(@Payload() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @MessagePattern('find_all_users')
  findAll(@Payload() PaginationDto: PaginationDto) {
    return this.userService.findAll(PaginationDto);
  }

  @MessagePattern('find_one_user')
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.userService.findOne(+id);
  }

  @MessagePattern('update_user')
  update(
    @Payload() updateUserDto: UpdateUserDto
  ) {
    return this.userService.update(updateUserDto.id, updateUserDto);
  }

  @MessagePattern('delete_user')
  remove(
    @Payload('id', ParseIntPipe) id: number
  ) {
    return this.userService.remove(id);
  }
}
