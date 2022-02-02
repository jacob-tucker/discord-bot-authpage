import React, { useEffect, useState, useContext } from 'react';
import '../App.css';
import * as fcl from '@onflow/fcl';
import FlowContext from '../context/FlowContext';

function Reset(props) {
    const flow = useContext(FlowContext);
    const [status, setStatus] = useState("");

    useEffect(() => {
        fcl.currentUser().subscribe(flow.setUser);
    }, []);

    const resetEmeraldID = async () => {
        setStatus('InProcess');
        const result = await flow.resetEmeraldIDWithMultiPartSign();

        if (result) {
            setStatus('Success');
        } else {
            setStatus('Fail');
        }
    }

    return (
        <div className='Login'>
            {status === 'Success' 
                ? <h1>You successfully reset your EmeraldID.</h1>
                : status === 'InProcess'
                ? <h1>Your EmeraldID is being reset...</h1>
                : status === 'Fail'
                ? <h1>Failed to reset your EmeraldID.</h1>
                : null
            }
            {flow.user && flow.user.loggedIn && status === ""
                ? 
                    <button className="button-9 red" onClick={() => resetEmeraldID()}>Reset EmeraldID</button>
                : null}

            {flow.user && !flow.user.loggedIn && status === "" 
                ? <button className="button-9" onClick={() => flow.authentication()}>
                    Log in with Blocto
                  </button> 
                : null
            }
            
        </div>
    );
}

export default Reset;
