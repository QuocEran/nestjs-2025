import { Module } from '@nestjs/common';
import { FeatureFlagRepository } from '../feature-flag.repository';
import { FeatureFlagRelationalRepository } from './repositories/feature-flag.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeatureFlagEntity } from './entities/feature-flag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FeatureFlagEntity])],
  providers: [
    {
      provide: FeatureFlagRepository,
      useClass: FeatureFlagRelationalRepository,
    },
  ],
  exports: [FeatureFlagRepository],
})
export class RelationalFeatureFlagPersistenceModule {}
