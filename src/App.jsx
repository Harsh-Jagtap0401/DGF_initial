import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FixedComponent from './components/FixedComponent';
import TrainingContainer from './components/TrainingContainer';
import NewRequestContainer from './components/NewRequestContainer';

function App() {
  const obj = {
    // backgroundColor: "white",
    color: "black",
    

  };

  return (
    <div style={obj} className='App'>
      <Router>
        <FixedComponent>
          <Routes>
            <Route path="/" element={<TrainingContainer />} />
            <Route path="/new-request" element={<NewRequestContainer />} />
          </Routes>
        </FixedComponent>
      </Router>
    </div>
  );
}

export default App;