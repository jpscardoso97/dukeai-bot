import { Ollama } from 'ollama'
import { ChromaClient } from "chromadb";
import config from "./config.json" assert { type: "json" };

const collectionName = "aipi-bot";
const llm = "phi";

const ollama = new Ollama({ host: config.ollamaHost })

export const search = async (query) => {
    const chroma = new ChromaClient({ path: config.chromadb.host });
    const collection = await chroma.getCollection({ name: collectionName, metadata: { "hnsw:space": "cosine" } });

    const queryembed = (await ollama.embeddings({ model: config.embModel, prompt: query })).embedding;

    const relevantDocs = (await collection.query({ queryEmbeddings: [queryembed], nResults: 1})).documents[0].join("\n\n")
    const prompt = `Instruction: Answer question directly. If you don not know the answer to a question, please DO NOT SHARE FALSE INFORMATION. \n ${relevantDocs}\n\n Question: ${query} \n Answer (max. 3 sentences):`
    console.log('Prompt:\n', prompt);
    
    const response = await ollama.generate({ model: llm, prompt: prompt});
    var message = response.response
    console.log('Phi-2 response:\n', message);

    // Keep only first 2 sentences to avoid showing hallucination
    message = message.split(".").slice(0, 2).join(".");

    return message;
}