import { describe, it, expect } from 'vitest';
import { APP_CONFIG, ROUTES, NETWORK, UI } from './index';

describe('Constants', () => {
  it('should have correct app config', () => {
    expect(APP_CONFIG.name).toBe('TalentLens');
    expect(APP_CONFIG.supportEmail).toBe('support@talentlens.ai');
  });

  it('should have correct routes defined', () => {
    expect(ROUTES.HOME).toBe('/');
    expect(ROUTES.DASHBOARD).toBe('/dashboard');
  });

  it('should have correct network settings', () => {
    expect(NETWORK.MAX_RETRIES).toBe(3);
  });

  it('should have correct UI settings', () => {
    expect(UI.MAX_FILE_SIZE_MB).toBe(5);
  });
});
