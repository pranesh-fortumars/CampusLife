import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.campuslife.app',
  appName: 'CampusLife',
  webDir: 'out',
  server: {
    // If LIVE_APP_URL is provided, the APK will live-load this URL and auto-sync all updates
    url: process.env.LIVE_APP_URL || undefined,
    androidScheme: 'https',
    cleartext: true
  }
};

export default config;
