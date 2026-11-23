# Fieldwork MCP tools

The public MCP endpoint exposes four tools. The account endpoint adds scoped tools **after OAuth authorization**. A tool is visible only if its required scope was granted.

## Public read-only

| Tool | Description |
| --- | --- |
| `search_jobs` | Search indexed remote jobs by query, country, spoken languages, proficiency, roles and skills. |
| `get_job` | Read a listed job by exact URL; the server does not browse arbitrary URLs. |
| `list_sources` | Check indexed source counts and coverage caveats. |
| `get_workflow` | Get safe search, matching, application and review guidance. |

### `search_jobs` input example

```json
{
  "country": "BR",
  "spoken_languages": "Portuguese C2, English A2",
  "roles": "AI Trainer, AI Evaluator",
  "skills": "Quality assurance, data labeling",
  "include_unconfirmed_language": false,
  "limit": 10
}
```

When a listing's language requirement cannot be confirmed, Fieldwork labels it accordingly. This is **not** proof of employer eligibility. Country residence can affect availability.

## OAuth permissions

| Scope | Access |
| --- | --- |
| `jobs:read` | Public search |
| `profile:read` | Saved applicant profile and profile-derived matches |
| `profile:write` | Update selected profile fields |
| `cvs:read` | CV versions, metadata, and authorized file reads |
| `cvs:write` | Alternate CV uploads, removal, job-CV selection |
| `applications:read` | Saved and self-reported application records |
| `applications:write` | Save and update tracked applications |
| `documents:read` | Saved Career Studio drafts |
| `documents:write` | Save, update, and delete drafts |
| `alerts:read` | Saved searches and alert preferences |
| `alerts:write` | Modify saved searches and alert preferences |
| `offline_access` | Allows OAuth refresh tokens; not a separate data permission |

## OAuth-protected tools

| Category | Tools |
| --- | --- |
| Profile | `get_candidate_profile`, `save_candidate_profile`, `get_my_matches` |
| CV | `list_cvs`, `get_cv`, `upload_cv`, `delete_cv_version`, `select_application_cv` |
| Applications | `list_applications`, `get_application`, `save_application`, `update_application` |
| Career Studio | `list_documents`, `get_document`, `save_document`, `delete_document` |
| Searches | `list_saved_searches`, `save_search`, `delete_search` |
| Alerts | `list_job_alerts`, `create_job_alert`, `update_job_alert`, `delete_job_alert` |
| Export | `export_user_data` |

Write/delete requests may require `confirmed_by_user: true` or a specific consent flag. This safeguard does not replace the connecting assistant's obligation to ask for authorization.

### Boundaries

- **No employer submission tool is exposed.** A saved application marked `Applied by you` is an applicant-reported stage.
- **Email alerts do not send yet.** `create_job_alert` stores a preference with `emailSendingActive: false`; Resend is pending.
- **CV files are sensitive.** Do not call `get_cv` with inline file content unless the applicant requests it.
- **Not all private tools have passed complete third-party integration tests.** Validate against a synthetic account before production automation.
