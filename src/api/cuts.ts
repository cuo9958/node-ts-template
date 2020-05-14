import Router from "../extend/TRouter";

const router = new Router();

router.tget("/", function (ctx, next) {
    ctx.body = ctx.Success("成功");
});

export default router.routes();
