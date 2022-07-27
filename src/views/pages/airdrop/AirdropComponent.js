import React, { useEffect, useState } from "react";
import CustomText from "views/components/CustomText";
import { toast, ToastContainer } from "react-toastify";
import { readAirdropAmt } from "functions/Utility";
import { useSelector } from "react-redux";
import { checkClaimAirdrop } from "functions/Utility";
import { claimAirdrop } from "functions/Utility";
import { Link } from "react-router-dom";
import { createMerkleProof } from "functions/Utility";
import Loader from "views/layout/Loader";
import { config } from "constant";

export default function AirdropComponent() {
  const walletAddress = useSelector(
    (state) => state?.app?.coinbaseAddress ?? ""
  );
  const web3Object = useSelector((state) => state?.data?.isWeb3Object ?? false);
  const correctNet = useSelector((state) => state?.app?.isCorrectNet ?? false);
  const [amount, setAmount] = useState(0);
  const [claimable, setClaimable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const airdrop = async () => {
    try {
      const pairs = [{ key: walletAddress, value: amount }];
      const proof = createMerkleProof(pairs, 1);
      if (proof.result) {
        setLoading(true);
        setTitle("Claiming now...");
        await claimAirdrop(amount, proof.merkleProof[0]);
        setClaimable(await checkClaimAirdrop(walletAddress));
        setLoading(false);
        toast.success("Airdrop Successful.");
      } else {
        toast.error("Invalid Merkle Proof!");
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      toast.error("Airdrop failed.");
    }
  };

  const initData = async () => {
    setAmount(await readAirdropAmt(walletAddress));
    setClaimable(await checkClaimAirdrop(walletAddress));
  };
  useEffect(() => {
    if (config.airdropStatus) {
      let isSubscribed = true;
      if (isSubscribed && correctNet && web3Object) {
        initData();
      }
      return () => (isSubscribed = false);
    }
  }, [walletAddress, web3Object, correctNet]);

  return (
    <div className="flex flex-col justify-center pt-16 items-center space-y-4 pb-32 w-full">
      {config.airdropStatus ? (
        amount > 0 && claimable ? (
          <>
            <CustomText
              align="center"
              className="text-3xl sm:text-tit"
              bold="bold"
            >
              Your wallet is eligible for <br /> a Liz Coin Airdrop
            </CustomText>
            <CustomText size="xl" align="center" color="white" bold="bold">
              {amount}
              {" $LIZ"}
            </CustomText>
            <CustomText
              align="center"
              color="white"
              transparent
              className="w-full text-baseft"
            >
              This is Airdrop #1. <br />
              Click the below button to claim your airdrop.
            </CustomText>
            <div className="w-full">
              <button
                onClick={airdrop}
                className=" border-solid border rounded-md border-btncolor bg-btncolor py-3 px-2"
              >
                <CustomText align="center" className="text-baseft" bold="bold">
                  Claim Airdrop
                </CustomText>
              </button>
            </div>
          </>
        ) : (
          <>
            <CustomText size="xl" align="center" className="pt-20" bold="bold">
              You have no unclaimed airdrops
            </CustomText>
            <CustomText
              align="center"
              color="white"
              transparent
              className="w-full pb-2 text-baseft"
            >
              This is Airdrop #1. <br />
            </CustomText>
            <button
              // onClick={airdrop}
              className=" border-solid border rounded-md border-btncolor bg-btncolor py-3 px-2"
            >
              <Link to="/home">
                <CustomText align="center" className="text-baseft" bold="bold">
                  View Dashboard
                </CustomText>
              </Link>
            </button>
          </>
        )
      ) : (
        <div className="flex flex-col justify-center items-center space-y-4 pb-36">
          <div className="py-16">
            <CustomText size="3xl" align="center" className="pt-20" bold="bold">
              Airdrop is not available.
            </CustomText>
          </div>
          <button className=" border-solid border rounded-md border-btncolor bg-btncolor py-3 px-2">
            <Link to="/home">
              <CustomText align="center" className="text-baseft" bold="bold">
                View Dashboard
              </CustomText>
            </Link>
          </button>
        </div>
      )}
      <Loader statusTitle={title} isLoading={loading} />
    </div>
  );
}
