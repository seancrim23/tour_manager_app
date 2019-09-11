import path from 'path';
import express from 'express';

const app = express(),
            DIST_DIR = __dirname,
            HTML_FILE = path.join(DIST_DIR, 'index.html');

app.use(express.static(DIST_DIR));

app.get('*', (req, res) => {
    res.sendFile(HTML_FILE);
});

const PORT = process.env.LOCAL_PORT || 3030;
app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}...`);
    console.log('Press Ctrl+C to quit.');
});