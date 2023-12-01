import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModel, CarModel } from './entity/inheritance_entity';
import { StudentModel, TeacherModel } from './entity/person.entity';
import { PostModel } from './entity/post_entity';
import { ProfileModel } from './entity/profile_entity';
import { TagModel } from './entity/tag_entity';
import { UserModel } from './entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserModel,ProfileModel,PostModel,TagModel]),
    TypeOrmModule.forRoot({
      type:'postgres',
      host:'127.0.0.1',
      port:5432,
      username:'postgres',
      password:'postgres',
      database:'typeormstudy',
      entities:[UserModel,
        StudentModel,
        TeacherModel,
        BookModel,
        CarModel, 
        ProfileModel,
        PostModel,
        TagModel
      ],
      synchronize:true,
    }) 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

