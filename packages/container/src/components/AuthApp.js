import React, {useEffect, useLayoutEffect, useRef} from "react";
import {mount} from "auth/AuthApp";
import {useHistory} from "react-router-dom";

export default ({onSignIn}) => {
    const ref = useRef(null);
    const history = useHistory();
    const historyRef = useRef(history);

    useLayoutEffect(() => {
        historyRef.current = history;
    }, [history]);

    useEffect(() => {
        const currentHistory = historyRef.current;
        const options = mount(ref.current, {
            initialPath: currentHistory.location.pathname,
            onSignIn,
            onNavigate: ({pathname: nextPathname}) => {
                console.log("auth navigated");
                if (currentHistory.location.pathname !== nextPathname)
                    currentHistory.push(nextPathname);
            },
        });

        return currentHistory.listen(options.onParentNavigate);
    }, []);

    return <div ref={ref}></div>;
};
