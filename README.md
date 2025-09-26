
# Traffic Tickets — Home page scaffold

Branch: `002-title-home-page`

What I added:

- `specs/002-title-home-page/spec.md` — Feature specification for the Home page (web + mobile)

- `web/index.html` — Lightweight static preview of the web Home page

- `mobile/App.js` — Minimal Expo-compatible React Native placeholder for mobile Home page

How to preview

- Web: open `web/index.html` in your browser or run a simple static server (e.g., `npx http-server web`)

- Mobile: from the `mobile` folder, run with Expo CLI (`npx expo start`) or copy `App.js` into an existing React Native/Expo project.

Notes and next steps

- Decide authentication method and roles so we can finalize FR-007 and related clarifications.

- Integrate plate-scan lookup API if available.

New login page

- The branch `003-title-login-page` adds a glassmorphism-inspired login UI at `web/index.html` (UI-only prototype). Open it directly in a browser or serve the `web` folder to preview.


Authentication approach (chosen)

- Hybrid: Primary email/password, optional SSO for agencies, and device-bound quick-login (mobile-only) for convenience. The web and mobile scaffolds include UI placeholders for email/password, SSO, and quick-login flows (UI-only; no backend wired).

Preview sign-in placeholders

- Web: use the form at the top of `web/index.html` to trigger the sign-in placeholder alerts.
- Mobile: `mobile/App.js` includes a stubbed sign-in form and a "Device Quick-Login" button; run with Expo to preview.
