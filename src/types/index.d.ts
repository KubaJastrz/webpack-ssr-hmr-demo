import { Response } from 'express';
import { Stats } from 'webpack';
import MemoryFs from 'memory-fs';

export interface ResponseWithWebpack extends Response {
    // injected by webpack middleware
    locals: {
        fs: MemoryFs;
        webpackStats: Stats;
    };
}

export interface MiddlewareRenderer extends Record<string, any> {
    clientStats: Stats;
    serverStats: Stats;
}
