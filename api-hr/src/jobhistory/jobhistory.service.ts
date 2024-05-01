import { Injectable } from '@nestjs/common';
import { CreateJobHistoryDto } from './dto/create-jobhistory.dto';
import { UpdateJobHistoryDto } from './dto/update-jobhistory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JobHistory } from './entities/jobhistory.entity';
import { Brackets, Repository } from 'typeorm';
import aqp from 'api-query-params';


@Injectable()
export class JobhistoryService {

  constructor(@InjectRepository(JobHistory) private jobHistoryRepository: Repository<JobHistory>,) { }

  /*
  Service JobHistory
  */
  async createJobHistory(createJobHistoryDto: CreateJobHistoryDto): Promise<JobHistory> {
    const queryRunner = this.jobHistoryRepository.manager.connection.createQueryRunner();
    console.log(createJobHistoryDto)
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newJobHistory = queryRunner.manager.create(JobHistory, createJobHistoryDto);
      const result = await queryRunner.manager.save(newJobHistory);

      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
  async getAllJobHistories() {
    return this.jobHistoryRepository.find();
  }

  async getAllJobHistoriesParam(currentPage: number, limit: number, qs: string) {
    const { filter, sort } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;
    let offset = (+currentPage - 1) * (+limit);

    let queryBuilder = this.jobHistoryRepository.createQueryBuilder('jobHistory');

    // Xử lý filter
    if (filter) {
      Object.keys(filter).forEach(key => {
        queryBuilder = queryBuilder.andWhere(`jobHistory.${key} = :value`, { value: filter[key] });
      });
    }

    // Xử lý sort
    if (sort) {
      Object.entries(sort).forEach(([key, value]) => {
        queryBuilder = queryBuilder.addOrderBy(`jobHistory.${key}`, value === 1 ? 'ASC' : 'DESC');
      });
    }
    const [results, totalItems] = await queryBuilder
      .skip(offset)
      .take(limit)
      .getManyAndCount();

    const totalPages = Math.ceil(totalItems / (+limit));

    return {
      meta: {
        current: currentPage,
        pageSize: limit,
        totalPages,
        totalItems,
      },
      results,
    };
  }
  async getAllJobHistoriesPeople(currentPage: number, limit: number, qs: string, search: string, relations: string[] = []) {
    const { filter, sort } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;
    let offset = (+currentPage - 1) * (+limit);

    let queryBuilder = this.jobHistoryRepository.createQueryBuilder('jobHistory')
      .leftJoinAndSelect('jobHistory.Employee', 'Employee');

    if (search) {
      queryBuilder = queryBuilder.andWhere(
        new Brackets(qb => {
          qb.where('jobHistory.Department LIKE :search', { search: `%${search}%` })
            .orWhere('jobHistory.Job_Title LIKE :search', { search: `%${search}%` })
            .orWhere('jobHistory.Location LIKE :search', { search: `%${search}%` })
            .orWhere('Employee.Last_Name LIKE :search', { search: `%${search}%` });
        })
      );
    }
    // Áp dụng sắp xếp
    if (sort) {
      Object.entries(sort).forEach(([key, value]) => {
        queryBuilder.addOrderBy(`jobHistory.${key}`, value === 1 ? 'ASC' : 'DESC');
      });
    }

    const [result, totalItems] = await queryBuilder.skip(offset).take(limit).getManyAndCount();

    const totalPages = Math.ceil(totalItems / limit);
    return {
      meta: {
        current: currentPage,
        pageSize: limit,
        total: totalItems,
        pages: totalPages,
      },
      result,
    };
  }
  async getOneJobHistoriesPeopleByIdJobHistory(id: number): Promise<JobHistory[]> {
    return await this.jobHistoryRepository.find({ where: { ID: id }, relations: ['Employee'] });
  }

  async findOneJobHistory(id: number): Promise<JobHistory[]> {
    const jobHistory = await this.jobHistoryRepository.find({ where: { Employee_ID: id } });
    return jobHistory;
  }

  async findOneJobHistoryByID(id: number): Promise<JobHistory[]> {
    const jobHistory = await this.jobHistoryRepository.find({ where: { ID: id } });
    return jobHistory;
  }
  async updateJobHistory(ID:number ,updateJobHistoryDto: UpdateJobHistoryDto): Promise<JobHistory> {
    const queryRunner = this.jobHistoryRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const jobHistory = await queryRunner.manager.findOne(JobHistory, { where: { ID } });
      if (!jobHistory) {
        throw new Error(`JobHistory with ID ${ID} not found`);
      }

      queryRunner.manager.merge(JobHistory, jobHistory, updateJobHistoryDto);
      const result = await queryRunner.manager.save(jobHistory);

      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async removeJobHistoryByID(ID: number): Promise<void> {
    const queryRunner = this.jobHistoryRepository.manager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await queryRunner.manager.delete(JobHistory, { ID: ID });
      // if (result.affected === 0) {
      //   throw new Error(`JobHistory with ID ${ID} not found or already removed`);
      // }

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
  async removeJobHistory(ID: number): Promise<void> {
    const queryRunner = this.jobHistoryRepository.manager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await queryRunner.manager.delete(JobHistory, { Employee_ID: ID });
      // if (result.affected === 0) {
      //   throw new Error(`JobHistory with ID ${ID} not found or already removed`);
      // }

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }


  async createMultipleJobHistories(jobHistories: CreateJobHistoryDto[]): Promise<JobHistory[]> {
    const queryRunner = this.jobHistoryRepository.manager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Khởi tạo một mảng để giữ các đối tượng JobHistory được tạo mới
      const createdJobHistories: JobHistory[] = [];

      for (const jobHistoryDto of jobHistories) {
        // Tạo một instance mới của JobHistory từ DTO
        const newJobHistory = queryRunner.manager.create(JobHistory, {
          ...jobHistoryDto
        });

        // Lưu JobHistory mới tạo vào cơ sở dữ liệu
        const savedJobHistory = await queryRunner.manager.save(JobHistory, newJobHistory);

        // Thêm JobHistory vào mảng kết quả
        createdJobHistories.push(savedJobHistory);
      }

      // Xác nhận giao dịch nếu tất cả JobHistory đều được tạo thành công
      await queryRunner.commitTransaction();

      // Trả về mảng các JobHistory đã được tạo mới
      return createdJobHistories;
    } catch (error) {
      // Hoàn tác giao dịch nếu có lỗi xảy ra
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // Giải phóng queryRunner
      await queryRunner.release();
    }
  }

}
