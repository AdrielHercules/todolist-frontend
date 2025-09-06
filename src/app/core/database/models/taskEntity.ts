import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ListEntity } from './listEntity';

@Entity('task')
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text', nullable: false })
  text!: string;

  @Column({ type: 'boolean', nullable: false })
  completed!: boolean;

  @ManyToOne(() => ListEntity, (listEntity) => listEntity.id)
  list!: ListEntity;
}
