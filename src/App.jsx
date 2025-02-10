import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FixedComponent from './components/FixedComponent';
import TrainingContainer from './components/TrainingContainer';
import NewRequestContainer from './components/NewRequestContainer';
import InitiateTrainingContainer from './components/InitiateTrainingContainer';
import SpocContainer from './components/SpocContainer';

function App() {
  const obj = {
    // backgroundColor: "white",
    color: "black",
  };

  return (
    <>
      <div style={obj} className='App'>
        <Router>
          <FixedComponent>
            <Routes>
              <Route path="/" element={<TrainingContainer />} />
              <Route path="/new-request" element={<NewRequestContainer />} />
              <Route path="/initiate-training" element={<InitiateTrainingContainer />} />
               {/* Added route for InitiateTrainingContainer */}
               <Route path='/spoc-approval' element={<SpocContainer />} />
            </Routes>
          </FixedComponent>
        </Router>
      </div>
    </>
  );
}

export default App;