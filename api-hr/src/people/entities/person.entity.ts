import { Entity, Column, PrimaryGeneratedColumn, OneToMany, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { JobHistory } from 'src/jobhistory/entities/jobhistory.entity';
import { EmployeeHR } from '../../employee/entities/employee.entity';
import { Benefit_plan } from 'src/benefit/entities/benefit.entity';

@Entity()
export class Personal {
  @PrimaryColumn()
  Employee_ID: number;
  @Column()
  Last_Name: string;
  @Column()
  First_Name: string;
  @Column()
  Email: string;
  @Column()
  Phone_Number: string;
  @Column()
  City: string;
  @Column()
  Gender: boolean;

  @Column()
  Ethnicity: string;

  @Column()
  Shareholder_Status: boolean;
 
  @Column()
  Benefit_Plans: number;

  @OneToMany(() => JobHistory, jobHistory => jobHistory.Employee)
  jobHistory: JobHistory[];
  @OneToOne(() => EmployeeHR, employeeHR => employeeHR.Employee)
  employeeHR: EmployeeHR;

  // @Column({ nullable: true })
  // Benefit_Plans: number; // Giả định đây là cột khóa ngoại

  @OneToOne(() => Benefit_plan, benefit_plan => benefit_plan.Employee)
  @JoinColumn({ name: "Benefit_Plans" }) // Chỉ định cột khóa ngoại
  benefit_plan: Benefit_plan;
}