import React, { Component } from 'react';

class App extends Component {
  state = {
    data: 'Hello darkness, my old friend.',
  }

  render() {
    const { data } = this.state;
    return (
      <div data-test="component-app">
        {data}
      </div>
    );
  }
}

export default App;
