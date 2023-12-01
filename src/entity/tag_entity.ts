import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { PostModel } from "./post_entity";

@Entity()
export class TagModel{
    @PrimaryGeneratedColumn()
    id:number;

   

    @ManyToMany(()=>PostModel,(post)=>post.tags)
    posts : PostModel[];

    @Column()
    name : string;

}