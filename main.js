const express = require('express');
const fs = require('fs');
const path = require('path'); // Required for path management

const app = express();
const PORT = 3000;

let objects;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Read the JSON file and initialize the server only after the data is loaded
fs.readFile("./objects.json", "utf8", (error, data) => {
    if (error) {
        console.log("Error reading the JSON file:", error);
        return;
    }
    
    try {
        objects = JSON.parse(data);
        
        // Set EJS as the templating engine
        app.set('view engine', 'ejs');

        // Define a route to render the template
        app.get('/', (req, res) => {
            res.render('main', { physicalObjects: objects['physicalObjects'] });
        });

        // Start the server only after data is successfully loaded
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (parseError) {
        console.log("Error parsing the JSON data:", parseError);
    }
});
