# MICAS Internal Portal

Internal department portal with self-hosted web search.

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

## Check search

```bash
curl "http://localhost/api/search?q=MICAS%20Networks"
```

The existing `/analyze` and `/gemini-answer` backend endpoints remain available but are not used by the search page.
