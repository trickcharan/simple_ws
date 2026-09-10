# Virtual Agent API

Simple Node.js service for Render with one public endpoint:

```text
GET /v1/listVirtualAgents
```

## WebSocket endpoint

Connect to:

```text
wss://your-service.onrender.com/ws
```

Send one JSON message:

```json
{
  "customer_org_id": "your-org-id"
}
```

The server responds once and then closes the WebSocket:

```json
{
  "virtual_agents": [
    { "id": "1", "name": "Agent One" },
    { "id": "2", "name": "Agent Two" }
  ]
}
```

## Configure virtual agents

Set `VIRTUAL_AGENTS_JSON` in Render to a JSON array, for example:

```json
[
  {
    "virtual_agent_id": "1",
    "virtual_agent_name": "Agent One",
    "is_default": true
  },
  {
    "virtual_agent_id": "2",
    "virtual_agent_name": "Agent Two",
    "is_default": false
  }
]
```

The endpoint returns:

```json
[
  {
    "virtual_agent_id": "agent-1",
    "virtual_agent_name": "Support Agent",
    "is_default": true
  }
]
```

## Run locally

```bash
export VIRTUAL_AGENTS_JSON='[{"virtual_agent_id":"agent-1","virtual_agent_name":"Support Agent","is_default":true}]'
npm start
```

Render can deploy this repository directly using the included `render.yaml`.
