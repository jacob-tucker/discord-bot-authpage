import React, { useEffect, useContext } from 'react';
import '../App.css';
import * as fcl from '@onflow/fcl';
import FlowContext from '../context/FlowContext';

function Testnet(props) {
    const flow = useContext(FlowContext);

    useEffect(() => {
        fcl.currentUser().subscribe(flow.setUser);
        fcl.config()
            .put('discovery.wallet', 'https://flow-wallet-testnet.blocto.app/authn')
    }, [flow.setUser])

    useEffect(() => {
        if (flow.user && flow.user.addr) {
            flow.sendAuthPOST("testnet");
        }
    }, [flow.user, flow]);

    return (
        <div className="App">
            {flow.user && flow.user.loggedIn && (flow.success === 1)
                ? <h1 className="green">Successfully verified.</h1>
                : flow.user && flow.user.loggedIn && (flow.success === 2)
                ? <h1 className="red">Verification failed.</h1>
                : null 
            }
            
            <button className="button-9" onClick={() => flow.authentication()}>{flow.user && !flow.user.loggedIn ? "Log in with Blocto" : "Log out"}</button>
        </div>
    );
}

export default Testnet;
