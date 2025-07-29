import * as path from 'path';

import { ConfigModule } from '@nestjs/config';

import defaultConfig from './default';

const env = process.env.NODE_ENV || 'development';

const environmentConfig = {}[env] || defaultConfig;

export default {
  ...defaultConfig,
  ...environmentConfig,
};

export const ConfigModuleSetup = ConfigModule.forRoot({
  load: [() => environmentConfig],
  isGlobal: true,
  envFilePath: path.resolve(__dirname, '../.env'),
});
