import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import { Provider as FlowContextProvider } from './context/FlowContext.js';

import Mainnet from './components/Mainnet.js';
import Testnet from './components/Testnet.js';

function App() {
  return (
    <div>
      <FlowContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/mainnet" element={<Mainnet />} />
            <Route path="/testnet" element={<Testnet />} />
          </Routes>
        </BrowserRouter>
      </FlowContextProvider>
    </div>
  );
}

export default App;