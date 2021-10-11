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

export type Address = {
  street: string;
  number: number;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  region: string;
};
@Entity()
export class ClientUser extends BaseEntity {
  @ObjectIdColumn({
    type: 'uuid',
  })
  _id!: ObjectId;

  @Column()
  name!: string;

  @Column()
  userType!: string;

  @Column()
  address!: Address;

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
