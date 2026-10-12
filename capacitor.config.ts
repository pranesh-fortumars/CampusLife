import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.campuslife.app',
  appName: 'CampusLife',
  webDir: 'out',
  server: {
    url: 'https://campus-life-m34k.vercel.app',
    cleartext: true,
    androidScheme: 'https'
  }
};

export default config;
