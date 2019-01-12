import * as koaRouter from 'koa-router';
import { injectable } from 'inversify';

@injectable()
class Router {

    build() {
        const router = new koaRouter();

        // Just to check if service is up and running during development or in bigger context (heartbeat)
        router.get('/ping', (ctx, next) => {
            ctx.response.body = 'pong!';
        });

        return router;
    }

}

export { Router };