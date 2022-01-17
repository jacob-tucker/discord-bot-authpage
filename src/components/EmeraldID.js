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
        fcl.config()
            .put('discovery.wallet', 'https://flow-wallet.blocto.app/authn');
    }, []);

    const doStuff = async () => {
        
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
        const result = await flow.createEmeraldID();

        if (result) {
            setStatus("Success");
        } else {
            setStatus("Fail");
        }

    };

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
                ? <button className="button-9 green" onClick={() => doStuff()}>Create EmeraldID</button> 
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
