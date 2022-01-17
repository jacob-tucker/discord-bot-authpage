import emeraldLogo from "../images/emerald_logo.png";
const InProcess = () => {

    return (
        <main class="App inProcess">
            
            <header>
                <h1>EMERALD BOT</h1>
            </header>

            <section class="inProcessSection">
                <div class="card">
                    <img src={emeraldLogo} class="logoEmeraldBig" />
                    <div class="card-shape1"></div>
                    <div class="card-shape2"></div>
                    <div class="card-shape3"></div>
                    <div class="text textInProcess">
                        <h1>Setting up your EmeraldID</h1>
                        <p>Please wait ~30 seconds.</p>
                    </div>
                </div>
            </section>

            <footer>
                <div class="footerDiv">
                    <a href="https://discord.gg/emeraldcity" target="_blank"><i class="ri-discord-fill"></i></a>
                    <a href="https://twitter.com/emerald_dao" target="_blank"><i class="ri-twitter-fill"></i></a>
                    <a href=""><i class="ri-links-fill"></i></a>
                </div>
            </footer>

    </main>
    )
}

export default InProcess;