import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
export function openDatabase(path: string): DatabaseSync {
  if (path !== ':memory:') mkdirSync(dirname(path), { recursive: true });
  const db = new DatabaseSync(path);
  db.exec(`PRAGMA foreign_keys = ON; PRAGMA journal_mode = WAL; PRAGMA busy_timeout = 5000;
    CREATE TABLE IF NOT EXISTS schema_migrations(version INTEGER PRIMARY KEY, applied_at TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS users(id TEXT PRIMARY KEY, email TEXT NOT NULL UNIQUE, name TEXT NOT NULL, bio TEXT NOT NULL DEFAULT '', password_hash TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS roles(user_id TEXT NOT NULL REFERENCES users(id), role TEXT NOT NULL, state TEXT NOT NULL, verification TEXT NOT NULL, PRIMARY KEY(user_id,role));
    CREATE TABLE IF NOT EXISTS sessions(token_hash TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id), expires_at INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS projects(id TEXT PRIMARY KEY, owner_id TEXT NOT NULL REFERENCES users(id), data TEXT NOT NULL, public_data TEXT, published INTEGER NOT NULL DEFAULT 0);
    CREATE TABLE IF NOT EXISTS evidence(id TEXT PRIMARY KEY, project_id TEXT NOT NULL REFERENCES projects(id), title TEXT NOT NULL, content TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS grants(actor_id TEXT NOT NULL REFERENCES users(id), resource_id TEXT NOT NULL, operation TEXT NOT NULL, expires_at INTEGER NOT NULL, revoked INTEGER NOT NULL DEFAULT 0, PRIMARY KEY(actor_id,resource_id,operation));
    CREATE TABLE IF NOT EXISTS access_requests(id TEXT PRIMARY KEY, project_id TEXT NOT NULL REFERENCES projects(id), resource_id TEXT NOT NULL, requester_id TEXT NOT NULL REFERENCES users(id), purpose TEXT NOT NULL, kind TEXT NOT NULL, status TEXT NOT NULL, expires_at INTEGER, created_at TEXT NOT NULL, response TEXT NOT NULL DEFAULT '');
    CREATE UNIQUE INDEX IF NOT EXISTS pending_access ON access_requests(project_id,resource_id,requester_id,kind) WHERE status = 'pending';
    CREATE TABLE IF NOT EXISTS watchlist(user_id TEXT NOT NULL REFERENCES users(id), project_id TEXT NOT NULL REFERENCES projects(id), PRIMARY KEY(user_id,project_id));
    CREATE TABLE IF NOT EXISTS organizations(id TEXT PRIMARY KEY, name TEXT NOT NULL, kind TEXT NOT NULL, verification TEXT NOT NULL DEFAULT 'unverified');
    CREATE TABLE IF NOT EXISTS memberships(organization_id TEXT NOT NULL REFERENCES organizations(id), user_id TEXT NOT NULL REFERENCES users(id), state TEXT NOT NULL, PRIMARY KEY(organization_id,user_id));
    CREATE TABLE IF NOT EXISTS audit_events(id TEXT PRIMARY KEY, actor_id TEXT NOT NULL, action TEXT NOT NULL, resource_id TEXT NOT NULL, created_at TEXT NOT NULL);
    CREATE TRIGGER IF NOT EXISTS audit_no_update BEFORE UPDATE ON audit_events BEGIN SELECT RAISE(ABORT, 'Audit events are append-only'); END;
    CREATE TRIGGER IF NOT EXISTS audit_no_delete BEFORE DELETE ON audit_events BEGIN SELECT RAISE(ABORT, 'Audit events are append-only'); END;
    INSERT OR IGNORE INTO schema_migrations(version,applied_at) VALUES(1,datetime('now'));
  `);
  return db;
}
export function transaction<T>(db: DatabaseSync, fn: () => T): T {
  db.exec('BEGIN IMMEDIATE');
  try { const result = fn(); db.exec('COMMIT'); return result; } catch (error) { db.exec('ROLLBACK'); throw error; }
}
