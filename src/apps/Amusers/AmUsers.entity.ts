import { ObjectId } from 'bson';
import { BaseEntity, Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class AmUsers extends BaseEntity {
  @ObjectIdColumn({
    type: 'uuid',
  })
  _id!: ObjectId;

  @Column()
  userId!: string;

  @Column()
  Nome!: string;

  @Column()
  Salary!: string;

  @Column()
  Pais!: string;

  @Column()
  locationCity!: string;

  @Column()
  specficName!: string;

  @Column()
  siglaSetor!: string;

  @Column()
  JobTitle!: string;

  @Column()
  hiringDate!: string;
}
