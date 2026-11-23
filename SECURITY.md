# Security and privacy

## Scope of this public repository

This repo contains connection documentation and client-side examples **only**. Do not commit Cloudflare Worker source, environment variables, GitHub tokens, OAuth codes, bearer tokens, D1 database contents, CVs, applicant records, secrets, or logs containing personal data.

## How account access works

The live `/mcp` endpoint uses OAuth with per-client scopes, time-limited bearer tokens, PKCE S256, and user consent. The public `/mcp/public` endpoint is deliberately limited to read-only job discovery. Applicants can revoke connected assistants at [Fieldwork connections](https://fieldwork-remote-desk.builtinlagos.workers.dev/oauth/connections).

**Account keys belong only on a Fieldwork-hosted authorization form. Never paste account keys into AI chats, public issues, or pull requests.**

MCP integration clients are third parties. Check the registered return URL and scope list before approving them.

## Production limits

No MCP tool submits applications to employers. Application statuses are self-reported. Alert preferences do not imply email delivery; the sending service must be configured separately.

A public repository does not mean the production backend has been independently audited. OAuth and private actions should undergo a complete external integration and security review before broad deployment.

## Reporting security problems

Please **do not create public GitHub issues containing exploits, credentials or personal data**. Contact the Fieldwork operator through a privately confirmed support channel; a dedicated security contact is not yet configured. For general integration problems that do not involve vulnerabilities or personal information, use GitHub Issues.

See the [live privacy information](https://fieldwork-remote-desk.builtinlagos.workers.dev/privacy). The live privacy and terms pages may still require final legal review.
