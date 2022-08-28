import { DatabaseModule } from '../database';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { ModuleMetadata } from '@nestjs/common';
import { AuthModule } from '../features/auth/auth.module';

const moduleConfig: ModuleMetadata = {
  imports: [DatabaseModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
};

export default moduleConfig;
