import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { sampleTime } from 'rxjs';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    // See if email is in use
    const users = await this.userService.findEmail(email);
    if (users.length) {
      throw new BadRequestException('EMAIL IN USE...');
    }

    // Hash the users password
    // Generate a salt
    const salt = randomBytes(8).toString('hex');

    // Hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // Join the hashed result and the salt together
    const result = salt + '.' + hash.toString('hex');

    // Create a new user and save it
    const user = await this.userService.createUser(email, result);

    // return the user
    return user;
  }

  async signin(email: string, password: string) {
    const [users] = await this.userService.findEmail(email);
    if (!users) {
      throw new NotFoundException('USER NOT FOUND...');
    }

    const [salt, storeHash] = users.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storeHash !== hash.toString('hex')) {
      throw new BadRequestException('BAD PASSWORRD...');
    }

    return users;
  }
}
