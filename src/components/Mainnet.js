import React, { useEffect, useContext } from 'react';
import '../App.css';
import * as fcl from '@onflow/fcl';
import FlowContext from '../context/FlowContext';

function Mainnet(props) {
    const flow = useContext(FlowContext);

    useEffect(() => {
        fcl.currentUser().subscribe(flow.setUser);
        fcl.config()
            .put('discovery.wallet', 'https://flow-wallet.blocto.app/authn')
    }, [flow.setUser]);

    useEffect(() => {
        if (flow.user && flow.user.addr) {
            flow.sendAuthPOST("mainnet");
        }
    }, [flow.user, flow]);

    return (
        <div className="App">
            
            {flow.user && flow.user.loggedIn && (flow.success === 1)                
                ? <h1 className="green">Successfully verified.</h1> // <SucessContainer />
                : flow.user && flow.user.loggedIn && (flow.success === 2)
                ? <h1 className="red">Verification failed.</h1> //<FailContainer />
                : null 
            }
            <button className="button-9" onClick={() => flow.authentication()}>{flow.user && !flow.user.loggedIn ? "Log in with Blocto" : "Log out"}</button>
        </div>
    );
}

export default Mainnet;
