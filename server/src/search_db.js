import { Ollama } from 'ollama'
import { ChromaClient } from "chromadb";
import config from "./config.json" assert { type: "json" };

const collectionName = "aipi-bot";
const llm = "phi";

const ollama = new Ollama({ host: 'http://108.59.83.119:11434' })

export const search = async (query) => {
    const chroma = new ChromaClient({ path: config.chromadb.host });
    const collection = await chroma.getCollection({ name: collectionName, metadata: { "hnsw:space": "cosine" } });

    const queryembed = (await ollama.embeddings({ model: config.embModel, prompt: query })).embedding;

    const relevantDocs = (await collection.query({ queryEmbeddings: [queryembed], nResults: 2 })).documents[0].join("\n\n")
    const modelQuery = `
        You are a helpful and respectful assistant bot.
        If you don't know the response, just say that you can't answer the question.
        Keep your response concise.
        ${query}
        Context: ${relevantDocs}`

    console.log('Model Query:', modelQuery);
    const stream = await ollama.generate({ model: llm, prompt: modelQuery,stream: true });

    var response = ""
    for await (const chunk of stream) {
        response += chunk.response
    }

    return response;
}