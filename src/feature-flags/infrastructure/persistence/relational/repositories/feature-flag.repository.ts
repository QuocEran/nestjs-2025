import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { FeatureFlagEntity } from '../entities/feature-flag.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { FeatureFlag } from '../../../../domain/feature-flag';
import { FeatureFlagRepository } from '../../feature-flag.repository';
import { FeatureFlagMapper } from '../mappers/feature-flag.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class FeatureFlagRelationalRepository implements FeatureFlagRepository {
  constructor(
    @InjectRepository(FeatureFlagEntity)
    private readonly featureFlagRepository: Repository<FeatureFlagEntity>,
  ) {}

  async create(data: FeatureFlag): Promise<FeatureFlag> {
    const persistenceModel = FeatureFlagMapper.toPersistence(data);
    const newEntity = await this.featureFlagRepository.save(
      this.featureFlagRepository.create(persistenceModel),
    );
    return FeatureFlagMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<FeatureFlag[]> {
    const entities = await this.featureFlagRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => FeatureFlagMapper.toDomain(entity));
  }

  async findById(id: FeatureFlag['id']): Promise<NullableType<FeatureFlag>> {
    const entity = await this.featureFlagRepository.findOne({
      where: { id },
    });

    return entity ? FeatureFlagMapper.toDomain(entity) : null;
  }

  async findByIds(ids: FeatureFlag['id'][]): Promise<FeatureFlag[]> {
    const entities = await this.featureFlagRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => FeatureFlagMapper.toDomain(entity));
  }

  async update(
    id: FeatureFlag['id'],
    payload: Partial<FeatureFlag>,
  ): Promise<FeatureFlag> {
    const entity = await this.featureFlagRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.featureFlagRepository.save(
      this.featureFlagRepository.create(
        FeatureFlagMapper.toPersistence({
          ...FeatureFlagMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return FeatureFlagMapper.toDomain(updatedEntity);
  }

  async remove(id: FeatureFlag['id']): Promise<void> {
    await this.featureFlagRepository.delete(id);
  }
}
