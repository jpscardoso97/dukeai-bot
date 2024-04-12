import { Ollama } from 'ollama'
import { ChromaClient } from "chromadb";

import config from "./config.json" assert { type: "json" };


import fs from "fs";
import path from "path";

const collectionName = "aipi-bot";


const chroma = new ChromaClient({ path: config.chromadb.host });
const ollama = new Ollama({ host: config.ollamaHost })

await chroma.deleteCollection({ name: collectionName });

// Check if collection needs to be created
var collections = await chroma.listCollections();
if (!collections.includes(collectionName)) {
  const collection = await chroma.getOrCreateCollection({ name: collectionName, metadata: { "hnsw:space": "cosine" } });

  const docsFolderPath = "./docs";
  const fileNames = fs.readdirSync(docsFolderPath);
  const filePaths = fileNames.map(fileName => path.join(docsFolderPath, fileName));

  for await (const doc of filePaths) {
    const text = fs.readFileSync(doc, "utf-8");
    // sentencesPerChunk: 7, overlap: 2)
    const chunks = create_chunks(text);

    var index = 0;
    for await (let chunk of chunks) {
      const embed = (await ollama.embeddings({ model: config.embModel, prompt: chunk })).embedding;
      //console.log("Adding document to collection:", { ids: [doc + index], embeddings: [embed], metadatas: { source: doc }, documents: [chunk] });
      await collection.add({ ids: [doc + index], embeddings: [embed], metadatas: { source: doc }, documents: [chunk] });
      console.log("Chunk:", doc + index, "added to collection");
      index++;
    }
  }
}

function create_chunks(doc) {
  // Split the document into words
  const words = doc.trim().split(/\s+/);

  const chunks = [];
  let currentChunk = [];

  for (let i = 0; i < words.length; i++) {
    currentChunk.push(words[i]);

    if (currentChunk.length === 100 || i === words.length - 1) {
      chunks.push(currentChunk.join(' '));
      currentChunk = currentChunk.slice(-25);
    }
  }

  return chunks;
}