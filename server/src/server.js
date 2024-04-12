import express from "express";
import cors from "cors";
import { search } from "./query.js";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/prompt", async (req, res) => {
    const { query } = req.body;
    console.log('Request body:', req.body);

    const llm_response = await search(query);

    console.log('Response:', llm_response);

    return res.send({
        "response": llm_response
    });
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
})