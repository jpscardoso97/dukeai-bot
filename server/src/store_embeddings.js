import { Ollama } from 'ollama'
import { ChromaClient } from "chromadb";

import config from "./config.json" assert { type: "json" };
import doc from "./docs/qna.json" assert { type: "json" };

const chroma = new ChromaClient({ path: config.chromadb.host });
const ollama = new Ollama({ host: config.ollamaHost })
const collectionName = "aipi-bot";

await chroma.deleteCollection({ name: collectionName });

// Check if collection needs to be created
var collections = await chroma.listCollections();
if (!collections.includes(collectionName)) {
  const collection = await chroma.getOrCreateCollection({ name: collectionName, metadata: { "hnsw:space": "cosine" } });

  // Read Q&A entries
  var i = 0;
  for await (const entry of doc.entries) {
    const embed = (await ollama.embeddings({ model: config.embModel, prompt: entry.question })).embedding;
    await collection.add({ ids: "id"+[i], embeddings: [embed], metadatas: { source: "qna.jsonl" }, documents: [entry.answer] });
    console.log("Question:", entry.question, "added to collection");
    i++;
  }
}
