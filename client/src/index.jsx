import React from react;
import ReactDom from react-dom;

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));