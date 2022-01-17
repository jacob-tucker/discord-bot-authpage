import React, { useEffect, useState, useContext } from 'react';
import '../App.css';
import * as fcl from '@onflow/fcl';
import FlowContext from '../context/FlowContext';
import SucessContainer from '../containers/SucessContainer';
import FailContainer from '../containers/FailContainer';

function EmeraldID(props) {
    const flow = useContext(FlowContext);
    const [message, setMessage] = useState(null);
    const [status, setStatus] = useState("blue");

    useEffect(() => {
        fcl.currentUser().subscribe(flow.setUser);
        fcl.config()
            .put('discovery.wallet', 'https://flow-wallet.blocto.app/authn')
    }, []);

    useEffect(() => {
        if (flow.user && flow.user.loggedIn) {
            const wrap = async () => {
                let setup = await flow.checkEmeraldID();
                console.log(setup);
                if (!setup) {
                    createEmeraldID();
                } else {
                    setMessage("You have already set up your EmeraldID :)");
                    setStatus("green");
                }
            }

            wrap();
        }
    }, [flow.user]);

    const createEmeraldID = async () => {

        let response = 'inProcess'
        // setMessage('Setting up your EmeraldID. Please wait ~30 seconds.');
        // setStatus("blue");
        response = await flow.createEmeraldID();

        if (response === 'Success') {
            response = 'Sucess';
            //setMessage('Success! Please go back to Discord and click `Verify` again.');
            //setStatus("green");
        } else {
            setMessage(response);
            response = 'Fail'
            //setStatus("red");
        }
    }

    return (
        <div className="App">
            {flow.user && flow.user.loggedIn && message 
                ? <h1 className={status}>{message}</h1>
                : null}
            
            {response == 'inProcess' ? < InProcess /> : null}
            {response == 'Sucess' ? <SucessContainer/> : null}
            {response == 'Fail' ? <FailContainer /> : null}
            
            

            <button className="button-9" onClick={() => flow.authentication()}>{flow.user && !flow.user.loggedIn ? "Log in with Blocto" : "Log out"}</button>
        </div>
    );
}

export default EmeraldID;
