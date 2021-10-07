import { ObjectId } from 'bson';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
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
export class Demands extends BaseEntity {
  @ObjectIdColumn({
    type: 'uuid',
  })
  _id!: ObjectId;

  @Column()
  status!: string;

  @Column()
  serviceDate!: Date;

  @Column()
  extraServices!: [];

  @Column()
  clientId!: string;

  @Column()
  professionalId!: string;

  @Column()
  serviceType!: string;

  @Column()
  serviceValue!: number;

  @Column()
  address!: Address;

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
