import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
// using memory hsitory within the sub apps is generic and not dependent on 
// a specific framework's router
import { createMemoryHistory, createBrowserHistory } from 'history';

// Mount function to startup app
const mount = (el, { onNavigate, onSignIn, defaultHistory, initialPath }) => {
    const history =  defaultHistory || createMemoryHistory({
        initialEntries: [initialPath]
    });
    if (onNavigate) {
        // on any navigation, calls any methods passed to it
        history.listen(onNavigate);
    }

    ReactDOM.render(
        <App onSignIn={onSignIn} history={history} />,
        el
    );

    return {
        onParentNavigate({ pathname: nextPathname }) {
            const { pathname } = history.location;
            if(pathname !== nextPathname) {
                history.push(nextPathname);
            }
        }
    }
};

// If in dev or isolation, mount instantly
if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_auth-dev-root');
    if (devRoot) {
        mount(devRoot, { defaultHistory: createBrowserHistory() });
    }
}

// Otherwise, export mount function for container
export { mount };