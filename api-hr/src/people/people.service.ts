import { Injectable } from '@nestjs/common';
import { CreatePersonalDto } from './dto/create-person.dto';
import { UpdatePersonalDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Personal } from './entities/person.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PeopleService {
  constructor(@InjectRepository(Personal) private personalRepository: Repository<Personal>,) { }
  /*
     Service Personal
     */
  async createPersonal(createPersonalDto: CreatePersonalDto): Promise<Personal> {
  
    const queryRunner = this.personalRepository.manager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newPersonal = queryRunner.manager.create(Personal, createPersonalDto);
      const result = await queryRunner.manager.save(newPersonal);

      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAllPersonal(): Promise<Personal[]> {
    return await this.personalRepository.find({
      order: {
        Employee_ID: "ASC"
      }
    });
  }

  async findOnePersonal(id: number): Promise<Personal> {
    const personal = await this.personalRepository.findOneBy({ Employee_ID: id });

    return personal
  }
  async updatePersonalBenefit(id: number): Promise<any> {
    const updateResult = await this.personalRepository.update({ Benefit_Plans: id }, {
      Benefit_Plans: null
    });
    // const updatedPersonal = await this.personalRepository.find({ where: { Benefit_Plans: id } });
    return updateResult;
  }

  async updatePersonal(id: number, updatePersonalDto: UpdatePersonalDto): Promise<Personal> {
    const queryRunner = this.personalRepository.manager.connection.createQueryRunner();
    console.log(id)
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const personal = await queryRunner.manager.findOne(Personal, { where: { Employee_ID: id } });
      if (!personal) {
        throw new Error(`Personal with Employee_ID ${id} not found`);
      }

      queryRunner.manager.merge(Personal, personal, updatePersonalDto);
      const result = await queryRunner.manager.save(personal);

      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }


  async removePersonal(id: number): Promise<void> {
    const queryRunner = this.personalRepository.manager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await queryRunner.manager.delete(Personal, { Employee_ID: id });
      if (result.affected === 0) {
        throw new Error(`Personal with Employee_ID ${id} not found or already removed`);
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

}
