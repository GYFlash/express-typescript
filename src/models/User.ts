// ProjectName: express_01
// FileName: User.ts
// 作者：区区电脑
// createTime: 2019/4/22

import {Entity, Column, PrimaryGeneratedColumn, BaseEntity} from "typeorm";

@Entity()
class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column({
        type: 'text',
        charset: 'utf8'
    })
    name: string | undefined;

    @Column('int')
    age: number | undefined;

    @Column({
        type: 'text',
        charset: 'utf8'
    })
    sign: string | undefined;
}

export { User }
