import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import { Provider as FlowContextProvider } from './context/FlowContext.js';

import EmeraldID from './components/EmeraldID.js';
import Reset from './components/Reset.js';

function App() {
  return (
    <div>
      <FlowContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/resetEmeraldID" element={<Reset />} />
            <Route path="/emeraldID" element={<EmeraldID />} />
          </Routes>
        </BrowserRouter>
      </FlowContextProvider>
    </div>
  );
}

export default App;