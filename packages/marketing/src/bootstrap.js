import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

// Mount function to startup app
const mount = (el) => {
    ReactDOM.render(
        <App />,
        el
    );
};

// If in dev or isolation, mount instantly
if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_marketing-dev-root');
    if (devRoot) {
        mount(devRoot);
    }
}

// Otherwise, export mount function for container
export { mount };