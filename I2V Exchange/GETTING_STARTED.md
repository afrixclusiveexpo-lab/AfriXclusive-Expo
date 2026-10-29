# Run I2V Exchange locally

Run all commands in this directory (the one containing `package.json`). Windows PowerShell examples use `npm.cmd` and `npx.cmd` because this machine blocks `.ps1` launcher scripts; no execution-policy change is needed. macOS/Linux users can use `npm` and `npx`.

## Requirements

- Node.js 24 LTS, version 24.13 or later in the 24.x line. The API uses Node's built-in SQLite driver; no database account or native compiler is required.
- npm 11 or later and internet access for the first dependency installation.
- An iPhone with the App Store version of Expo Go for the SDK 54 preview. This choice follows Expo's current [Expo Go compatibility guidance](https://docs.expo.dev/troubleshooting/expo-go-version-mismatch/). Recheck compatibility before later SDK upgrades; development builds are the path for new native capabilities.

## Browser and API

```powershell
cd 'C:\Users\ELITE COMPUTER\WeQuaFx\i2v-exchange\I2V Exchange'
npm.cmd ci
Copy-Item -LiteralPath '.env.example' -Destination '.env'
npm.cmd run dev
```

Open **http://127.0.0.1:5173**. API health: **http://127.0.0.1:4100/health**. API data persists at `.local/i2v.sqlite`, relative to this monorepo root. Do not overwrite an existing `.env`; edit its documented settings instead. On another computer, replace the `cd` path with your checkout path.

The API loads the root `.env`; existing terminal environment variables take precedence. `I2V_MODE=local` is mandatory. Production mode fails closed rather than substituting local identities or fictional data. The Vite development server proxies `/api` to the local API. Static web assets alone cannot supply an authentication backend.

## Expo Go on your physical iPhone

1. Connect the PC and iPhone to the same **trusted** Wi-Fi. Obtain the PC's Wi-Fi IPv4 address with `ipconfig`. Do not use `127.0.0.1` or `localhost` on the phone: those addresses refer to the phone itself.
2. In the root `.env`, set:

```dotenv
I2V_MODE=local
I2V_HOST=0.0.0.0
I2V_ALLOW_LAN=1
```

3. Copy `apps/mobile/.env.example` to `apps/mobile/.env` and replace its sample IP address:

```powershell
Copy-Item -LiteralPath 'apps/mobile/.env.example' -Destination 'apps/mobile/.env'
```

```dotenv
EXPO_PUBLIC_API_URL=http://YOUR_PC_WIFI_IPV4:4100
```

4. Restart the API and run Metro in a second terminal from this monorepo root:

```powershell
# Terminal 1
npm.cmd run dev

# Terminal 2
npm.cmd run dev:mobile
```

5. Scan the printed Expo QR code with the iPhone Camera app and open it in Expo Go. If prompted by Windows Firewall, permit the development servers on **private networks** only. The API uses port 4100 and Metro normally uses 8081. Verify `http://YOUR_PC_WIFI_IPV4:4100/health` in Safari if discovery cannot connect.

LAN development uses HTTP and local accounts. Use a unique development password and a trusted network; this is not a production authentication deployment. Public configuration contains only the API base URL. Passwords, provider secrets and signing keys do not belong in `EXPO_PUBLIC_*` settings.

## Try the connected workflows

- Browse fictional projects without signing in; filter by sector, search, inspect milestone histories, and compare projects on web.
- Create a local founder/student/researcher account. Other roles can register too; sensitive capabilities stay requested until approved.
- Create a private project with confidential notes. Inspect its public preview, declare rights, then deliberately publish the safe summary. Draft edits remain private until republished.
- Save a published project to your watchlist; reload to confirm persistence.
- Create a second local account, open the first member's project and request collaboration. Return as the founder to Network, respond, and approve or decline. Collaboration approval grants no private evidence access.
- On web, add a private evidence note in Workspace. Share the project ID and note reference with the intended requester. They can request that specific note in Network; the owner approves a bounded access window and can revoke it. Expired or revoked access is rejected by the API.
- Add roles and create unverified organization claims from Profile. Organization membership approval exists in the API; no institution role bypasses project privacy.

Fictional seeded projects have a disabled curator account and cannot receive real requests. Register two local accounts and publish your own test project to exercise responses.

## Local administrator bootstrap

Register the account first. A developer with access to the local database can then run:

```powershell
npm.cmd run admin -- registered-account@example.com
```

This is an explicit local database operator action, recorded in the audit log. It never assigns a default password, grants private project access, or configures a production identity provider. Reviewed role requests can then be decided through `POST /admin/roles`. A full admin review UI and privileged-account MFA remain future work.

## Verification commands

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd test
npm.cmd run build

# Install the browser locally to this checkout, then run browser journeys:
$env:PLAYWRIGHT_BROWSERS_PATH = "$PWD\.local\browsers"
npx.cmd playwright install chromium
npm.cmd run test:e2e

# Check native bundles without claiming a physical-device test:
npm.cmd run export -w @i2v/mobile
npx.cmd expo install --check --cwd apps/mobile

# Preserved specification/skill validation:
python scripts/validate_pack.py
```

See `TESTING_STATUS.md` for what actually ran, rather than interpreting this command list as test evidence. Stop local development servers with Ctrl+C. Account recovery, email verification, MFA, production transport/storage, live providers, and real-device usability are release dependencies.
