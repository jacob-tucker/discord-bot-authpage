import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import { Provider as FlowContextProvider } from './context/FlowContext.js';

import Mainnet from './components/Mainnet.js';
import Testnet from './components/Testnet.js';
import EmeraldID from './components/EmeraldID.js';
import Test from './components/Test.js';
import SuccessContainer from './containers/SuccessContainer.js';
import FailContainer from './containers/FailContainer.js';
import InProcess from './containers/InProcessContainer';

function App() {
  return (
    <div>
      <FlowContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SuccessContainer />} />
            <Route path="/emeraldID" element={<EmeraldID />} />
            <Route path="/mainnet" element={<Mainnet />} />
            <Route path="/testnet" element={<Testnet />} />
          </Routes>
        </BrowserRouter>
      </FlowContextProvider>
    </div>
  );
}

export default App;