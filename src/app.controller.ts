import { Controller, Delete, Get, Injectable, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Equal, ILike, In, IsNull, LessThan, LessThanOrEqual, Like, MoreThan, MoreThanOrEqual, Not, Repository } from 'typeorm';
import { AppService } from './app.service';
import { PostModel } from './entity/post_entity';
import { ProfileModel } from './entity/profile_entity';
import { TagModel } from './entity/tag_entity';
import { UserModel } from './entity/user.entity';

@Controller()
export class AppController {
  
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository:Repository<UserModel>,  
    @InjectRepository(ProfileModel)
    private readonly profileRepository:Repository<ProfileModel>,
    @InjectRepository(PostModel)
    private readonly postRepository : Repository<PostModel>,
    @InjectRepository(TagModel)
    private readonly tagRepository : Repository<TagModel>
  ){}


  @Post('sample')
  async sample(){
    // 모델에 해당되는 객체 생성 - 저장은 안함
    // entity에서는 생성자가 없기 때문에 create를 사용해 객체를 생성
    // const user1 = await this.userRepository.create({
    //   email : 'test@codefactory.ai',
    // });

    // 저장
    // const user2 = await this.userRepository.save({
    //   email : 'test@codefactory.ai',
    // })

    
    // 입력된 값을 기반으로 데이터베이스에 있는 데이터를 불러오고,
    // 추가 입력된 값으로 데이터베이스에서 가져온 값으로 대체함
    // 저장하지는 않음. find + create
    const user3 = await this.userRepository.preload({
      id:101,
      email:'codefactory@codefactory.ai',
    }) 

    // 삭제하기
    // await this.userRepository.delete(101);

    // 원하는 프로퍼티의 값을 증가시킴
    // await this.userRepository.increment({
    //   id:1
    // },'count',2);

    // 값을 감소 시킴
    // await this.userRepository.decrement({
    //   id:1
    // },'count',1);

    // 개수 카운팅
    // const count = await this.userRepository.count({
    //   where : {
    //     email : ILike('%0%'),
    //   }
    // });

    // sum
    // const sum = await this.userRepository.sum('count',{
    //   id : LessThan(4),
    // });

    // average
    // const average = await this.userRepository.average('count',{
    //   id : LessThan(4),
    // });

    // const min = await this.userRepository.minimum('count',{
    //   id:LessThan(4),
    // });

    // const max = await this.userRepository.maximum('count',{
    //   id : LessThan(4),
    // });

    // find
    // const users = await this.userRepository.find({});

    // findOne , 값이 여러개 라면 첫번째 값 
    // const userOne = await this.userRepository.findOne({where:{
    //   id : 3
    // }});

    // 전체 데이터 개수도 반환
    const userAndCount = await this.userRepository.findAndCount({
      take : 3
    });


    return userAndCount ;
  }


  @Get('users')
  getUsers(){
    return this.userRepository.find({
      order:{
        id : 'ASC'
      },
      where:{
        // 아닌경우
        // id:Not(1),
        // 적은 경우
        // id : LessThan(30),
        // 적거나 같거나
        // id : LessThanOrEqual(30),
        // 많은 경우
        // id : MoreThan(30),
        // 많거나 같거나
        // id : MoreThanOrEqual(30),
        // 같은 경우
        // id : Equal(30),
        // 유사값
        // email : Like('%google%'),
        // 대문자 소문자 구분 안하는 유사값
        // email : ILike('%GOOGLE%')
        // 사이값
        // id:Between(10,15),
        // 해당되는 여러개의 값
        // id : In([1,3,5,7,99]),
        // null인 경우 가져오기
        // id : IsNull(),
      },
      // 어떤 프로퍼티를 선택할지
      // 기본은 모든 프로퍼티를 가져온다.
      // 만약 select를 정의하지 않는다면
      // select를 정의하면 정의된 프로퍼티만 가져온다.
      // select:{
      //   id:true,
      //   createdAt:true,
      //   updatedAt:true,
      //   version:true,
      //   profile:{
      //     id:true,
      //   },
      // },
      // 필터링한 조건을 입력하게 된다.
      // {} : and 조건
      // [] : or 조건  
      // 관계를 가져오는법
      // relations:{
      //   profile : true,
      // },
      // 오름차 , 내림차
      // order : {
      //   id: 'DESC',
      // },
      // 처음 몇개를 제외할지
      // skip:0,
      // 몇개를 가져올지 , 기본값 : 0
      // take:0,
    });
  }
  
  @Post('users')
 async postUser(){
    for(let i = 0 ; i < 100 ; i++){
      await this.userRepository.save({
        email : `user-${i}@google.com`
      });
   }
  }

  @Get('profile')
  getProfile(){
    return this.profileRepository.find({
      relations:{
        user:true,
      }
    });
  }




@Patch('users/:id')
 async patchUser(
    @Param('id') id:string
  ){
    const user = await this.userRepository.findOne({where:{
      id: parseInt(id) 
    }});

    return this.userRepository.save({
      ...user,
    });
  }

  @Post('user/profile')
  async createUserAndProfile(){
    const user = await this.userRepository.save({
      email:'asdfge@codefactory.ai',
      profile:{
        profileImage : 'asdf.jpg',
      }
    });


    // const profile = await this.profileRepository.save({
    //   profileImage:'asdf.jpg',
    //   user,
    // });

    return user;
  }

  @Delete('user/profile/:id')
  async deleteUserProfile(
    @Param('id') id : string,
  ){
    await this.profileRepository.delete(+id);
 
  }
  @Delete('user/:id')
  async deleteUser(
    @Param ('id') id :string,
  ) {
    const user = await this.userRepository.findOne({where:{
      id : +id
    }});

    this.userRepository.delete(user.id);

    return user;
  }


  @Post('user/post')
  async createUserAndPost(){
    const user = await this.userRepository.save({
      email:'postuser@codefactory.ai'
    });

     await this.postRepository.save({
      author : user,
      title : 'post1',
    });

    await this.postRepository.save({
      author : user,
      title : 'post2',
    });

    return user;
  }
  
  @Post('posts/tags')
  async createPostsTags(){
    const post1 = await this.postRepository.save({
      title : 'nestjsLecture',
    });

    const post2 = await this.postRepository.save({
      title : 'programmingLecture',
    });

    const tag1 = await this.tagRepository.save({
      name : 'javascript',
      posts : [post1,post2],
    });


    const tag2 = await this.tagRepository.save({
      name : 'typescript',
      posts : [post1],
    });

    const post3 = await this.postRepository.save({
      title : 'nextjsLecture',
      tags:[tag1,tag2],
    });

    return true;
  }

  @Get('posts')
  getPosts(){
    return this.postRepository.find({relations:{tags:true}});
  }

  @Get('tags')
  getTags(){
    return this.tagRepository.find({relations : {posts:true}});
  }
}
