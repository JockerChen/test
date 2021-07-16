/*
 * @Author: [JokerChen]
 * @Date: 2021-07-10 14:17:44
 * @LastEditors: [JokerChen]
 * @LastEditTime: 2021-07-10 14:43:45
 * @Description: 
 * 
 */
import moduleName from ''
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router';

class App extends React.Component {
  render () {
    return (
      <div>
        <div className="ui secondary pointing menu">
          {/**link*/}
          <Link to="/" className="item">首页</Link>
          <Link to="/tv" className="item">电视</Link>
        </div>
        {this.props.children}
      </div>
    );
  }
}
class TV extends React.Component {
  render () {
    return (
      <div >
        <div className="ui info message">
          电视节目列表
        </div>
        {/**link*/}
        {this.props.children}
      </div>
    )
  }
}


class Show extends React.Component {
  render () {
    return (
      <h3>
        节目
      </h3>
    )
  }
}

ReactDOM.render((
  <Router>
    <Route path="/" component={App}>
      <Route path="tv" component={TV}>
        <Route path="shows/:id" component={Show}></Route>
      </Route>
    </Route>
  </Router>
),document.getElementById('app'))