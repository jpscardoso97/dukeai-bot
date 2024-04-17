docker-compose up -d
docker exec dukeai-bot_ollama-phi_1 ollama pull mxbai-embed-large
docker exec dukeai-bot_ollama-phi_1 ollama run phi
docker exec dukeai-bot_server_1 node store_embeddings.js