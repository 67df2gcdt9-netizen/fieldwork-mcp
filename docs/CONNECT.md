# Connect to Fieldwork MCP

## Remote endpoints

- **Account MCP (OAuth):** `https://fieldwork-remote-desk.builtinlagos.workers.dev/mcp`
- **Public MCP:** `https://fieldwork-remote-desk.builtinlagos.workers.dev/mcp/public`
- [Live Fieldwork guide](https://fieldwork-remote-desk.builtinlagos.workers.dev/mcp/docs)

**You do not need to clone this GitHub repository or deploy any code to use Fieldwork MCP.** GitHub hosts this documentation. Cloudflare hosts the server.

## Claude and other compatible MCP clients

1. Open your client's custom connector / MCP integrations settings.
2. Create a connector named **Fieldwork**.
3. Paste the account endpoint above. Select **OAuth** where prompted.
4. If the client supports dynamic registration, allow it to register using the authorization server metadata.
5. On the Fieldwork consent screen, check the **client name, return URL, and permission scopes**.
6. Approve only the scopes you need. If you are not signed in, enter your account key only in the Fieldwork authorization form.

Then ask your assistant:

> Use Fieldwork to show the spoken languages and proficiency saved in my profile.

If your assistant sees only four tools, you may be using the public endpoint or have not completed account authorization.

Some clients support only a subset of MCP and OAuth. Availability depends on your client and plan; consult that provider's current documentation.

## CLI-style setup examples

Clients that accept remote Streamable HTTP MCP URLs can generally use:

```text
MCP URL: https://fieldwork-remote-desk.builtinlagos.workers.dev/mcp
Transport: HTTP / Streamable HTTP
Authorization: OAuth 2.0 with PKCE (S256)
```

Client-specific commands may change; use the current MCP integration documentation for your client. If your client cannot complete OAuth, you may still use the public read-only URL.

## OAuth details for developers

- Protected-resource metadata: `/.well-known/oauth-protected-resource/mcp`
- Authorization-server metadata: `/.well-known/oauth-authorization-server`
- Dynamic client registration: `POST /oauth/register` (JSON)
- Consent page: `GET /oauth/authorize`
- Token exchange and refresh: `POST /oauth/token`
- Token revocation: `POST /oauth/revoke`
- Manage connections in browser: `GET /oauth/connections`
- PKCE: **S256 required**.
- Bearer tokens are required for `/mcp`; the `/mcp/public` endpoint is read-only and anonymous.
- OAuth clients should request only the permissions they need.

**Do not interpret `GET /oauth/register` returning 404 as missing registration support:** registration is a POST endpoint.

## Verify OAuth safely

Sign into Fieldwork and open the [OAuth verification page](https://fieldwork-remote-desk.builtinlagos.workers.dev/mcp/verify). Click **Start secure verification**, review read-only permissions, and approve on Fieldwork's consent page. The verifier attempts code exchange, private profile/CV reads, refresh-token rotation and revocation without uploading documents or contacting employers.

This in-browser verifier tests Fieldwork itself; it does **not** independently prove an external Claude or ChatGPT connection. An additional test in that client is still required.

## Disconnect

After signing into Fieldwork, visit [Manage AI assistants](https://fieldwork-remote-desk.builtinlagos.workers.dev/oauth/connections) and revoke a client. Use a trusted browser and your own account session.

If your account key is compromised, rotate it from the Fieldwork profile. This revokes OAuth tokens linked to the account.

## Troubleshooting

| Symptom | Action |
| --- | --- |
| HTTP 401 at `/mcp` | Expected without a bearer token; complete OAuth in your client |
| Only four tools | You are likely using `/mcp/public`, or your client is not yet authorized |
| Consent page says invalid request | Check client ID, registered redirect URI, OAuth state, and PKCE challenge |
| Job not found | Jobs may disappear or become stale; search again and verify employer page |
| Alert preference saved but no email | Email sending is not active yet; this is expected |
| Can't approve OAuth | Sign into Fieldwork and retry; do not share your account key in chat |

[Live setup guide](https://fieldwork-remote-desk.builtinlagos.workers.dev/mcp/docs)
