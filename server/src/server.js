import express from "express";
import cors from "cors";
import { search } from "./query.js";
import { get_cache, save_cache } from "./cache.js";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/prompt", async (req, res) => {
    const { query } = req.body;

    const cache_res = get_cache(query);

    if (cache_res) {
        console.log("Retrieved from cache")
        return res.send({
            "response": cache_res
        });
    }

    const llm_response = await search(query);

    // Cache the response if valid
    if (llm_response) {
        save_cache(query, llm_response);
    }

    return res.send({
        "response": llm_response
    });
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
})