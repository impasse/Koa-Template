const path = require('path');
const crypto = require('crypto');
const Koa = require('koa');
const convert = require('koa-convert');
const koaBetterBody = require('koa-better-body');
const koaCompress = require('koa-compress');
const koaConditionalGet = require('koa-conditional-get');
const koaError = require('koa-error');
const koaEtag = require('koa-etag');
const koaLogger = require('koa-logger');
const koaResponseTime = require('koa-response-time');
const koaSession = require('koa-session');
const koaStatic = require('koa-static');
const koaViews = require('koa-views');

const { keys } = require('./config');

const app = new Koa();

app.keys = keys;

app.use(koaError({
    engine: 'pug',
    template: path.join(__dirname, 'views', 'error.pug')
}));
app.use(koaResponseTime());
app.use(koaLogger());
app.use(koaCompress());
app.use(koaConditionalGet());
app.use(koaEtag());
app.use(koaStatic(path.join(__dirname, 'public'), {
    maxage: 1e3 * 3600 * 24 * 30
}));
app.use(koaViews(path.join(__dirname, 'views'), {
    extension: 'pug'
}));
app.use(koaSession(app));
app.use(convert(koaBetterBody()));

app.use(...require('./routes'));


module.exports = app;