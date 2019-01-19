import * as Koa from 'koa';
import * as logger from 'koa-logger';
import { injectable, inject } from 'inversify';
import { Router } from './Router';
import { TYPES } from './types';
import { APIError } from './controller/APIError';

@injectable()
class App {

    private koa;
    private router: Router;

    constructor(
        @inject(TYPES.Router) router: Router
    ) {
        this.koa = new Koa();
        this.router = router;
    }

    run(port) {

        const koaRouter = this.router.build();

        // Error middleware
        this.koa.use(async (ctx, next) => {
            try {
                await next();
            } catch (err) {
                if (err instanceof APIError) {
                    ctx.status = err.status || 500;
                    ctx.body = err.message;
                    ctx.app.emit('error', err, ctx);
                } else {
                    ctx.status = 500;
                    ctx.body = 'Server error.';
                    ctx.app.emit('error', err, ctx);
                }
            }
        });
        this.koa.use(logger());
        this.koa.use(koaRouter.routes());
        this.koa.use(koaRouter.allowedMethods());

        // Error handling
        this.koa.on('error', (err, ctx) => {
            console.error(err);
        });

        this.koa.listen(port);
    }

}

export { App };