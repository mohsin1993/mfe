import React from "react";
import ReactDOM from "react-dom";
import {createMemoryHistory, createBrowserHistory} from "history";
import App from "./App";

// Mount function to start up the app
const mount = (el, options) => {
    const history =
        options.defaultHistory ||
        createMemoryHistory({initialEntries: [options.initialPath]});
    ReactDOM.render(<App history={history} onSignIn={options.onSignIn} />, el);

    if (options?.onNavigate) history.listen(options.onNavigate);

    return {
        onParentNavigate: ({pathname: nextPathname}) => {
            console.log("auth navigated");
            if (history.location.pathname !== nextPathname)
                history.push(nextPathname);
        },
    };
};

// If we are in development and in isolation,
// call mount immediately
if (process.env.NODE_ENV === "development") {
    const devRoot = document.querySelector("#_auth-dev-root");

    if (devRoot) {
        mount(devRoot, {defaultHistory: createBrowserHistory()});
    }
}

// We are running through container
// and we should export the mount function
export {mount};
