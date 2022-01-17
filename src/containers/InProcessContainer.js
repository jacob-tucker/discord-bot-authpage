import emeraldLogo from "../images/emerald_logo.png";
import { Transaction } from '../components/Transaction';
const InProcess = (props) => {

  console.log('InProcess', props)

    return (
        <main className="App inProcess">
            
            <header>
                <h1>EMERALD BOT</h1>
            </header>

            <section className="inProcessSection">
                <div className="card">
                    <img src={emeraldLogo} className="logoEmeraldBig" />
                    <div className="card-shape1"></div>
                    <div className="card-shape2"></div>
                    <div className="card-shape3"></div>
                    <div className="text textInProcess">
                        <h1>Setting up your EmeraldID</h1>
                        <Transaction transactionStatus={props.transactionStatus} />
                    </div>
                </div>
            </section>

            <footer>
                <div className="footerDiv">
                    <a href="https://discord.gg/emeraldcity" target="_blank"><i className="ri-discord-fill"></i></a>
                    <a href="https://twitter.com/emerald_dao" target="_blank"><i className="ri-twitter-fill"></i></a>
                    <a href=""><i className="ri-links-fill"></i></a>
                </div>
            </footer>

    </main>
    )
}

export default InProcess;