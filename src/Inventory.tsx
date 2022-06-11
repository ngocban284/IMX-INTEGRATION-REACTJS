import { Link, ImmutableXClient, ImmutableMethodResults } from "@imtbl/imx-sdk";
import { useEffect, useState } from "react";
require("dotenv").config();

interface InventoryProps {
  client: ImmutableXClient;
  link: Link;
  wallet: string;
}

const Inventory = ({ client, link, wallet }: InventoryProps) => {
  const [inventory, setInventory] =
    useState<ImmutableMethodResults.ImmutableGetAssetsResult>(Object);
  // buying and selling
  const [sellAmount, setSellAmount] = useState("");
  const [sellTokenId, setSellTokenId] = useState("");
  const [sellTokenAddress, setSellTokenAddress] = useState("");
  const [sellCancelOrder, setSellCancelOrder] = useState("");
  const metaData: any = inventory.result;

  useEffect(() => {
    load();
  }, []);

  async function load(): Promise<void> {
    setInventory(await client.getAssets({ user: wallet, sell_orders: true }));
  }

  // sell an asset
  async function sellNFT() {
    await link.sell({
      amount: sellAmount,
      tokenId: sellTokenId,
      tokenAddress: sellTokenAddress,
    });
    setInventory(await client.getAssets({ user: wallet, sell_orders: true }));
  }

  // cancel sell order
  async function cancelSell() {
    await link.cancel({
      orderId: sellCancelOrder,
    });
    setInventory(await client.getAssets({ user: wallet, sell_orders: true }));
  }

  return (
    <div>
      <div className="text-body-filter">
        <h2 className="border border-info bg-black text-center rounded">
          Sell asset (create sell order):
        </h2>
        <br />
        <div className="border border-white rounded p-3">
          <label>Amount (ETH):</label>
          <input
            type="text"
            value={sellAmount}
            onChange={(e) => setSellAmount(e.target.value)}
            className="form-control bg-black border-info text-white ms-1 mb-3"
          />
          <label>Token ID:</label>
          <input
            type="text"
            value={sellTokenId}
            onChange={(e) => setSellTokenId(e.target.value)}
            className="form-control bg-black border-info text-white ms-1 mb-3"
          />
          <label>Token Address:</label>
          <input
            type="text"
            value={sellTokenAddress}
            onChange={(e) => setSellTokenAddress(e.target.value)}
            className="form-control bg-black border-info text-white ms-1 mb-3"
          />
          <button
            type="button"
            className="btn btn-info filter-button text-white"
            onClick={sellNFT}
          >
            Sell
          </button>
        </div>
      </div>
      <br />
      <div className="text-body-filter">
        <h2 className="border border-info bg-black text-center rounded">
          Cancel sell order:
        </h2>
        <br />
        <div className="border border-white rounded p-3">
          <label>Order ID:</label>
          <input
            type="text"
            value={sellCancelOrder}
            onChange={(e) => setSellCancelOrder(e.target.value)}
            className="form-control bg-black border-info text-white ms-1 mb-3"
          />

          <button
            type="button"
            className="btn btn-info filter-button text-white"
            onClick={cancelSell}
          >
            Cancel
          </button>
        </div>
      </div>
      <br />
      <br />
      <br />
      <p>
        <h2 className="border border-info bg-black text-center rounded">
          Inventory:
        </h2>
        <div className="row mt-5">
          {metaData?.map((data: any) => (
            <div className="col-3 mb-5" key={data.token_id}>
              <div className="card bg-dark border-info">
                <img
                  className="card-img-top"
                  src={
                    data?.image_url ||
                    "https://scontent.fhan5-3.fna.fbcdn.net/v/t39.30808-6/284606989_161582893012997_4676275443848334551_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=dbeb18&_nc_ohc=qYefKovxLZ8AX-YMDrs&_nc_ht=scontent.fhan5-3.fna&oh=00_AT-oT73HgdSw6KuX3ZZ9sU_f98ASqp2AS_VJJ2574DyPSg&oe=62A8D320"
                  }
                />
                <div className="card-body">
                  <h5 className="card-title text-white">
                    {data?.name || "Default"}
                  </h5>
                  <p className="card-text ">{data.collection.name}</p>
                  <div className="d-flex flex-row-reverse">
                    {console.log(data?.metadata?.Price)}
                    <div>{data?.metadata?.Price || ""}</div>
                    <label>
                      <i className="fab fa-ethereum"></i>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </p>
    </div>
  );
};

export default Inventory;
