import path from 'path';
import { RequestHandler } from 'express';

import ServerRenderer from './server';
import { ResponseWithWebpack } from './types';

const requestHandler: RequestHandler = (req, res: ResponseWithWebpack) => {
    const { fs, webpackStats } = res.locals;
    const { outputPath } = webpackStats.toJson();

    const markup = ServerRenderer.renderEntireTree();
    const htmlFile: Buffer = fs.readFileSync(
        path.resolve(outputPath, 'index.html')
    );
    const html = injectHtml(markup, htmlFile.toString());

    res.send(html);
};

function injectHtml(markup: string, htmlFile: string) {
    return htmlFile.replace('<div id="root">', `<div id="root">${markup}`);
}

export default requestHandler;
