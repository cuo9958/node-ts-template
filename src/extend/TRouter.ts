import Router from "koa-router";

export type ITMiddleware<StateT = any, CustomT = {}> = Router.IMiddleware<StateT, CustomT & IExtend>;

interface IExtend {
    Success(data: any): object;
    Error(msg: string, code?: number): object;
}

export default class TRouter<StateT = any, CustomT = {}> extends Router {
    tget(path: string | RegExp | (string | RegExp)[], ...middleware: Array<ITMiddleware<StateT, CustomT>>) {
        return this.get(path, ...middleware);
    }
}
