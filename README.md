# Fieldwork MCP

**Remote jobs matched to your spoken languages, proficiency, country of residence, and skills — accessible from an AI assistant.**

[Open Fieldwork](https://fieldwork-remote-desk.builtinlagos.workers.dev/desk.html) · [Connection guide](https://fieldwork-remote-desk.builtinlagos.workers.dev/mcp/docs)

Fieldwork MCP is a live, remote Model Context Protocol (MCP) service hosted on Cloudflare Workers. **This repository contains public integration documentation and examples, not the production server source, credentials, private applicant data, or Cloudflare Worker deployment configuration.** GitHub is a discovery and documentation home; it is **not** required for the service to run.

## Connect

| Access | Endpoint | Authorization |
| --- | --- | --- |
| Applicant account tools | `https://fieldwork-remote-desk.builtinlagos.workers.dev/mcp` | OAuth |
| Public job discovery | `https://fieldwork-remote-desk.builtinlagos.workers.dev/mcp/public` | None |

Use the **full endpoint** to connect an account. Your AI assistant should discover OAuth metadata and direct you to Fieldwork's consent screen. Review requested scopes carefully. Never paste your Fieldwork account key into an AI chat: enter it **only on Fieldwork's own authorization page** when prompted.

For step-by-step client setup, see [Connecting clients](docs/CONNECT.md). You can also [run Fieldwork's read-only OAuth verification](https://fieldwork-remote-desk.builtinlagos.workers.dev/mcp/verify) while signed in to your own Fieldwork account. This verifies the Fieldwork OAuth flow, but does not replace a separate test with your AI assistant.

## What it does

- **Language-first discovery:** `search_jobs` with country, multiple spoken languages and proficiency, roles, skills, and language-confirmation filtering.
- **Job details and transparency:** `get_job`, `list_sources`, `get_workflow`.
- **Authorized account tools:** applicant profile, matching, CV version metadata and selection, application tracking, Career Studio drafts, saved searches, alert preferences, and data export.
- **Per-client OAuth permissions:** read and write scopes, with an explicit consent page and ability to revoke connections.

Example prompt:

> Find remote AI evaluator jobs for an applicant living in Brazil, with Portuguese C2 and English A2. Prefer confirmed language matches and explain eligibility limits.

## Important limitations

**MCP does not submit applications to employers.** Tracking statuses are self-reported. Job postings, assessment requirements, and eligibility should be verified at the original employer's website.

**Email alert delivery is not active** until Resend, the sending domain, and appropriate email verification are configured. MCP can save **alert preferences** today.

The Cloudflare Worker is under active development. While OAuth metadata, authorization barriers, consent denial, and public tools have been tested, **a complete third-party OAuth connection and private-tool end-to-end run has not yet been independently certified**. Test against a disposable account before relying on write operations.

## Documentation

- [Connect ChatGPT/Claude and other clients](docs/CONNECT.md)
- [Public and private tools](docs/TOOLS.md)
- [Security and account privacy](SECURITY.md)
- [Example public search request (Node.js)](examples/public-search.mjs)
- [Example MCP client config](examples/mcp-client-config.json)

## Service status

The live Worker and database are managed separately from this repo. Publishing documentation here does not create new GitHub deployments or move private data to GitHub.

If a custom domain is registered later, the canonical MCP URL can be updated in this README.

© Fieldwork. Public documentation made available for review; see [LICENSE-NOTICE.md](LICENSE-NOTICE.md) for reuse terms.
