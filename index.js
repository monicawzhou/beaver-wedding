const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;
const db = require("./queries");
const tasks = require("./queriesTasks");

const OpenAI = require("openai");
const YOUR_API_KEY = "";

// should have apiKey in an env file
const openai = new OpenAI({
  apiKey: YOUR_API_KEY,
});

app.use(cors());
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.json({ Welcome: "WOOHOO" });
});

//endpoints for guests table
app.get("/guests", db.getGuests);
app.post("/guests", db.createGuest);
app.put("/guests/:id", db.updateGuest);
app.delete("/guests/:id", db.deleteGuest);

//endpoints for tasks table
app.get("/tasks", tasks.getTasks);
app.post("/tasks", tasks.createTask);
app.put("/tasks/:id", tasks.updateTask);

// endpoint for ChatGPT

app.post("/chat", async (req, res) => {
  const { prompt } = req.body;

  const completion = await openai.completions.create({
    model: "gpt-3.5-turbo",
    prompt: prompt,
    max_tokens: 512,
    temperature: 0,
  });

  res.send(completion.choices[0].text);
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
