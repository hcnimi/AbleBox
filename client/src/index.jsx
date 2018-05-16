import React from 'react';
import ReactDom from 'react-dom';
import Header from './components/Header.jsx';
import SignIn from './components/SignIn.jsx';
import SignUp from './components/SignUp.jsx';
import AllFiles from './components/AllFiles.jsx';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  withRouter,
} from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        <div className="header">
          <Header/>
        </div>
         <Router>
          <div className="content">
            <Route exact={true} path="/" component={SignIn}/>
            <Route path="/signup" component={SignUp}/>
            <Route path="/home" component={AllFiles}/>
            <Route path="/login" componenet={SignIn}/>
          </div>
        </Router>
      </div>
    )
  }
}

const AppWithRouter = withRouter(App);
ReactDOM.render(<App pathname={location.pathname}/>, document.getElementById('app'));