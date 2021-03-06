import React, {useEffect, useLayoutEffect, useRef} from "react";
import {mount} from "marketing/MarketingApp";
import {useHistory} from "react-router-dom";

export default () => {
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
            onNavigate: ({pathname: nextPathname}) => {
                console.log("marketing navigated");
                if (currentHistory.location.pathname !== nextPathname)
                    currentHistory.push(nextPathname);
            },
        });

        return currentHistory.listen(options.onParentNavigate);
    }, []);

    return <div ref={ref}></div>;
};
