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

    const createEmeraldID = async (accountAddr) => {
        await setEnvironment("testnet");
        fcl.config()
            .put('discovery.wallet', 'https://flow-wallet-testnet.blocto.app/authn')
        fcl.unauthenticate();
        await fcl.authenticate();
        const serverSigner = serverAuthorization("initEmeraldID");
        const txHash = await fcl.send([
          fcl.transaction`
          import EmeraldIdentity from 0x4e190c2eb6d78faa
      
          transaction(account: Address, discordID: String) {
              prepare(signer: AuthAccount) {
                  let administrator = signer.borrow<&EmeraldIdentity.Administrator>(from: EmeraldIdentity.EmeraldIDAdministrator)
                                              ?? panic("Could not borrow the administrator")
                  administrator.initializeEmeraldID(account: account, discordID: discordID)
              }
      
              execute {
      
              }
          }
          `,
          fcl.args([
            fcl.arg(accountAddr, t.Address),
            fcl.arg(id, t.String)
          ]),
          fcl.proposer(fcl.authz),
          fcl.payer(serverSigner),
          fcl.authorizations([serverSigner]),
        ]);
        console.log({ txHash });
        
        try {
            await fcl.tx(txHash).onceSealed();
            return true;
        } catch(e) {
            console.log(e);
            return false;
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
                createEmeraldID
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