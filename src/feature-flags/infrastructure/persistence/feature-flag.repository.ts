import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { FeatureFlag } from '../../domain/feature-flag';

export abstract class FeatureFlagRepository {
  abstract create(
    data: Omit<FeatureFlag, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<FeatureFlag>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<FeatureFlag[]>;

  abstract findById(id: FeatureFlag['id']): Promise<NullableType<FeatureFlag>>;

  abstract findByIds(ids: FeatureFlag['id'][]): Promise<FeatureFlag[]>;

  abstract update(
    id: FeatureFlag['id'],
    payload: DeepPartial<FeatureFlag>,
  ): Promise<FeatureFlag | null>;

  abstract remove(id: FeatureFlag['id']): Promise<void>;
}
