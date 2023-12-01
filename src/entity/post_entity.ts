import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TagModel } from "./tag_entity";
import { UserModel } from "./user.entity";

@Entity()
export class PostModel{

    @PrimaryGeneratedColumn()
    id : number;

    @ManyToOne(()=>UserModel,(user)=>user.posts)
    author : UserModel;

    @Column()
    title : string;

    @ManyToMany(()=>TagModel,(tags)=>tags.posts)
    @JoinTable()
    tags : TagModel[];
}