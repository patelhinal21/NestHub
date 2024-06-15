// Importing app to run on server
import app from './app.js';

// Defining port
const port = 8080;

// Initializing server on port and calling the port dynamically
app.listen(port, () => {
    console.log(`Server is listening on port ${port}!`);
}); 