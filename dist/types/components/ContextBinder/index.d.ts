import { Context, NamedExoticComponent, FC } from "react";
declare const ContextBinder: <T>(context: Context<T>, selector: Record<string, (c: T) => any>, children: FC<{
    context: T;
}>) => NamedExoticComponent<any>;
export default ContextBinder;
