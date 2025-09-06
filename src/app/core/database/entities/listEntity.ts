import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TaskEntity } from './taskEntity';

@Entity('list')
export class ListEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text', nullable: false })
  name!: string;

  @Column({ type: 'text', nullable: false })
  icon!: string;

  @OneToMany(() => TaskEntity, (taskEntity) => taskEntity.list)
  tasks!: TaskEntity[];
}
