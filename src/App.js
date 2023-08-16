
import './App.css';
import Spin from './spinWheel';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Draw a Lots</h1>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          {/* Edit <code>src/App.js</code> and save to reload. */}
        </p>
        <Spin></Spin>
      </header>
    </div>
  );
}

export default App;
