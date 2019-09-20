import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../../webpack.dev.config';
import { connectDb } from '../js/utils/db/mongoDbConnector';
import 'babel-polyfill';
import userRouter from '../js/routes/userRouter';

const app = express(),
            DIST_DIR = __dirname,
            HTML_FILE = path.join(DIST_DIR, 'index.html'),
            compiler = webpack(config);

app.use(express.json());
app.use(userRouter);

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

app.get('*', (req, res, next) => {
    compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
        if(err){
            return next(err);
        }
        res.set('content-type', 'text/html');
        res.send(result);
        res.end();
    });
});

const PORT = process.env.LOCAL_PORT || 3030;

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`App listening on port: ${PORT}...`);
        console.log('Press Ctrl+C to quit.');
    });
})
.catch(error => {
    console.log(`Error connecting to the database: ${error}`);
});

export default app;