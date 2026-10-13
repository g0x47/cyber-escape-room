# Cyber Escape Room

Interactive cybersecurity-awareness simulation built with Next.js/React.

## Game flow
Office desk → simulated Windows desktop → Outlook phishing → Edge lookalike site → suspicious software / Software Center → USB / File Explorer → Windows Security incident report → final score.

All applications, URLs, credentials and security events are simulations. No entered training credentials are persisted or transmitted.

## Run locally
Requires Node.js 20+.

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Production build
```bash
npm install
npm run build
npm start
```

## Deploy to Vercel
1. Create a GitHub/GitLab repository and upload this project, or import the project directly through Vercel.
2. In Vercel choose **Add New → Project** and import the repository.
3. Framework should be detected as **Next.js**.
4. No environment variables are required.
5. Click **Deploy**.

Every later push to the connected repository can create a new deployment automatically.

## Internal hosting
### Node server
On an internal Linux/Windows server with Node.js 20+:
```bash
npm install
npm run build
npm start
```
By default Next.js listens on port 3000. Put the service behind your organization's reverse proxy/load balancer and TLS configuration.

### Docker example
Create a standard Node 20 Docker image, copy the project, run `npm ci`, `npm run build`, and start with `npm start`. Expose port 3000. Keep TLS and authentication at your organization's ingress/reverse proxy if required.

## Notes before organizational deployment
- Replace fictional employee/organization labels as needed.
- Keep all fake login fields simulation-only; do not connect them to authentication APIs.
- If you later add employee tracking, use an approved SSO/backend rather than collecting passwords in this app.
- Test in the browsers used by your employees before launch.
