# MICAS Internal Portal

Internal department portal with self-hosted web search and permission-aware Microsoft 365 document search.

## Stack

- Frontend: Next.js and TypeScript
- Backend: FastAPI search proxy
- Search: SearXNG JSON Search API
- Runtime: Docker Compose

## Setup

Create an environment file and replace the SearXNG secret with a long random value:

```bash
cp .env.example .env
```

Start the services:

```bash
docker compose -f docker-compose.vm.yml up -d --build
```

- Portal: http://localhost/
- Backend health: http://localhost:8010/health

## Search flow

1. The frontend sends `GET /api/search?q=...`.
2. Next.js proxies the request to FastAPI.
3. FastAPI queries the private SearXNG container with `format=json`.
4. The portal renders the returned titles, links, descriptions, and source engines.

SearXNG is available only to the other containers and is not published directly on a host port.

## Microsoft 365 document search

Give the portal an internal HTTPS address (for example, `https://portal.micasnetworks.com`). Microsoft Entra does not accept a plain-HTTP production redirect URI except on `localhost`.

Register a single-tenant **Single-page application** in Microsoft Entra ID, then add the portal's exact HTTPS origin as a Single-page application redirect URI. Add these delegated Microsoft Graph permissions:

- `User.Read`
- `Files.Read.All`
- `Sites.Read.All`

Set the registration's Application (client) ID as `MICROSOFT_CLIENT_ID` in `.env` and rebuild the frontend. Search requests use the signed-in employee's delegated token, so Microsoft Graph returns only SharePoint and OneDrive items that employee is permitted to access. The portal uses Authorization Code Flow with PKCE; do not create or add a client secret.

## Check search

```bash
curl "http://localhost/api/search?q=MICAS%20Networks"
```

The existing `/analyze` and `/gemini-answer` backend endpoints remain available but are not used by the search page.

## Privacy-conscious analytics

The portal stores daily aggregate counts for department link usage, search failures, and portal availability. `/analytics/summary` also checks whether each configured department destination is reachable. It does not store employee identities, IP addresses, search queries, document names, or browser fingerprints.
