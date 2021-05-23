import { createElement, Context, memo, useMemo, NamedExoticComponent, FC } from "react";
import useSelector from "../../hooks/useSelector";

const ContextBinder: <T, P>(context: Context<T>, selector: Record<string, (c: T) => P>, children: FC<{ context: T }>) => NamedExoticComponent<any> = (context, selector, children) => memo(() => {
    const requestValue = useSelector(context, selector);
    return useMemo(() => createElement(children, { context: requestValue }), [requestValue, children])
})

export default ContextBinder;