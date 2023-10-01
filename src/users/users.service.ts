import { Injectable, Param } from '@nestjs/common';
import { Repository, } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
    constructor( @InjectRepository(UserEntity) private repo: Repository<UserEntity>){}
    createUser(email: string, password: string){
        const user = this.repo.create({ email, password });

        // return this.repo.save({ email, password });
        return this.repo.save(user);
    }

    findOne ( id: number) {
        return this.repo.find({where: {id}})
    }

    find(email: string){
        return this.repo.find({where: {email}})
    }

    update(id: number, attrs: Partial<UserEntity>){
    }

    remove(){}
}

