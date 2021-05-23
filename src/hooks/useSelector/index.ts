import { useCallback, useContext, useEffect, useMemo, useState } from "react"

const useSelector = (context, selector) => {
    const value = useContext(context);
    const getNewState = useCallback((old = {}) => {
        let dirty = false;
        const newState = { ...old };
        Object.keys(selector).forEach(s => {
            const newValue = selector[s](value);
            if (old[s] !== newValue) {
                newState[s] = newValue;
                dirty = true
            }
        })

        if (dirty)
            return newState
        return old;
    }, [value, selector])
    const [state, setState] = useState(getNewState());

    useEffect(() => {
        setState(old => {
            return getNewState(old)
        })
    }, [getNewState])


    return useMemo(() => state, [state])
}

export default useSelector;