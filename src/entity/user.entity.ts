import { Version } from "@nestjs/common";
import { Column, CreateDateColumn, Entity, Generated, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { PostModel } from "./post_entity";
import { ProfileModel } from "./profile_entity";

export enum Role{
    User = 'user',
    Admin = 'admin'
}


@Entity()  
export class UserModel{
    
    // @PrimaryGeneratedColumn() : 자동으로 Id를 생성한다.
    // PrimaryColumn은  모든 테이블에서 기본적으로 존재해야한다.
    // 테이블 안에서 각갇의 Row를 구분 할수 있는 칼럼이다. 
    // @PrimaryColumn() -> 1,2,3....99999
    // @PrimaryGeneratedColumn('uuid')
    // UUID -> 12sdvi3-f13fo1fnjo1-f31jjkf13-f1f31jn
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    email:string;

    // @Column({
    //     // 데이터베이스 인지하는 컬럼 타입
    //     // 자동으로 유추
    //     type:'varchar',
    //     // 데이터베이스 인지하는 컬럼 이름
    //     // 자동으로 유추
    //     name : '_title',
    //     // 값의 길이
    //     // 입력할수 있는 값의 길이
    //     length:300,
    //     // null이 가능한지
    //     nullable : true,
    //     // true면 처음 지정할때만 값 변경 가능
    //     // 이후에는 값 변경 불가능
    //     update : true,
    //     // find()를 실행할때 기본으로 값을 불러올지
    //     // 기본값이 true
    //     select : false,
    //     // 기본값
    //     default : 'default value',
    //     // 컬럼중에서 유일무이한 값이 되야하는지
    //     unique : false
    // })
    // title : string;

    @Column({
        type:'enum',
        enum:Role,
        default:Role.User
    })
    role : Role;

    // 데이터가 생성되는 날짜와 시간이 자동으로 찍힌다.
    @CreateDateColumn()
    createdAt : Date;

    // 데이터가 업데이트 되는 날짜와 시간이 자동으로 찍힌다.
    @UpdateDateColumn()
    updatedAt : Date;

    // 데이터가 업데이트 될때 마다 1씩 올라간다.
    // 초기값은 1이고 , save() 함수가 몇번 불렸는지 기억한다.
    @VersionColumn({default:1})
    version: number;

    // 
    @Column()
    @Generated('uuid')
    additionalId : string;

    @OneToOne(()=>ProfileModel,(profile)=>profile.user,{
        // find() 실행시 항상 같이 가져올 relation
        eager : false,
        // 저장할때 relation을 한번에 같이 저장가능
        cascade : true, 
        // null이 가능한지
        nullable : true,
        // 관계가 삭제 됐을때
        // no Action -> 아무것도 안함
        // casecade -> 참조하는 Row 같이 삭제
        // set null -> 참조하는 Row에서 참조 id null
        // set default -> 기본 세팅으로 설정 (테이블의 기본 세팅)
        // restrict -> 참조하고 있는 Row가 있는 경우 참조 당하는 Row 삭제 불가
        onDelete : 'CASCADE',
    })
    @JoinColumn()
    profile:ProfileModel;


    @OneToMany(()=>PostModel,(post) => post.author)
    posts:PostModel[];

    @Column({
        default : 0,
    })
    count:number;
}