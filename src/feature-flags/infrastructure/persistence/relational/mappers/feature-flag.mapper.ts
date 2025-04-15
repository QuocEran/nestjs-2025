import { FeatureFlag } from '../../../../domain/feature-flag';
import { FeatureFlagEntity } from '../entities/feature-flag.entity';

export class FeatureFlagMapper {
  static toDomain(raw: FeatureFlagEntity): FeatureFlag {
    const domainEntity = new FeatureFlag();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: FeatureFlag): FeatureFlagEntity {
    const persistenceEntity = new FeatureFlagEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
