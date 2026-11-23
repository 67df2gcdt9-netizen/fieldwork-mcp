/**
 * Fieldwork public MCP example. Node.js 20+ (native fetch).
 * No API key, account key, or OAuth token required for read-only discovery.
 * 
 * Run: node examples/public-search.mjs
 */
const url = "https://fieldwork-remote-desk.builtinlagos.workers.dev/mcp/public";
let nextId = 0;

async function rpc(method, params = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream",
    },
    body: JSON.stringify({ jsonrpc: "2.0", id: ++nextId, method, params }),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${await response.text()}`);
  const message = await response.json();
  if (message.error) throw new Error(message.error.message);
  return message.result;
}

const init = await rpc("initialize", {
  protocolVersion: "2025-06-18",
  capabilities: {},
  clientInfo: { name: "fieldwork-example", version: "0.1.0" },
});
console.log(`Connected to ${init.serverInfo.name}`);

const tools = await rpc("tools/list");
console.log("Tools:", tools.tools.map((tool) => tool.name).join(", "));

const search = await rpc("tools/call", {
  name: "search_jobs",
  arguments: {
    country: "BR",
    spoken_languages: "Portuguese C2, English A2",
    roles: "AI Trainer, AI Evaluator",
    include_unconfirmed_language: true,
    limit: 5,
  },
});
if (search.isError) throw new Error(search.content?.[0]?.text || "Search failed");
const results = search.structuredContent ?? JSON.parse(search.content[0].text);
console.log("Matches:", results.count);
for (const job of results.jobs ?? []) {
  console.log(`- ${job.title} @ ${job.company} — ${job.url}`);
  console.log(`  Language: ${job.matching?.languageStatus || "not evaluated"}`);
}
console.log("Always verify openings and eligibility with the original employer.");
