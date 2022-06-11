import {
  Link,
  ImmutableXClient,
  ImmutableMethodResults,
  ImmutableOrderStatus,
} from "@imtbl/imx-sdk";
import { data } from "autoprefixer";
import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
require("dotenv").config();

interface MarketplaceProps {
  client: ImmutableXClient;
  link: Link;
}

const Marketplace = ({ client, link }: MarketplaceProps) => {
  const [marketplace, setMarketplace] =
    useState<ImmutableMethodResults.ImmutableGetOrdersResult>(Object);
  const [buyOrderId, setBuyOrderId] = useState("");
  const metaData: any = marketplace.result;

  useEffect(() => {
    load();
  }, []);

  async function load(): Promise<void> {
    // setMarketplace(await client.getOrders({status: ImmutableOrderStatus.active, user: '0xc120a52ad90bb926bafcdfc9161740dcf4a2cea1'}))
    setMarketplace(
      await client.getOrders({ status: ImmutableOrderStatus.active })
    );
  }

  // buy an asset
  async function buyNFT() {
    await link.buy({
      orderIds: [buyOrderId],
    });
  }

  return (
    <div>
      <div className="text-body-filter ">
        <h2 className="border border-info bg-black text-center rounded">
          Buy Asset
        </h2>
        <br />
        <div className="border border-white rounded p-3">
          <label>Order ID:</label>
          <div>
            <input
              type="text"
              className="form-control bg-black border-info text-white ms-1 mt-1 mb-1"
              value={buyOrderId}
              onChange={(e) => setBuyOrderId(e.target.value)}
            />
            <button
              type="button"
              className="btn btn-info filter-button text-white"
              onClick={buyNFT}
            >
              Buy
            </button>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />

      <h2 className="">Marketplace (active sell orders):</h2>
      <ul>
        <br />
        <div className="row">
          {metaData?.map(({ order_id, sell: { data } }: any) => (
            <div className="col-3 mb-5" key={order_id}>
              <div className="card bg-dark border-info">
                <img
                  src={
                    (data && data.properties && data.properties.image_url) ||
                    `https://scontent.fhan5-11.fna.fbcdn.net/v/t39.30808-6/283868633_124015663636952_5970828192354239745_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=RgfdSr2ov5wAX9WLiOX&tn=KG1VVg3c3Y2kofoe&_nc_ht=scontent.fhan5-11.fna&oh=00_AT_RJ9Wgwp7vYFvmQmL3WYufPd5eLup1GH64uWVCfUsGfw&oe=62A738C6`
                  }
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title text-white">
                    {data.properties.name}
                  </h5>

                  <p className="card-text">{data.properties.collection.name}</p>
                  <div className="d-flex flex-row-reverse">
                    <div>{BigNumber.from(data.quantity._hex).toString()}</div>
                    <label>
                      <i className="fab fa-ethereum"></i>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default Marketplace;
