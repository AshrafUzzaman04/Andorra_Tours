import React from 'react';
import ReactDOM from "react-dom";
import App from "./App";

// Soft UI Context Provider
import { SoftUIControllerProvider } from "context";

import './i18n';

ReactDOM.render(
    <React.StrictMode>
        <SoftUIControllerProvider>
            <App />
        </SoftUIControllerProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
