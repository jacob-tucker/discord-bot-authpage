import React, { useState, useEffect, useContext } from 'react';
import '../App.css';
import * as fcl from '@onflow/fcl';
import FlowContext from '../context/FlowContext';

function Mainnet(props) {
    const flow = useContext(FlowContext);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        fcl.currentUser().subscribe(flow.setUser);
        fcl.config()
            .put('discovery.wallet', 'https://flow-wallet.blocto.app/authn')
    }, [])

    useEffect(() => {
        if (flow.user && flow.user.addr) {
            let success = await flow.sendAuthPOST("mainnet");
            setSuccess(success);
        }
    }, [flow.user]);

    return (
        <div className="App">
            <h1>{flow.user.loggedIn && success 
                    ? "Successfully verified." 
                    : flow.user.loggedIn && !success
                    ? "Verification failed."
                    : null 
                }
            </h1>
            <button className="button-9" onClick={() => flow.authentication()}>{flow.user && !flow.user.addr ? "Log in with Blocto" : "Log out"}</button>
        </div>
    );
}

export default Mainnet;
