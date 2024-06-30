import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.raspberry',
  appName: 'game',
  webDir: 'out',
  server: {
    androidScheme: 'http',
  }
  
};

export default config;
