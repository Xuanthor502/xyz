import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { Personal } from 'src/people/entities/person.entity';

@Entity()
export class JobHistory {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  Department: string;

  @Column()
  Departmen_Code: number;
  @Column()
  Employee_ID: number; // Thêm cột này để sử dụng làm khóa ngoại
  @Column()
  Start_Date: Date;
  @Column()
  End_Date: Date;
  @Column()
  Job_Title: string;

  @Column()
  Job_Category: string;
  @Column()
  Supervisor: number;
  @Column()
  Location: string;
  @Column()
  Salary_Type: number;
  @Column()
  Pay_Period :string 
  @Column()
  Division: string;
  @Column()

  Hours_per_Week: number;
  @Column()
  Hazardous_Training: boolean;
  @ManyToOne(() => Personal, personal => personal.jobHistory)
  @JoinColumn({ name: "Employee_ID" }) 
  Employee: Personal;


}