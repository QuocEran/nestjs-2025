import { ApiProperty } from '@nestjs/swagger';
import { FeatureFlagEntity } from '../infrastructure/persistence/relational/entities/feature-flag.entity';

export class FeatureFlag {
  constructor(featureFlagEntity: FeatureFlagEntity) {
    Object.assign(this, featureFlagEntity);
  }

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  name: string;

  @ApiProperty()
  enabled: boolean;

  @ApiProperty()
  description: string;
}
