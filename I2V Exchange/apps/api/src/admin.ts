import { openDatabase, transaction } from '@i2v/persistence';
import { randomUUID } from 'node:crypto';
import { requireLocalMode } from '@i2v/adapters';
try { process.loadEnvFile('.env'); } catch (error) { if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error; }
requireLocalMode(process.env.I2V_MODE);
const email = process.argv[2]?.trim().toLowerCase();
if (!email) throw new Error('Usage: npm run admin -- existing-account@example.com (local database owner only).');
const db = openDatabase(process.env.I2V_DATABASE ?? '.local/i2v.sqlite');
const user = db.prepare('SELECT id FROM users WHERE email=?').get(email);
if (!user) throw new Error('Register this local account first.');
transaction(db, () => {
  db.prepare("INSERT INTO roles VALUES(?,'administrator','approved','reviewed') ON CONFLICT(user_id,role) DO UPDATE SET state='approved',verification='reviewed'").run(String(user.id));
  db.prepare('INSERT INTO audit_events VALUES(?,?,?,?,?)').run(randomUUID(), 'local-database-operator', 'administrator.bootstrapped', String(user.id), new Date().toISOString());
});
db.close();
console.log('Local administrator role recorded. This does not grant access to private projects.');
