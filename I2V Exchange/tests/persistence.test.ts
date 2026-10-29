import { expect, it } from 'vitest';
import { mkdtempSync, unlinkSync, rmdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { openDatabase, transaction } from '@i2v/persistence';
it('persists committed state across connections and rolls back a failed transaction', () => {
  const directory = mkdtempSync(join(tmpdir(), 'i2v-persistence-')); const path = join(directory, 'test.sqlite');
  let db = openDatabase(path);
  try {
    db.prepare('INSERT INTO users(id,email,name,password_hash) VALUES(?,?,?,?)').run('test', 'test@example.test', 'Persistent account', 'test-only');
    expect(() => transaction(db, () => { db.prepare('UPDATE users SET name=? WHERE id=?').run('Uncommitted name', 'test'); throw new Error('Abort mutation'); })).toThrow('Abort mutation');
    db.close(); db = openDatabase(path);
    expect(db.prepare('SELECT name FROM users WHERE id=?').get('test')?.name).toBe('Persistent account');
    expect(db.prepare('SELECT version FROM schema_migrations').get()?.version).toBe(1);
  } finally { db.close(); unlinkSync(path); rmdirSync(directory); }
});
