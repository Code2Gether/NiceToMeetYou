import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './css/theme';
import { GlobalStyle } from './css/base';

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Router>
                <Route component={App} />
            </Router>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
