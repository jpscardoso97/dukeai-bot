docker compose up -d
docker exec dukeai-bot-ollama-phi-1 ollama pull mxbai-embed-large
docker exec dukeai-bot-ollama-phi-1 ollama run phi
docker exec dukeai-bot-server-1 node store_embeddings.js