/**
 * @module tests/security/env
 * @description Verifies environment variable hygiene.
 */
import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

const root = path.resolve(process.cwd());
const read = (f: string) => fs.readFileSync(path.join(root, f), 'utf8');

describe('Environment variable security', () => {
  it('.env.example exists',                        () => expect(fs.existsSync(path.join(root, '.env.example'))).toBe(true));
  it('.env.example has VITE_FIREBASE_API_KEY',     () => expect(read('.env.example')).toContain('VITE_FIREBASE_API_KEY='));
  it('.env.example has VITE_FIREBASE_PROJECT_ID',  () => expect(read('.env.example')).toContain('VITE_FIREBASE_PROJECT_ID='));
  it('.env.example has VITE_GA_MEASUREMENT_ID',    () => expect(read('.env.example')).toContain('VITE_GA_MEASUREMENT_ID='));
  it('.gitignore excludes .env files',             () => expect(read('.gitignore')).toMatch(/^\.env$/m));
  it('.gitignore excludes AI tool caches',         () => expect(read('.gitignore')).toContain('.cursor/'));
  it('.gitignore excludes graphify-out',           () => expect(read('.gitignore')).toContain('graphify-out/'));
  it('.gitignore excludes CLAUDE.md',              () => expect(read('.gitignore')).toContain('CLAUDE.md'));
});

describe('No raw API keys in source files', () => {
  const filesToCheck = [
    'src/config/firebase.ts',
    'src/config/env.ts',
    'src/services/analyticsService.ts',
  ].filter((f) => fs.existsSync(path.join(root, f)));

  filesToCheck.forEach((file) => {
    it(`${file} has no raw Firebase API key`, () => {
      expect(read(file)).not.toMatch(/AIzaSy[A-Za-z0-9_-]{33}/);
    });
  });
});
