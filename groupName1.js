//Import the express module
import express from 'express';
const app = express();
// Port number
const PORT = 3000;

// Root route to display group names
app.get('/', (req, res) => {
    res.send(`
        <h1> Group-18 Members </h1>
        <ul>
            <li> Kriti Kiran Karmacharya - 200561725 </li>
            <li> Jashan Sharma - 200575503</li>
            <li> Hediyeh Sedaghat - 200569820 </li>
        </ul>
    `);
}); 

//  Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
