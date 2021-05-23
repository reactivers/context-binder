import { Context, NamedExoticComponent, FC } from "react";
declare const ContextBinder: <T, P>(context: Context<T>, selector: Record<string, (c: T) => P>, children: FC<{
    context: T;
}>) => NamedExoticComponent<any>;
export default ContextBinder;
