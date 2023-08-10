import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';


@Controller('auth')
export class UsersController {
    constructor(private userService: UsersService){}
    @Post('/signup')
    createUser(@Body() body: CreateUserDto){
        console.log('body ---- _______ ----', body)
        this.userService.createUser(body.email, body.password);
    }
}
