import type { CapacitorConfig } from '@capacitor/cli';
import 'dotenv/config';

const config: CapacitorConfig = {
  appId: 'com.todolist.app',
  appName: 'Todolist',
  webDir: 'dist/todolist-frontend/browser',
  android: {
    buildOptions: {
      keystorePath: process.env.KEYSTORE_PATH ?? '',
      keystorePassword: process.env.KEYSTORE_PASSWORD ?? '',
      keystoreAlias: process.env.KEYSTORE_ALIAS ?? '',
      keystoreAliasPassword: process.env.KEYSTORE_ALIAS_PASSWORD ?? '',
    },
    adjustMarginsForEdgeToEdge: 'auto',
  },
};

export default config;
