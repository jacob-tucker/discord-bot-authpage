import React, { useEffect, useState, useContext } from 'react';
import '../App.css';
import * as fcl from '@onflow/fcl';
import { serverAuthorization } from "../helpers/serverAuth.js";

fcl.config()
  .put('discovery.wallet', 'https://flow-wallet-testnet.blocto.app/authn')

function Test(props) {
  const [user, setUser] = useState();

  useEffect(() => {
    fcl.currentUser().subscribe(setUser);
  }, []);

  const logIn = () => {
    fcl.authenticate();
    fcl.currentUser().subscribe(setUser);
  }

  const multiSign = async () => {
    const serverSigner = serverAuthorization("default");
    const txHash = await fcl.send([
      fcl.transaction`
            transaction{
              prepare(signer: AuthAccount){
                // do nothing :)
              }
            }
          `,
      fcl.proposer(fcl.authz),
      fcl.payer(serverSigner),
      fcl.authorizations([serverSigner]),
    ]);
    console.log({ txHash });

    const result = await fcl.tx(txHash).onceSealed();
    console.log({ result });
  };

  return (
    <div className="App">
      <h1>{user && user.addr ? user.addr : null}</h1>
      <button className='button-9' onClick={() => logIn}>Log In</button>
      <button className='button-9' onClick={() => fcl.unauthenticate()}>Log Out</button>
      <button className='button-9' onClick={() => multiSign()}>Multi Sign</button>
    </div>
  );
}

export default Test;
