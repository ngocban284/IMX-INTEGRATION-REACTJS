import "./App.css";
import { Link, ImmutableXClient, ImmutableMethodResults } from "@imtbl/imx-sdk";
import { useEffect, useState } from "react";
import Marketplace from "./Marketplace";
import Inventory from "./Inventory";
import Bridging from "./Bridging";
require("dotenv").config();

const App = () => {
  // initialise Immutable X Link SDK
  const link = new Link(process.env.REACT_APP_ROPSTEN_LINK_URL);

  // general
  const [tab, setTab] = useState("marketplace");
  const [wallet, setWallet] = useState("undefined");
  const [balance, setBalance] =
    useState<ImmutableMethodResults.ImmutableGetBalanceResult>(Object);
  const [client, setClient] = useState<ImmutableXClient>(Object);

  useEffect(() => {
    buildIMX();
  }, []);

  // initialise an Immutable X Client to interact with apis more easily
  async function buildIMX() {
    const publicApiUrl: string = process.env.REACT_APP_ROPSTEN_ENV_URL ?? "";
    setClient(await ImmutableXClient.build({ publicApiUrl }));
  }

  // register and/or setup a user
  async function linkSetup(): Promise<void> {
    const res = await link.setup({});
    setWallet(res.address);
    setBalance(
      await client.getBalance({ user: res.address, tokenAddress: "eth" })
    );
  }

  function handleTabs() {
    if (client.address) {
      switch (tab) {
        case "inventory":
          if (wallet === "undefined") return <div>Connect wallet</div>;
          return <Inventory client={client} link={link} wallet={wallet} />;
        case "bridging":
          if (wallet === "undefined") return <div>Connect wallet</div>;
          return <Bridging client={client} link={link} wallet={wallet} />;
        default:
          return <Marketplace client={client} link={link} />;
      }
    }
    return null;
  }

  return (
    <div className="App container-color text-white">
      <nav className="navbar navbar-expand-lg  nav-background navbar-light">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img
              id="MDB-logo"
              src="https://techfi.tech/content/images/2022/04/logden2.png"
              alt="MDB Logo"
              draggable="false"
              height="30"
            />
          </a>
          <button
            className="navbar-toggler button-background"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto align-items-center">
              {wallet == "undefined" ? (
                <button
                  type="button"
                  className="btn btn-info btn-sm text-white filter-button-connect"
                  onClick={linkSetup}
                >
                  Connect Wallet
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    className="btn btn-info btn-sm text-white filter-button "
                    onClick={() => setTab("marketplace")}
                  >
                    Marketplace
                  </button>

                  <button
                    type="button"
                    className="btn btn-info btn-sm text-white filter-button"
                    onClick={() => setTab("inventory")}
                  >
                    Inventory
                  </button>

                  <button
                    type="button"
                    className="btn btn-info btn-sm text-white filter-button"
                    onClick={() => setTab("bridging")}
                  >
                    Deposit and withdrawal
                  </button>

                  <button
                    type="button"
                    className="btn btn-info btn-sm text-white filter-button-connect"
                    onClick={linkSetup}
                  >
                    <div className="text-truncate" style={{ maxWidth: 120 }}>
                      {wallet}
                    </div>
                  </button>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <div className="container ">
        {/* <div>Active wallet: {wallet}</div> */}
        <p className="text-body-filter border border-info rounded p-3 ">
          ETH balance (in wei):
          <span className="text-white filter-button">
            {balance?.balance?.toString()}
          </span>
        </p>
        {/* <button onClick={() => setTab("marketplace")}>Marketplace</button>
      <button onClick={() => setTab("inventory")}>Inventory</button>
      <button onClick={() => setTab("bridging")}>Deposit and withdrawal</button> */}
        <br />
        <br />
        <br />
        {handleTabs()}
      </div>
    </div>
  );
};

export default App;
