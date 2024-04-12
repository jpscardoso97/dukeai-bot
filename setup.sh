docker compose up -d
docker exec jocardoso55-ollama-phi-1 ollama pull mxbai-embed-large
docker exec jocardoso55-ollama-phi-1 ollama run phi
docker run -d --rm --name chromadb -p 8000:8000 -v ./chroma:/chroma/chroma -e IS_PERSISTENT=TRUE -e ANONYMIZED_TELEMETRY=TRUE chromadb/chroma:latest