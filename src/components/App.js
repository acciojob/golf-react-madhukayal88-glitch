import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStarted: false,
      ballPosition: 0 // Track horizontal position in pixels
    };

    // Bind event handlers
    this.buttonClickHandler = this.buttonClickHandler.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    // Attach the keydown listener to the whole window
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    // Clean up the event listener to avoid memory leaks
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  buttonClickHandler() {
    // Start the game, which reveals the ball and hides the button
    this.setState({ gameStarted: true });
  }

  handleKeyDown(event) {
    // Only move the ball if the game has started and the right arrow key is pressed
    if (this.state.gameStarted && (event.key === 'ArrowRight' || event.keyCode === 39)) {
      this.setState((prevState) => ({
        ballPosition: prevState.ballPosition + 5
      }));
    }
  }

  renderChoice() {
    // Determines whether to show the start button or the golf ball
    if (!this.state.gameStarted) {
      return (
        <button className="start" onClick={this.buttonClickHandler}>
          Start Game
        </button>
      );
    }

    return (
      <div
        className="ball"
        style={{
          position: 'absolute',
          left: `${this.state.ballPosition}px`,
          // Simple visual styling for local clarity (can be customized or omitted)
          width: '20px',
          height: '20px',
          backgroundColor: 'black',
          borderRadius: '50%',
          top: '100px'
        }}
      />
    );
  }

  render() {
    return (
      <div id="main" style={{ position: 'relative', minHeight: '500px', padding: '20px' }}>
        <h2>Interactive Golf Game</h2>
        {this.renderChoice()}
      </div>
    );
  }
}

export default App;
