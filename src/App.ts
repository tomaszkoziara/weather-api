import * as Koa from 'koa';
import * as logger from 'koa-logger';
import { injectable, inject } from 'inversify';
import { Router } from './Router';
import { TYPES } from './types';

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
        // Error middleware
        this.koa.use(async (ctx, next) => {
            try {
                await next();
            } catch (err) {
                ctx.status = err.status || 500;
                ctx.body = err.message;
                ctx.app.emit('error', err, ctx);
            }
        });
        this.koa.use(logger());

        const koaRouter = this.router.build();
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