import {
  // common
  Module,
} from '@nestjs/common';
import { FeatureFlagsService } from './feature-flags.service';
import { FeatureFlagsController } from './feature-flags.controller';
import { RelationalFeatureFlagPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // import modules, etc.
    RelationalFeatureFlagPersistenceModule,
  ],
  controllers: [FeatureFlagsController],
  providers: [FeatureFlagsService],
  exports: [FeatureFlagsService, RelationalFeatureFlagPersistenceModule],
})
export class FeatureFlagsModule {}
