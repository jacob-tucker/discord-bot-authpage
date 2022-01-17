import emeraldLogo from "../images/emerald_logo.png";
import failEmerald from "../images/fail_emerald.png";

const FailContainer = () => {

    return (
        <main class="App fail">

            <header>
                <h1>EMERALD BOT</h1>
            </header>

            <section class="failSection">
                <div class="card failCard">
                    <div class="card-shape1"></div>
                    <div class="card-shape2"></div>
                    <div class="card-shape3"></div>
                    <img src={failEmerald} class="justHand"/>
                    <div class="text textFail">
                        <h1>Fail!</h1>
                        <p>Please try again or contact someone from our community and we will help you.</p>
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

export default FailContainer;