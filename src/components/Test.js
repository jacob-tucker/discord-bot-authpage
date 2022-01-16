import React, { useEffect, useState, useContext } from 'react'
import '../App.css'
import * as fcl from '@onflow/fcl'
import * as t from '@onflow/types'
import { serverAuthorization, getScriptByScriptName } from '../helpers/serverAuth.js'

fcl.config().put('discovery.wallet', 'https://flow-wallet-testnet.blocto.app/authn')

function Test(props) {
  const [user, setUser] = useState()

  useEffect(() => {
    fcl.currentUser().subscribe(setUser)
  }, [])

  const logIn = () => {
    console.log('Logging in.')
    fcl.authenticate()
    fcl.currentUser().subscribe(setUser)
  }

  const multiSign = async (scriptName = 'initializeEmeraldID', args = undefined) => {
    // query the cadence by scriptName for verify auth request
    const { scriptCode = '' } = await getScriptByScriptName(scriptName)
    const serverSigner = serverAuthorization(scriptName, user)

    if (!scriptCode || scriptCode == '') {
      console.log('cannot get auth script code')
      return ''
    }
    const txHash = await fcl.send([
      fcl.transaction`${scriptCode}`,
      fcl.args(args || [fcl.arg(user.addr, t.Address)]),
      fcl.proposer(fcl.authz),
      fcl.payer(serverSigner),
      fcl.authorizations([serverSigner]),
    ])
    console.log({ txHash })

    const result = await fcl.tx(txHash).onceSealed()
    console.log({ result })
  }

  return (
    <div className='App'>
      <h1>{user && user.addr ? user.addr : null}</h1>
      <button className='button-9' onClick={() => logIn()}>
        Log In
      </button>
      <button className='button-9' onClick={() => fcl.unauthenticate()}>
        Log Out
      </button>
      <button className='button-9' onClick={() => multiSign()}>
        Multi Sign
      </button>
    </div>
  )
}

export default Test
