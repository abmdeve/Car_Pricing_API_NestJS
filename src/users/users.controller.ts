import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Query,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    console.log('body ---- _______ ----', body);
    this.userService.createUser(body.email, body.password);
  }
// auth/user/:id
  @Get(':id')
  findUser(@Param('id') id: string) {
    console.log('first', id)
    return this.userService.findOneUser(+id);
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.userService.findEmail(email);
  }

  @Delete('/delete/:id')
  removeUser(@Param('id') id: string) {
    console.log('REMOVE THE USER ON ID IN THE CONSOLE = = =>: ', +id)
    return this.userService.removeUser(+id);
  }

  @Patch('/update/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.updateUser(+id, body);
  }
}
