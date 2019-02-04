import path from 'path';
import { Request, Response } from 'express';
import { Stats } from 'webpack';
import MemoryFs from 'memory-fs'; // only types

import Server from './server';

interface ResponseWithWebpack extends Response {
    // injected by webpack middleware
    locals: {
        fs: MemoryFs;
        webpackStats: Stats;
    };
}

export default function requestHandler(req: Request, res: ResponseWithWebpack) {
    const { fs, webpackStats } = res.locals;
    const outputPath = webpackStats.toJson().outputPath;

    const markup = Server.renderEntireTree();
    // console.log(markup);
    const htmlFile: Buffer = fs.readFileSync(
        path.resolve(outputPath, 'index.html')
    );
    const html = injectHtml(markup, htmlFile.toString());

    res.send(html);
}

function injectHtml(markup: string, htmlFile: string) {
    return htmlFile.replace('<div id="root">', `<div id="root">${markup}`);
}
