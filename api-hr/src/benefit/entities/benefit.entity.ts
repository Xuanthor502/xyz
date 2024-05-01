import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, PrimaryColumn, JoinColumn, OneToOne } from 'typeorm';
import { Personal } from 'src/people/entities/person.entity';

@Entity('Benefit_Plans')
export class Benefit_plan {
  @PrimaryGeneratedColumn()

  Benefit_Plan_ID: number;
  @Column()
  Plan_Name: string;
  @Column()
  Deductable: number;
  @Column()
  Percentage_CoPay: number

  @OneToOne(() => Personal, personal => personal.benefit_plan)
  Employee: Personal;
}