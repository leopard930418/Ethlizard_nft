import { config } from "constant";
import Ethlizards from "constant/abis/Ethlizards.json";
import axios from "axios";

import MerkleTree from "merkletreejs";
import keccak256 from "keccak256";
import { utils } from "ethers";

let daysWeights;
let daysWeightNodes;
let airDrops;
let airDropNodes;
let burnClaims;
let burnClaimNodes;

const headers = {
  "X-API-Key":
    "FJYKIAFaUxMRRfNit5TFANGZAMuw6ihqY1Vd2JyGdwxp8XsQQbAo3sKoMcS0aDO4",
};

export const getGasPrice = async () => {
  const price = await window.web3Object.eth.getGasPrice();
  return price;
};
//for dashboarad
export const getVETHBalance = async () => {
  const balance = await axios.get(config.vaultEthAPI, { headers });
  return balance.data.balance / config.decimal;
};

export const getVWETHBalance = async () => {
  const balance = await axios.get(config.vaultWEthAPI, { headers });
  return balance.data[0].balance / config.decimal;
};

export const getVUSDBalance = async () => {
  const balanceT = await axios.get(config.vaultUSDTAPI, { headers });
  const balanceC = await axios.get(config.vaultUSDCAPI, { headers });
  return (+balanceT.data[0].balance + +balanceC.data[0].balance) / 10 ** 6;
};

export const modifyScale = (history) => {
  const avg =
    history.reduce((sum, curr) => {
      return sum + curr.price;
    }, 0) / history.length;
  let newData = history.map(function (value) {
    return { price: value.price - avg + 0.001 };
  });
  newData[newData.length - 1].price += 0.00001;
  return newData;
};

//get rate
export const getPriceRate = (data) => {
  const first = data[0][1];
  const last = data[data.length - 1][1];
  const rate = ((last - first) / first) * 100;
  return rate;
};

export const getFloorRate = (data) => {
  const first = data[0].price;
  const last = data[data.length - 1].price;
  const rate = ((last - first) / first) * 100;
  return rate;
};

export const getStakedEthLizardsAmount = async () => {
  const amt = await window.lizStaking.getLizardsStaked();
  return amt;
};

export const getStakedGenLizardsAmount = async () => {
  const amt = await window.lizStaking.getGenesisStaked();
  return amt;
};

export const rewardsPeriod = async () => {
  const period = await window.lizStaking.rewardsPeriod();
  const start = new Date(period.start * 1000);
  const end = new Date(period.end * 1000);
  const result = { start: start, end: end };
  return result;
};

export const getTotalEmitted = async () => {
  const value = await window.lizStaking.getLizEmitted();
  return value / config.decimal;
};

export const getTotalSupplyOfLiz = async () => {
  const value = await window.lizCoin.totalSupply();
  return value / config.decimal;
};

//for council data
export const loadCouncilData = async (dispatch) => {
  fetch(config.investDataAPI).then((response) => {
    response.json().then((jsonData) => {
      dispatch({
        type: "SET_DATA",
        payload: (prev = {}) => ({
          ...(prev ?? {}),
          cData: jsonData,
        }),
      });
    });
  });
};

export const getTotalInvestedEther = async (data) => {
  var eth = 0;
  for (var inv of data) {
    if (!inv.invest.is_usd) {
      eth += inv.invest.amount;
    }
  }
  return eth;
};

export const getTotalInvestedUSDC = async (data) => {
  var usdc = 0;
  for (var inv of data) {
    if (inv.invest.is_usd) {
      usdc += inv.invest.amount;
    }
  }
  return usdc;
};

//reward page
export const getRewardsPerWeight = async () => {
  const rewards = await window.lizStaking.rewardsPerWeight();
  return rewards;
};

export const lizBalance = async (acc) => {
  const balance = await window.lizCoin.balanceOf(acc);
  return balance / config.decimal;
};

export const getUnclaimedRewards = async (acc) => {
  const reward = await window.lizStaking.checkUserRewards(acc);
  return reward / config.decimal;
};

export const claimReward = async () => {
  await window.lizStaking.claim();
};

export const getReward = async (acc) => {
  const reward = await window.lizStaking.rewards(acc);
  return reward;
};

export const getStakedLizards = async (acc) => {
  var ethLizards = [];
  var gLizards = [];

  const lizardIds = await window.lizStaking.getStakedLizardsByAddress(acc);
  const lizards = await window.lizStaking.getMultiLizInfo(lizardIds);

  for (var i = 0; i < lizards.length; i++) {
    const lockTime = lizards[i].stakeUntil;
    var status;
    var unlockDays;
    if (lockTime < new Date().getTime() / 1000) {
      status = 1;
      unlockDays = 0;
    } else {
      status = 2;
      unlockDays =
        parseInt((lockTime - new Date().getTime() / 1000) / 86400) + 1;
    }

    if (lizardIds[i] < 10000)
      ethLizards.push({
        tokenID: lizardIds[i],
        status: status,
        weight: +lizards[i].weight,
        unlockDays: unlockDays,
        isGenesis: false,
        isSelected: false,
      });
    else
      gLizards.push({
        tokenID: lizardIds[i],
        status: status,
        weight: +lizards[i].weight,
        unlockDays: unlockDays,
        isGenesis: true,
        isSelected: false,
      });
  }
  return { ethLizards: ethLizards, gLizards: gLizards };
};

// using Moralis
// export const getUnStakedEthLizards = async (acc) => {
//   var lizards = [];
//   var balance = await window.ethlizards.balanceOf(acc);
//   var cursor = "";
//   while(lizards.length != balance) {
//     for (var i = 0; i < (balance - 1) / 100 + 1; i++) {
//       const api = `https://deep-index.moralis.io/api/v2/${acc}/nft/${Ethlizards.contractAddress}?chain=rinkeby&format=decimal&cursor=${cursor}`;
//       // const api = `https://deep-index.moralis.io/api/v2/${acc}/nft/${Ethlizards.contractAddress}?chain=eth&format=decimal&cursor=${cursor}`

//       const resp = await axios.get(api, { headers });
//       cursor = resp.data.cursor;
//       const nfts = resp.data.result;
//       for (var j = nfts.length - 1; j >= 0; j--) {
//         lizards.push(nfts[j].token_id);
//       }
//     }
//   }
//   return lizards;
// };

export const getUnStakedEthLizards = async (acc) => {
  var lizards = [];
  const balance = await window.ethlizards.balanceOf(acc);
  for (var i = 0; i < balance; i++) {
    const id = await window.ethlizards.tokenOfOwnerByIndex(acc, i);
    lizards.push(id);
  }
  return lizards;
};

export const getUnStakedGLizards = async (acc) => {
  var lizards = [];
  lizards = await window.ogEthlizards.walletOfOwner(acc);
  return lizards;
};

export const getUnStakedLizards = async (acc) => {
  var lizards = [];
  const unStakedEthLizards = await getUnStakedEthLizards(acc);
  const unStakedGLizards = await getUnStakedGLizards(acc);
  for (var id of unStakedEthLizards) {
    const lizard = {
      tokenID: +id,
      isGenesis: false,
      status: 0,
      weight: +0,
      unlockDays: 0,
      isSelected: false,
    };
    lizards.push(lizard);
  }

  for (var id of unStakedGLizards) {
    const lizard = {
      tokenID: +id + 10000,
      isGenesis: true,
      status: 0,
      weight: +0,
      unlockDays: 0,
      isSelected: false,
    };
    lizards.push(lizard);
  }

  return lizards;
};

export const getStakingWeight = (lizards, weight) => {
  var wei = 0;
  for (var liz of lizards) {
    if (liz.isGenesis) wei += 2 * +weight;
    else wei += +weight;
  }
  return wei;
};

export const getLizardsData = async (acc, dispatch) => {
  var lizards = await getUnStakedLizards(acc);
  const stakedLizards = await getStakedLizards(acc);
  lizards = lizards.concat(stakedLizards.ethLizards);
  lizards = lizards.concat(stakedLizards.gLizards);
  dispatch({
    type: "SET_DATA",
    payload: (prev = {}) => ({
      ...(prev ?? {}),
      stakingLizards: lizards,
    }),
  });
  return lizards;
};

export const getWeightInfo = async () => {
  const data = await fetch("data/Days-Weights.json", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  daysWeights = await data.json();
  daysWeightNodes = daysWeights.map((x) =>
    utils.solidityKeccak256(["uint32", "uint256"], [x.Days, x.Weight])
  );
  return daysWeights;
};

export const stakeLizards = async (lizards, lockDays, weight, proof, dispatch) => {
  var lizTypes = [];
  var tokenIds = [];
  var daysLocked = [];
  var weights = [];
  var proofs = [];
  for (var lizard of lizards) {
    lizTypes.push(lizard.isGenesis);
    const id = lizard.tokenID > 10000 ? lizard.tokenID - 10000 : lizard.tokenID;
    tokenIds.push(id);
    daysLocked.push(lockDays);
    weights.push(weight);
    proofs.push(proof)
  }
  await window.lizStaking.stakeLizards(lizTypes, tokenIds, daysLocked, weights, proofs);
  dispatch({
    type: "SET_DATA",
    payload: (prev = {}) => ({
      ...(prev ?? {}),
      stakingLizards: -1,
    }),
  });

  dispatch({
    type: "SET_DATA",
    payload: (prev = {}) => ({
      ...(prev ?? {}),
      burnLizards: -1,
    }),
  });
};

export const unStakeLizards = async (lizards, dispatch) => {
  var lizTypes = [];
  var tokenIds = [];
  for (var lizard of lizards) {
    lizTypes.push(lizard.isGenesis);
    const id = lizard.tokenID > 10000 ? lizard.tokenID - 10000 : lizard.tokenID;
    tokenIds.push(id);
  }
  await window.lizStaking.unstake(lizTypes, tokenIds);
  dispatch({
    type: "SET_DATA",
    payload: (prev = {}) => ({
      ...(prev ?? {}),
      stakingLizards: -1,
    }),
  });

  dispatch({
    type: "SET_DATA",
    payload: (prev = {}) => ({
      ...(prev ?? {}),
      burnLizards: -1,
    }),
  });
};

export const readAirdropAmt = async (acc) => {
  const whiteList = await fetch("data/AirDrop.json", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  airDrops = await whiteList.json();
  airDropNodes = airDrops.map((x) =>
    utils.solidityKeccak256(["address", "uint256"], [x.address, x.amount])
  );
  var index = airDrops
    .map(function (item) {
      return item.address.toLowerCase();
    })
    .indexOf(acc.toLowerCase());

  if (index == -1) {
    return 0;
  } else {
    return airDrops[index].amount;
  }
};

export const readBurnClaimData = async () => {
  const jsondata = await fetch("data/BurnClaim.json", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  burnClaims = await jsondata.json();
  burnClaimNodes = burnClaims.map((x) =>
    utils.solidityKeccak256(
      ["uint256", "uint256"],
      [x.TokenId, x.BurnClaimAmount]
    )
  );
  return burnClaims;
};

export const getUnStakedLizardsWithBurn = async (acc, dispatch) => {
  const unStakedEthLizards = await getUnStakedEthLizards(acc);
  const unStakedGLizards = await getUnStakedGLizards(acc);
  const burnList = await readBurnClaimData();
  var lizards = [];
  for (var id of unStakedEthLizards) {
    const lizard = {
      tokenID: +id,
      isGenesis: false,
      isSelected: false,
      burnFor: +burnList[+id].BurnClaimAmount,
    };
    lizards.push(lizard);
  }

  for (var id of unStakedGLizards) {
    const lizard = {
      tokenID: +id + 10000,
      isGenesis: true,
      isSelected: false,
      burnFor: +burnList[+id + 5050].BurnClaimAmount,
    };
    lizards.push(lizard);
  }

  dispatch({
    type: "SET_DATA",
    payload: (prev = {}) => ({
      ...(prev ?? {}),
      burnLizards: lizards,
    }),
  });

  dispatch({
    type: "SET_DATA",
    payload: (prev = {}) => ({
      ...(prev ?? {}),
      stakingLizards: -1,
    }),
  });
  return lizards;
};

export const burnLizards = async (lizards, proof, dispatch) => {
  var ids = [];
  var amounts = [];
  for (var lizard of lizards) {
    ids.push(lizard.tokenID);
    amounts.push(lizard.burnFor);
  }
  await window.burnClaim._burnClaimMulti(ids, amounts, proof);
  dispatch({
    type: "SET_DATA",
    payload: (prev = {}) => ({
      ...(prev ?? {}),
      burnLizards: -1,
    }),
  });
};

export const checkClaimAirdrop = async (acc) => {
  const value = await window.lizCoin.lizCoin1Minted(acc);
  return value == 0;
};

export const claimAirdrop = async (amount, merkleProof) => {
  await window.lizCoin.claim1(amount, merkleProof);
};

//merkle tree
export const createMerkleProof = (pairs, type) => {
  let leaves = [];
  let merkleTree;
  let userProofs = [];
  if (type == 1) {
    merkleTree = new MerkleTree(airDropNodes, keccak256, { sortPairs: true });
    for (var pair of pairs) {
      const leaf = utils.solidityKeccak256(["address", "uint256"], [pair.key, pair.value]);
      leaves.push(leaf)
    }
  } else if (type == 2) {
    merkleTree = new MerkleTree(burnClaimNodes, keccak256, { sortPairs: true });
    for (var pair of pairs) {
      const leaf = utils.solidityKeccak256(["uint256", "uint256"], [pair.key, pair.value]);
      leaves.push(leaf)
    }
  } else {
    merkleTree = new MerkleTree(daysWeightNodes, keccak256, {
      sortPairs: true,
    });
    for (var pair of pairs) {
      const leaf = utils.solidityKeccak256(["uint32", "uint256"], [pair.key, pair.value]);
      leaves.push(leaf)
    }
  }
  const rootHash = merkleTree.getRoot();
  console.log(merkleTree.getHexRoot(), "rootHash")
  let proof
  for (var leaf of leaves) {
    const hexProof = merkleTree.getHexProof(leaf);
    userProofs.push(hexProof)
    proof = merkleTree.verify(hexProof, leaf, rootHash)
    if (!proof) break;
  }
  return {merkleProof: userProofs, result: proof}
};
