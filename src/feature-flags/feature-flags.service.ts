import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateFeatureFlagDto } from './dto/create-feature-flag.dto';
import { UpdateFeatureFlagDto } from './dto/update-feature-flag.dto';
import { FeatureFlagRepository } from './infrastructure/persistence/feature-flag.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { FeatureFlag } from './domain/feature-flag';

@Injectable()
export class FeatureFlagsService {
  constructor(
    // Dependencies here
    private readonly featureFlagRepository: FeatureFlagRepository,
  ) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createFeatureFlagDto: CreateFeatureFlagDto,
  ) {
    // Do not remove comment below.
    // <creating-property />

    return this.featureFlagRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
    });
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateFeatureFlagDto: UpdateFeatureFlagDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.featureFlagRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: FeatureFlag['id']) {
    return this.featureFlagRepository.remove(id);
  }
}
