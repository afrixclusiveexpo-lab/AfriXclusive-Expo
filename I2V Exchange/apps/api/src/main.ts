import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createApplication } from './app.js';
const root = fileURLToPath(new URL('../../../', import.meta.url));
try { process.loadEnvFile(resolve(root, '.env')); } catch (error) { if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error; }
const mode = process.env.I2V_MODE;
const host = process.env.I2V_HOST ?? '127.0.0.1';
if (!['127.0.0.1', 'localhost', '::1'].includes(host) && process.env.I2V_ALLOW_LAN !== '1') throw new Error('Set I2V_ALLOW_LAN=1 explicitly before binding local authentication to a trusted LAN.');
const app = createApplication({ mode: mode ?? '', database: resolve(root, process.env.I2V_DATABASE ?? '.local/i2v.sqlite'), origins: process.env.I2V_WEB_ORIGINS?.split(',').map(x => x.trim()) });
const port = Number(process.env.I2V_PORT ?? 4100);
app.server.listen(port, host, () => console.log(`I2V local API: http://${host}:${port} — fictional discovery seeds; real local accounts; capital disabled.`));
for (const signal of ['SIGINT', 'SIGTERM'] as const) process.on(signal, () => { app.close(); process.exit(0); });
