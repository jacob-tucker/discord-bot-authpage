import React, { useState, useEffect } from 'react'
import * as fcl from '@onflow/fcl'
import * as t from '@onflow/types'
import { getScriptByScriptName, getDiscordID, serverAuthorization } from '../helpers/serverAuth.js'

const Context = React.createContext({})

fcl.config()
    .put('accessNode.api', 'https://mainnet.onflow.org')
    .put('discovery.wallet', 'https://flow-wallet.blocto.app/authn');

function Provider(props) {
  const [user, setUser] = useState()
  const [id, setID] = useState(null)

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
    console.log(response)
    return response
  }

  const createEmeraldIDWithMultiPartSign = async () => {
    try {
      const scriptName = 'initializeEmeraldID'
      const { scriptCode = '' } = await getScriptByScriptName(scriptName);
      const { discordID = '' } = await getDiscordID(id);
      const serverSigner = serverAuthorization(scriptName, user)

      if (!scriptCode || scriptCode == '') {
        console.log('cannot get auth script code')
        return ''
      }
      if (!discordID || discordID == '') {
        console.log('cannot failed to get discordID')
        return ''
      }

      const txHash = await fcl.send([
        fcl.transaction`${scriptCode}`,
        fcl.args([
            fcl.arg(user.addr, t.Address), 
            fcl.arg(discordID, t.String)
        ]),
        fcl.proposer(fcl.authz),
        fcl.payer(serverSigner),
        fcl.authorizations([serverSigner]),
      ])
      console.log({ txHash })

      const result = await fcl.tx(txHash).onceSealed()
      return true
      console.log({ result })
    } catch (e) {
      console.log(e)
      return false
    }
  }

  const resetEmeraldIDWithMultiPartSign = async () => {
    try {
      const scriptName = 'removeEmeraldIDByAccount'
      const { scriptCode = '' } = await getScriptByScriptName(scriptName)
      const serverSigner = serverAuthorization(scriptName, user)

      if (!scriptCode || scriptCode == '') {
        console.log('cannot get auth script code')
        return ''
      }

      const txHash = await fcl.send([
        fcl.transaction`${scriptCode}`,
        fcl.args([
            fcl.arg(user.addr, t.Address)
        ]),
        fcl.proposer(fcl.authz),
        fcl.payer(serverSigner),
        fcl.authorizations([serverSigner]),
      ])
      console.log({ txHash })

      const result = await fcl.tx(txHash).onceSealed()
      return true
      console.log({ result })
    } catch (e) {
      console.log(e)
      return false
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