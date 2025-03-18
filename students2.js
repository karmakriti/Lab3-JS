// Import the Express module and file system module
import express from 'express';
import { readFile } from 'fs';

const app = express();

//Port number
const PORT = 3000;

//  GET route to display JSON data
app.get('/students', (req, res) => {
  // Read the JSON file
    readFile('./data/students.json', 'utf8', (err, data) => {
        // If there is an error, log the error
        if (err) {
            console.log(err);
            return;
        }
    // Send the JSON data as a response
    res.json(JSON.parse(data));
    });
});

// Start the server on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});