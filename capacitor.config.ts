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
  plugins: {
    CapacitorSQLite: {
      iosDatabaseLocation: 'Library/CapacitorDatabase',
      iosIsEncryption: true,
      iosKeychainPrefix: 'angular-sqlite-app-starter',
      iosBiometric: {
        biometricAuth: false,
        biometricTitle: 'Biometric login for capacitor sqlite',
      },
      androidIsEncryption: true,
      androidBiometric: {
        biometricAuth: false,
        biometricTitle: 'Biometric login for capacitor sqlite',
        biometricSubTitle: 'Log in using your biometric',
      },
      electronIsEncryption: true,
      electronWindowsLocation: 'C:\\ProgramData\\CapacitorDatabases',
      electronMacLocation: '/Volumes/Development_Lacie/Development/Databases',
      electronLinuxLocation: 'Databases',
    },
  },
};

export default config;
