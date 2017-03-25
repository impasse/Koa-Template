const router = require('koa-router')();

router.get('/', async ctx => {
    await ctx.render('index');
});

router.all('/info', async ctx => {
    ctx.body = ctx.request.fields;
});

module.exports = [router.routes(), router.allowedMethods()];