const express = require('express')
const app = express()
const port = 5501
const summarizeText = require('./summarize.js')

// Parse JSON bodies (as sent by API clients)
app.use(express.json())

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});


app.use(express.static('src')) // Serve static files from the 'public' directory

app.post('/summarize', (req, res) => {
  const text = req.body.text_to_summarize

  summarizeText(text) // Call the summarizeText function
    .then((response) => {
      res.send(response) // Send the summary text as a response
    })
    .catch((error) => {
      console.log(error.message)
    })
})

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/src`)
})
