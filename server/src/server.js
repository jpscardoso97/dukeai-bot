import express from "express";
import { search } from "./search_db.js";

const app = express();
app.use(express.json());

app.post("/prompt", async (req, res) => {
    const { query } = req.body;
    console.log('Request body:', req.body);

    const llm_response = await search(query);

    return res.send(llm_response);
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
})