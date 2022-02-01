import React, { useEffect, useState, useContext } from 'react';
import '../App.css';
import * as fcl from '@onflow/fcl';
import FlowContext from '../context/FlowContext';
import SuccessContainer from '../containers/SuccessContainer';
import InProcess from '../containers/InProcessContainer';
import FailContainer from '../containers/FailContainer';

function EmeraldID(props) {
    const flow = useContext(FlowContext);
    const [status, setStatus] = useState("");
    const [classname, setClassname] = useState('Login');

    useEffect(() => {
        fcl.currentUser().subscribe(flow.setUser);
    }, []);

    const setupProcess = async () => {
        
        const exists = await flow.checkEmeraldID();
        setClassname('');
        console.log(exists);
        if (!exists) {
            setStatus('InProcess');
            createEmeraldID();
        } else {
            setStatus('Success');
        }
        
    }

    const createEmeraldID = async () => {
        const result = await flow.createEmeraldIDWithMultiPartSign();

        if (result) {
            setStatus("Success");
        } else {
            setStatus("Fail");
        }
    };

    const resetEmeraldID = async () => {
        const result = await flow.resetEmeraldIDWithMultiPartSign();

        if (result) {
            console.log("Your EmeraldID has been reset.")
        } else {
            console.log("There was an error resetting your EmeraldID.")
        }
    }

    return (
        <div className={classname}>
            {status === 'Success' 
                ? <SuccessContainer />
                : status === 'InProcess'
                ? <InProcess transactionStatus={flow.transactionStatus} txId={flow.txId} />
                : status === 'Fail'
                ? <FailContainer />
                : null
            }
            {flow.user && flow.user.loggedIn && status === ""
                ? 
                <div>
                    <button className="button-9 green" onClick={() => setupProcess()}>Create EmeraldID</button> 
                    <button className="button-9" onClick={() => resetEmeraldID()}>Reset EmeraldID</button>
                </div>
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

export default EmeraldID;
