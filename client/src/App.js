import React from 'react';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import game from './routes/game';
import main from './routes/main';
import scores from './routes/scores';

import './App.css';

function App() {
  return (
    <main className="main full-height h-100 w-100 bg-dark">
      <BrowserRouter>
        
          <Route path="/" component={withRouter(main)} exact />
          <Route path="/game" component={withRouter(game)} />
          <Route path="/scores" component={withRouter(scores)} />
  
      </BrowserRouter>
    </main>
  );
}

export default App;
