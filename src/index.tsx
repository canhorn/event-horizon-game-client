import * as React from 'react';
import { render } from 'react-dom';
import GameView from './views/GameView';

import './styles.css';
import { getResourceBundle } from './core/i18n/I18nServices';

function App() {
    getResourceBundle('');
    return (
        <div className="app">
            <h1>Game Engine Demo</h1>
            <GameView />
        </div>
    );
}

const rootElement = document.getElementById('root');
render(<App />, rootElement);
