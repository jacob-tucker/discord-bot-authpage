
const SucessContainer = () => {

    return (
        <main class="App sucess">

            <header>
                <h1>EMERALD BOT</h1>
            </header>

            <section class="sucessSection">
                <div class="card">
                    <img src="emeraldLogo.png" class="logoEmerald" />
                    <div class="card-shape1"></div>
                    <div class="card-shape2"></div>
                    <div class="card-shape3"></div>
                    <img src="justHand.png" class="justHand"/>
                    <div class="text">
                        <h1>Success!</h1>
                        <p>Please go back to Discord and click `Verify` again.</p>
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

export default SucessContainer;