import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import { Provider as FlowContextProvider } from './context/FlowContext.js';

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
            <Route path="/" element={<InProcess transactionStatus={0} txId={"a3cdb512d82eaa44ee5d30f24d739d14e2a86888c84c62838d93c1bc4b9e16fa"} />} />
            {/* <Route path="/" element={<SuccessContainer />} />
            <Route path="/" element={<FailContainer />} /> */}
            <Route path="/emeraldID" element={<EmeraldID />} />
          </Routes>
        </BrowserRouter>
      </FlowContextProvider>
    </div>
  );
}

export default App;