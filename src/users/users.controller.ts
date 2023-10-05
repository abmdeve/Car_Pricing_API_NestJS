import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Query,
  Delete,
  NotFoundException,
  Session,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { CurrentUserInterceptor } from './interceptors/current-user.inerceptor';
import { UserEntity } from './user.entity';

@Controller('auth')
@Serialize(UserDto)
@UseInterceptors(CurrentUserInterceptor)
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('/whoami')
  whoami(@CurrentUser() user: UserEntity) {
    return user;
  }
  // @Get('/whoami')
  // whoami(@Session() session: any) {
  //   return this.userService.findOneUser(session.userId);
  // }

  @Post('/signout')
  signout(@Session() session: any) {
    session.userId = null;
  }

  @Get('/colors/color')
  setColor(@Param('color') color: string, @Session() session: any) {
    session.color = color;
  }

  @Get('/colors')
  getColor(@Session() session: any) {
    return session.color;
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }
  // @Post('/signup')
  // createUser(@Body() body: CreateUserDto) {
  //   return this.authService.signup(body.email, body.password);
  // }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  // @Post('/signin')
  // signin(@Body() body: CreateUserDto) {
  //   return this.authService.signin(body.email, body.password);
  // }

  @Get(':id')
  findUser(@Param('id') id: string) {
    const user = this.userService.findOneUser(+id);
    if (!user) {
      throw new NotFoundException('USER NOT FOUND ON GET ONE BY ID... ');
    }
    return user;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.userService.findEmail(email);
  }

  @Delete('/delete/:id')
  removeUser(@Param('id') id: string) {
    return this.userService.removeUser(+id);
  }

  @Patch('/update/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.updateUser(+id, body);
  }
}
