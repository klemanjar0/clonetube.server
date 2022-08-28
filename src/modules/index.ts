import { DatabaseModule } from '../database';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { ModuleMetadata } from '@nestjs/common';
import { AuthModule } from '../features/auth/auth.module';
import { FileModule } from '../features/files/file.module';

const moduleConfig: ModuleMetadata = {
  imports: [DatabaseModule, AuthModule, FileModule],
  controllers: [AppController],
  providers: [AppService],
};

export default moduleConfig;
