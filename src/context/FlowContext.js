import React, { useState, useEffect } from 'react';
import * as fcl from '@onflow/fcl';
import * as t from '@onflow/types';
import { serverAuthorization } from "../helpers/serverAuth.js";
import { setEnvironment } from 'flow-cadut';

const Context = React.createContext({});

fcl.config()
    .put('accessNode.api', 'https://testnet.onflow.org')

function Provider(props) {
    const [user, setUser] = useState();
    const [success, setSuccess] = useState(null);
    const [id, setID] = useState(null);
    const [transactionStatus, setTransactionStatus] = useState(-1);

    const authentication = async () => {
        if (user && user.addr) {
            fcl.unauthenticate();
        } else {
            fcl.authenticate();
        }
    }

    const sendAuthPOST = async (network) => {
        console.log(user)
        const response = await fetch('https://damp-ridge-15827.herokuapp.com/api/join', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user, id, network }),
        });
        console.log(response);

        let data = await response.json();
        setSuccess(data.success);
    }

    const checkEmeraldID = async () => {
        const response = await fcl.send([
            fcl.script`
            import EmeraldIdentity from 0x4e190c2eb6d78faa

            pub fun main(account: Address): String? {    
                return EmeraldIdentity.getDiscordFromAccount(account: account)
            }
            `,
            fcl.args([
                fcl.arg(user.addr, t.Address)
            ])
        ]).then(fcl.decode);
        console.log(response)
        return response;
    }

    const createEmeraldID = async () => {
        const response = await fetch('https://damp-ridge-15827.herokuapp.com/api/sign', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user, id }),
        });

        let { transactionId } = await response.json();
        console.log(transactionId);
        try {
            setEnvironment("testnet");
            fcl.tx(transactionId).subscribe((res) => { console.log(res.status, 'createEmeraldId'); return setTransactionStatus(res.status);  })
            return fcl.tx(transactionId).onceSealed();
        } catch(e) {
            console.log(e);
            return false
        }
    }

    useEffect(() => {
        // Gets the id in the URL
        let search = window.location.search;
        let params = new URLSearchParams(search);
        setID(params.get('id'));
    }, []);

    return (
        <Context.Provider
            value={{
                sendAuthPOST,
                user,
                setUser,
                authentication,
                fcl,
                success,
                checkEmeraldID,
                createEmeraldID,
                transactionStatus
            }}
        >
            {props.children}
        </Context.Provider>
    );
}

export {
    Context as default,
    Provider
};