import { ObjectId } from 'bson';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ClientUser extends BaseEntity {
  @ObjectIdColumn({
    type: 'uuid',
  })
  _id!: ObjectId;

  @Column()
  name!: string;

  @Column()
  @Index({ unique: true })
  document!: string;

  @Column()
  password!: string;

  @Column()
  email!: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: true,
  })
  updatedAt?: Date;
}
