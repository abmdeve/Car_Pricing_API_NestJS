import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { UserEntity } from './users/user.entity';
import { ReportEntity } from './reports/reports.entity';
 
@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'mariadb',
    database: 'db_Car_Pricing',
    host: 'localhost',
    port: 3306,
    username: "root",
    password: "",
    // database: 'db.sqlite',
    entities: [UserEntity, ReportEntity],
    migrations: [],
    subscribers: [],
    synchronize: true,
    logging: false,
    
  }) ,
  UsersModule, 
  ReportsModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
