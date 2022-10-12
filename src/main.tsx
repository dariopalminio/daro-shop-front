import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./app/App";
import "./app/ui/style/normalize.css";
import "./app/ui/style/global.css";
import './infra/i18n/i18n-index';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <App />
)

/**
For production remove the <React.StrictMode>
React's StrictMode renders components several times (intentionally) to help you detect rendering side effects.
It only happens during development.
 */