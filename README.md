# Virtual Agent API

Simple Node.js service for Render with one public endpoint:

```text
GET /v1/listVirtualAgents
```

## Configure virtual agents

Set `VIRTUAL_AGENTS_JSON` in Render to a JSON array, for example:

```json
[
  {
    "virtual_agent_id": "agent-1",
    "virtual_agent_name": "Support Agent",
    "is_default": true
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
