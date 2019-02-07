import path from 'path';
import { Request, Response, RequestHandler } from 'express';
import { Stats } from 'webpack';

import ServerRenderer from './server';
import { MiddlewareRenderer } from './types';

export const requestHandler = (
    req: Request,
    res: Response,
    clientStats: Stats
) => {
    const { fs, webpackStats } = res.locals;
    const { outputPath } = webpackStats
        .toJson()
        .children.find((stat: any) => stat.name === 'client');

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

// used by webpack-hot-server-middleware as request handler
// important: in production use requestHandler found above with regular fs
export default function middlewareRenderer({
    clientStats,
    serverStats,
}: MiddlewareRenderer): RequestHandler {
    return (req, res) => requestHandler(req, res, clientStats);
}
