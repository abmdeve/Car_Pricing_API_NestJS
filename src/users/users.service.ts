import { Injectable, Param, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
  ) {}
  createUser(email: string, password: string) {
    const user = this.repo.create({ email, password });

    // return this.repo.save({ email, password });
    return this.repo.save(user);
  }

  findOneUser(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOne({ where: { id } });
  }

  findEmail(email: string) {
    console.log(
      'this.repo.findOne({where: {email} })',
      this.repo.findOne({ where: { email } }),
    );
    return this.repo.find({ where: { email } });
  }

  async updateUser(id: number, attrs: Partial<UserEntity>) {
    const user = await this.findOneUser(id);
    // const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('USER NOT FOUND TO UPDATE THERE...');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async removeUser(id: number) {
    const user = await this.findOneUser(id);
    if (!user) {
      throw new NotFoundException('USER NOT FOUND TO REMOVE THERE...');
    }
    return this.repo.remove(user);
  }
}
