import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, PrimaryColumn, JoinColumn, OneToOne } from 'typeorm';
import { Personal } from 'src/people/entities/person.entity';

@Entity('Employment')
export class EmployeeHR {
  @PrimaryColumn()
  Employee_ID: number;

  @Column()
  Employment_Status:string;
  @Column()
  Hire_Date : Date
  @Column()
  Termination_Date : Date
  @OneToOne(() => Personal, personal => personal.employeeHR)
  @JoinColumn({ name: "Employee_ID" })
  Employee: Personal; 

}