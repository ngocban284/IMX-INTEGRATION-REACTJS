import {
  Link,
  ImmutableXClient,
  ImmutableMethodResults,
  ERC721TokenType,
  ETHTokenType,
  ImmutableRollupStatus,
} from "@imtbl/imx-sdk";
import { useEffect, useState } from "react";
require("dotenv").config();

interface BridgingProps {
  client: ImmutableXClient;
  link: Link;
  wallet: string;
}

const Bridging = ({ client, link, wallet }: BridgingProps) => {
  // withdrawals
  const [preparingWithdrawals, setPreparingWithdrawals] =
    useState<ImmutableMethodResults.ImmutableGetWithdrawalsResult>(Object);
  const [readyWithdrawals, setReadyWithdrawals] =
    useState<ImmutableMethodResults.ImmutableGetWithdrawalsResult>(Object);
  const [completedWithdrawals, setCompletedWithdrawals] =
    useState<ImmutableMethodResults.ImmutableGetWithdrawalsResult>(Object);
  // eth
  const [depositAmount, setDepositAmount] = useState("");
  const [prepareAmount, setPrepareAmount] = useState("");
  // nft
  const [depositTokenId, setDepositTokenId] = useState("");
  const [depositTokenAddress, setDepositTokenAddress] = useState("");
  const [prepareTokenId, setPrepareTokenId] = useState("");
  const [prepareTokenAddress, setPrepareTokenAddress] = useState("");
  const [completeTokenId, setCompleteTokenId] = useState("");
  const [completeTokenAddress, setCompleteTokenAddress] = useState("");

  const metaDataPreparing: any = preparingWithdrawals.result;
  const metaDataReady: any = readyWithdrawals.result;
  const metaDataCompleted: any = completedWithdrawals.result;

  useEffect(() => {
    load();
  }, []);

  async function load(): Promise<void> {
    setPreparingWithdrawals(
      await client.getWithdrawals({
        user: wallet,
        rollup_status: ImmutableRollupStatus.included,
      })
    ); // included in batch awaiting confirmation
    setReadyWithdrawals(
      await client.getWithdrawals({
        user: wallet,
        rollup_status: ImmutableRollupStatus.confirmed,
        withdrawn_to_wallet: false,
      })
    ); // confirmed on-chain in a batch and ready to be withdrawn
    setCompletedWithdrawals(
      await client.getWithdrawals({
        user: wallet,
        withdrawn_to_wallet: true,
      })
    ); // confirmed on-chain in a batch and already withdrawn to L1 wallet
  }

  // deposit an NFT
  async function depositNFT() {
    await link.deposit({
      type: ERC721TokenType.ERC721,
      tokenId: depositTokenId,
      tokenAddress: depositTokenAddress,
    });
  }

  // deposit eth
  async function depositETH() {
    await link.deposit({
      type: ETHTokenType.ETH,
      amount: depositAmount,
    });
  }

  // prepare an NFT withdrawal
  async function prepareWithdrawalNFT() {
    await link.prepareWithdrawal({
      type: ERC721TokenType.ERC721,
      tokenId: prepareTokenId,
      tokenAddress: prepareTokenAddress,
    });
  }

  // prepare an eth withdrawal
  async function prepareWithdrawalETH() {
    await link.prepareWithdrawal({
      type: ETHTokenType.ETH,
      amount: prepareAmount,
    });
  }

  // complete an NFT withdrawal
  async function completeWithdrawalNFT() {
    await link.completeWithdrawal({
      type: ERC721TokenType.ERC721,
      tokenId: completeTokenId,
      tokenAddress: completeTokenAddress,
    });
  }

  // complete an eth withdrawal
  async function completeWithdrawalETH() {
    await link.completeWithdrawal({
      type: ETHTokenType.ETH,
    });
  }

  return (
    <div>
      <h2 className="border border-info bg-black text-center rounded">ETH</h2>

      <div className="text-body-filter">
        <div className="border border-white rounded p-3">
          <h4>Deposit ETH:</h4>
          <br />
          <label>Amount (ETH):</label>
          <input
            type="text"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            className="form-control bg-black border-info text-white ms-1 mt-1 mb-1"
          />
          <button
            type="button"
            className="btn btn-info filter-button text-white"
            onClick={depositETH}
          >
            Deposit ETH
          </button>
        </div>
        <br />
        <br />
        <div className="border border-white rounded p-3">
          <h4>
            Prepare ETH for withdrawal (submit to be rolled up and confirmed on
            chain in the next batch):
          </h4>
          <br />
          <label>Amount (ETH):</label>
          <input
            type="text"
            value={prepareAmount}
            onChange={(e) => setPrepareAmount(e.target.value)}
            className="form-control bg-black border-info text-white ms-1 mt-1 mb-1"
          />

          <button
            type="button"
            className="btn btn-info filter-button text-white"
            onClick={prepareWithdrawalETH}
          >
            Prepare ETH Withdrawal
          </button>
        </div>
        <br />
        <br />
        <div className="border border-white rounded p-3">
          <h4>
            Complete ETH withdrawal (withdraws entire eth balance that is ready
            for withdrawal to L1 wallet):
          </h4>
          <br />
          <button
            type="button"
            className="btn btn-info filter-button text-white"
            onClick={completeWithdrawalETH}
          >
            Complete ETH Withdrawal
          </button>
        </div>
      </div>
      <br />
      <div className="text-body-filter">
        <h2 className="border border-info bg-black text-center rounded">
          ERC721
        </h2>

        <div className="border border-white rounded p-3">
          <h4>Deposit NFT:</h4>
          <br />
          <label>Token ID:</label>
          <input
            type="text"
            value={depositTokenId}
            onChange={(e) => setDepositTokenId(e.target.value)}
            className="form-control bg-black border-info text-white ms-1 mt-1 mb-1"
          />

          <label>Token Address:</label>
          <input
            type="text"
            value={depositTokenAddress}
            onChange={(e) => setDepositTokenAddress(e.target.value)}
            className="form-control bg-black border-info text-white ms-1 mt-1 mb-1"
          />

          <button
            type="button"
            className="btn btn-info filter-button text-white"
            onClick={depositNFT}
          >
            Deposit NFT
          </button>
        </div>
        <br />
        <br />
        <div className="border border-white rounded p-3">
          <h4>
            Prepare NFT for withdrawal (submit to be rolled up and confirmed on
            chain in the next batch):
          </h4>
          <br />
          <label>Token ID:</label>
          <input
            type="text"
            value={prepareTokenId}
            onChange={(e) => setPrepareTokenId(e.target.value)}
            className="form-control bg-black border-info text-white ms-1 mt-1 mb-1"
          />

          <label>Token Address:</label>
          <input
            type="text"
            value={prepareTokenAddress}
            onChange={(e) => setPrepareTokenAddress(e.target.value)}
            className="form-control bg-black border-info text-white ms-1 mt-1 mb-1"
          />

          <button
            type="button"
            className="btn btn-info filter-button text-white"
            onClick={prepareWithdrawalNFT}
          >
            Prepare NFT Withdrawal
          </button>
        </div>
        <br />
        <br />
        <div className="border border-white rounded p-3">
          <h4>
            Complete NFT withdrawal (withdraws single NFT that is ready for
            withdrawal to L1 wallet):
          </h4>
          <br />
          <label>Token ID:</label>
          <input
            type="text"
            value={completeTokenId}
            onChange={(e) => setCompleteTokenId(e.target.value)}
            className="form-control bg-black border-info text-white ms-1 mt-1 mb-1"
          />

          <label>Token Address:</label>
          <input
            type="text"
            value={completeTokenAddress}
            onChange={(e) => setCompleteTokenAddress(e.target.value)}
            className="form-control bg-black border-info text-white ms-1 mt-1 mb-1"
          />

          <button
            type="button"
            className="btn btn-info filter-button text-white"
            onClick={completeWithdrawalNFT}
          >
            Complete NFT Withdrawal
          </button>
        </div>
      </div>
      <br />
      <br />
      <br />
      <p>
        <h2>Withdrawals being prepared:</h2>
        <div className="row">
          {metaDataPreparing?.map((data: any) => (
            <div className="col-4 mb-5" key={data?.transaction_id}>
              <div className="card bg-dark border-info">
                <div className="card-body">
                  <h4 className="card-title text-center border-bottom border-info">
                    {data?.token?.type}
                  </h4>
                  <div className="card-text text-center mt-3">
                    {/* <div>Token Address :</div> */}
                    {data?.token?.data?.token_address || ""}
                  </div>

                  <div className="card-text text-center text-success">
                    <h4>{data?.status}</h4>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </p>
      <br />
      <br />
      <p>
        <h2>Ready for withdrawal:</h2>
        <div className="row">
          {metaDataReady?.map((data: any) => (
            <div className="col-4 mb-5" key={data.transaction_id}>
              <div className="card bg-dark border-info">
                <div className="card-body">
                  <h4 className="card-title text-center border-bottom border-info">
                    {data.token.type}
                  </h4>
                  <div className="card-text text-center mt-3">
                    {/* <div>Token Address :</div> */}
                    {data.token.data.token_address || ""}
                  </div>

                  <div className="card-text text-center text-success">
                    <h4>{data.status}</h4>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </p>
      <br />
      <br />
      <p>
        <h2>Withdrawn to wallet:</h2>
        <div className="row">
          {metaDataCompleted?.map((data: any) => (
            <div className="col-4 mb-5" key={data?.transaction_id}>
              <div className="card bg-dark border-info">
                <div className="card-body">
                  <h4 className="card-title text-center border-bottom border-info">
                    {data?.token?.type}
                  </h4>
                  <div className="card-text text-center mt-3">
                    {/* <div>Token Address :</div> */}
                    {data?.token?.data?.token_address || ""}
                  </div>

                  <div className="card-text text-center text-success">
                    <h4>{data?.status}</h4>
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

export default Bridging;
