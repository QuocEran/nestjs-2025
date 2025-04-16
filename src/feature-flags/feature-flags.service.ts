import {
  HttpException,
  HttpStatus,
  // common
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFeatureFlagDto } from './dto/create-feature-flag.dto';
import { UpdateFeatureFlagDto } from './dto/update-feature-flag.dto';
import { FeatureFlagRepository } from './infrastructure/persistence/feature-flag.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { FeatureFlag } from './domain/feature-flag';
import PostgresErrorCode from '@drdgvhbh/postgres-error-codes';

@Injectable()
export class FeatureFlagsService {
  constructor(
    // Dependencies here
    private readonly featureFlagRepository: FeatureFlagRepository,
  ) {}

  async create(createFeatureFlagDto: CreateFeatureFlagDto) {
    try {
      const newFlag = this.featureFlagRepository.create(createFeatureFlagDto);

      return newFlag;
    } catch (error) {
      if (error?.code === PostgresErrorCode.PG_UNIQUE_VIOLATION) {
        throw new HttpException(
          'Feature flag with that name already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.featureFlagRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: FeatureFlag['id']) {
    return this.featureFlagRepository.findById(id);
  }

  findByIds(ids: FeatureFlag['id'][]) {
    return this.featureFlagRepository.findByIds(ids);
  }

  async update(
    id: FeatureFlag['id'],
    updateFeatureFlagDto: UpdateFeatureFlagDto,
  ) {
    try {
      await this.featureFlagRepository.update(id, updateFeatureFlagDto);
    } catch (error) {
      if (error?.code === PostgresErrorCode.PG_UNIQUE_VIOLATION) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const updatedFeatureFlag = await this.featureFlagRepository.findById(id);
    if (updatedFeatureFlag) {
      return updatedFeatureFlag;
    }
    throw new NotFoundException();
  }

  remove(id: FeatureFlag['id']) {
    return this.featureFlagRepository.remove(id);
  }

  async getByName(name: FeatureFlag['name']) {
    return this.featureFlagRepository.getByName(name);
  }

  async isEnabled(name: FeatureFlag['name']) {
    const featureFlag = await this.getByName(name);
    if (!featureFlag) {
      return false;
    }
    return featureFlag.enabled;
  }
}
