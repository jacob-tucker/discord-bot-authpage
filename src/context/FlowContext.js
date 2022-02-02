import React, { useState, useEffect } from 'react'
import * as fcl from '@onflow/fcl'
import * as t from '@onflow/types'
import { getScriptByScriptName, getDiscordID, serverAuthorization } from '../helpers/serverAuth.js'

const Context = React.createContext({})

fcl.config()
    .put('accessNode.api', 'https://mainnet.onflow.org')
    .put('discovery.wallet', 'https://flow-wallet.blocto.app/authn');

function Provider(props) {
  const [user, setUser] = useState();
  const [id, setID] = useState(null);
  const [transactionStatus, setTransactionStatus] = useState(-1);
  const [txId, setTxId] = useState("0123abcd");

  const authentication = async () => {
    if (user && user.addr) {
      fcl.unauthenticate()
    } else {
      fcl.authenticate()
    }
  }

  const checkEmeraldID = async () => {
    const response = await fcl.send([
        fcl.script`
            import EmeraldIdentity from 0x39e42c67cc851cfb
            pub fun main(account: Address): String? {    
                return EmeraldIdentity.getDiscordFromAccount(account: account)
            }
        `,
        fcl.args([
            fcl.arg(user.addr, t.Address)
        ]),
      ])
      .then(fcl.decode)
    return response
  }

  const createEmeraldIDWithMultiPartSign = async () => {
    try {
      const scriptName = 'initializeEmeraldID'
      const { scriptCode = '' } = await getScriptByScriptName(scriptName);
      const { discordID = '' } = await getDiscordID(id);
      const serverSigner = serverAuthorization(scriptName, user)

      if (!scriptCode || scriptCode === '') {
        console.log('cannot get auth script code')
        return ''
      }
      if (!discordID || discordID === '') {
        console.log('cannot failed to get discordID')
        return ''
      }
      console.log({scriptCode, discordID})

      const transactionId = await fcl.send([
        fcl.transaction`${scriptCode}`,
        fcl.args([
            fcl.arg(user.addr, t.Address), 
            fcl.arg(discordID, t.String)
        ]),
        fcl.proposer(fcl.authz),
        fcl.payer(serverSigner),
        fcl.authorizations([serverSigner]),
        fcl.limit(100)
      ]).then(fcl.decode);
      console.log({ transactionId });
      setTxId(transactionId);

      fcl.tx(transactionId).subscribe((res) => { return setTransactionStatus(res.status); })
      return fcl.tx(transactionId).onceSealed();
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  const resetEmeraldIDWithMultiPartSign = async () => {
    try {
      const scriptName = 'resetEmeraldIDByAccount';
      const { scriptCode = '' } = await getScriptByScriptName(scriptName)
      const serverSigner = serverAuthorization(scriptName, user)

      if (!scriptCode || scriptCode === '') {
        console.log('cannot get auth script code')
        return ''
      }

      const transactionId = await fcl.send([
        fcl.transaction`${scriptCode}`,
        fcl.args([
            fcl.arg(user.addr, t.Address)
        ]),
        fcl.proposer(fcl.authz),
        fcl.payer(serverSigner),
        fcl.authorizations([serverSigner]),
        fcl.limit(100)
      ]).then(fcl.decode);
      console.log({ transactionId });
      setTxId(transactionId);

      fcl.tx(transactionId).subscribe((res) => { return setTransactionStatus(res.status); })
      return fcl.tx(transactionId).onceSealed();
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  useEffect(() => {
    // Gets the id in the URL
    let search = window.location.search
    let params = new URLSearchParams(search)
    setID(params.get('id'))
  }, [])

  return (
    <Context.Provider
      value={{
        user,
        txId,
        transactionStatus,
        setUser,
        authentication,
        checkEmeraldID,
        createEmeraldIDWithMultiPartSign,
        resetEmeraldIDWithMultiPartSign
      }}
    >
      {props.children}
    </Context.Provider>
  )
}

export { Context as default, Provider }