import React from 'react'
import SearchBar from './Components/SearchBar'
import SearchResult from './Components/SearchResult'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandLordProfile from './Components/LandlordProfile';

// import './Style/App.css';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path = "/" component={SearchBar}/>
          <Route exact path = "/searchresults" render={(props) => <SearchResult {...props}/>}/>
          <Route exact path = "/landlordprofile" render={(props) => <LandLordProfile {...props}/>}/>
        </Switch>
      </Router>
    </div>

  )
}

export default App