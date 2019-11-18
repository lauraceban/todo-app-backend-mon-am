const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());

// Allows Express to parse JSON data that is sent on the body of any requests
app.use(bodyParser.json());

app.get("/tasks", function(request, response) {
  response.status(200).send({
    tasks: [
      { id: 1, text: "Clean the cat", completed: false, date: "2019-10-13" },
      { id: 2, text: "Wash the car", completed: true, date: "2019-10-14" },
      { id: 3, text: "Make dinner", completed: false, date: "2019-10-17" }
    ]
  });
});

app.delete("/tasks/:taskId", function(request, response) {
  // Delete the task
  const id = request.params.taskId;
  response.status(200).send("Received a request to delete task ID " + id);
});

app.post("/tasks", function(request, response) {
  // Create a new task
  const task = request.body;
  response.status(201).send("Created a new task with text: " + task.text);
});

module.exports.tasks = serverless(app);
