import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import List from './components/List'
import Search from './components/Search'
import Dashboard from './components/Dashboard'


function App() {
  return (
    <BrowserRouter>
      <div className="container pt-3">
        <Switch>
          <Route path='/' exact component={Dashboard} />
          <Route path='/list' component={List} />
          <Route path='/search/:id' component={Search} />
          <Route path='*' render={() => (<center><h1>PAGE NOT FOUND</h1></center>)} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App