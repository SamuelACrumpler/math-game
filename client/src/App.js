import React from 'react';
import { BrowserRouter, Route, Switch, withRouter, Redirect } from 'react-router-dom';
import game from './routes/game';
import main from './routes/main';
import scores from './routes/scores';

import './App.css';

function App() {
  return (
    <main className="main full-height h-100 w-100">
      <BrowserRouter>
        
          <Route path="/" component={withRouter(main)} exact />
          <Route path="/game" component={withRouter(game)} />
          <Route path="/scores" component={withRouter(scores)} />
          <Route render={() => <Redirect to={{pathname: "/"}} />} />

  
      </BrowserRouter>
    </main>
  );
}

export default App;
