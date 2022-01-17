import React, { useEffect, useState, useContext } from 'react';
import '../App.css';
import logo from '../imgs/diamondhand.png'

function Teste(props) {
    //const [message, setMessage] = useState(null);
    //const [status, setStatus] = useState("blue");



    return (
    <div>
    <h1 class="green">Hello World! </h1>
    {/* mainapp */}
    <div class="App">
        <h1 className="green">Successfully verified.</h1>
        <h1 className="red">Verification failed.</h1>
        <button className="button-9"> Log in with Blocto </button>
    </div>

    {/* EmeraldID */}
    <div class="App">
        <h1 className="green">You have already set up your EmeraldID :</h1>
        <h1 className="blue">Setting up your EmeraldID. Please wait ~30 seconds.</h1>
        <div class="sucess">
        <img src={logo}/>
        <h1 className="green">Success!</h1>
        <p>Please go back to Discord and click `Verify` again.</p>
        </div>
        <button className="button-9"> Log in with Blocto </button>
        
    </div>

        <div class="sucess">
            <header> 
                <h1 class="header">EMERALD BOT</h1>
            </header>
            <main>
            <div class="card">
                <img src={logo}/>
                <div class="text">
                    <h1>Success!</h1>
                    <p>Please go back to Discord and click `Verify` again.</p>
                </div>
            </div>
            </main>
            <footer>
                <p>Learn more about Emerald</p>
            </footer>
        </div>

    </div>
    )
}

export default Teste;
