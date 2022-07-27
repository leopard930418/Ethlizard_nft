import LIZStaking from "constant/abis/LIZStaking.json";
import LIZCOIN from "constant/abis/LIZCOIN.json";
import Ethlizards from "constant/abis/Ethlizards.json";
import OGEthlizards from "constant/abis/OGEthlizards.json";
import BurnClaim from "constant/abis/BurnClaim.json";

export const getCoinbase = async () => {
    //  Get Accounts
    const accounts = await window.web3Object.eth.getAccounts();
    return accounts.length > 0 ? accounts[0] : ""
}
// Function to get Contract
export const getContract = async (key) => {
    let ABI, address
    if (key === "LIZStaking") {
        ABI = LIZStaking.abi
        address = LIZStaking.contractAddress
    } else if (key === "LIZCOIN") {
        ABI = LIZCOIN.abi
        address = LIZCOIN.contractAddress
    } else if (key === "Ethlizards") {
        ABI = Ethlizards.abi
        address = Ethlizards.contractAddress
    } else if (key === "OGEthlizards") {
        ABI = OGEthlizards.abi
        address = OGEthlizards.contractAddress
    } else if (key === "BurnClaim") {
        ABI = BurnClaim.abi
        address = BurnClaim.contractAddress
    }
    
    let contract = new window.web3Object.eth.Contract(ABI, address, {from: await getCoinbase()})
    return contract;
}

class LIZCOINContract {
    constructor() {
        LIZCOIN.callFunctions.forEach(fn_name => {
            this[fn_name] = async function(...args) {
                let contract = await getContract("LIZCOIN")
                return (await contract?.methods[fn_name](...args).call())
            }
        });

        LIZCOIN.transactionFunctions.forEach(fn_name => {
            this[fn_name] = async function(...args) {
                let contract = await getContract("LIZCOIN")
                const estimateGasPrice = await window.web3Object.eth.getGasPrice();
                return (await contract?.methods[fn_name](...args).send({
                    from: await getCoinbase(),
                    gasPrice: parseInt(estimateGasPrice * 1.3),
                }))
            }
        })
    }
}

class LIZStakingContract {
    constructor() {
        LIZStaking.callFunctions.forEach(fn_name => {
            this[fn_name] = async function(...args) {
                let contract = await getContract("LIZStaking")
                return (await contract?.methods[fn_name](...args).call())
            }
        });

        LIZStaking.transactionFunctions.forEach(fn_name => {
            this[fn_name] = async function(...args) {
                let contract = await getContract("LIZStaking")
                const estimateGasPrice = await window.web3Object.eth.getGasPrice();
                return (await contract?.methods[fn_name](...args).send({
                    from: await getCoinbase(),
                    gasPrice: parseInt(estimateGasPrice * 1.3),
                }))
            }
        })
    }
}

class EthlizardsContract {
    constructor() {
        Ethlizards.callFunctions.forEach(fn_name => {
            this[fn_name] = async function(...args) {
                let contract = await getContract("Ethlizards")
                return (await contract?.methods[fn_name](...args).call())
            }
        });

        Ethlizards.transactionFunctions.forEach(fn_name => {
            this[fn_name] = async function(...args) {
                let contract = await getContract("Ethlizards")
                const estimateGasPrice = await window.web3Object.eth.getGasPrice();
                return (await contract?.methods[fn_name](...args).send({
                    from: await getCoinbase(),
                    gasPrice: parseInt(estimateGasPrice * 1.3),
                }))
            }
        })
    }
}

class OGEthlizardsContract {
    constructor() {
        OGEthlizards.callFunctions.forEach(fn_name => {
            this[fn_name] = async function(...args) {
                let contract = await getContract("OGEthlizards")
                return (await contract?.methods[fn_name](...args).call())
            }
        });

        OGEthlizards.transactionFunctions.forEach(fn_name => {
            this[fn_name] = async function(...args) {
                let contract = await getContract("OGEthlizards")
                const estimateGasPrice = await window.web3Object.eth.getGasPrice();
                return (await contract?.methods[fn_name](...args).send({
                    from: await getCoinbase(),
                    gasPrice: parseInt(estimateGasPrice * 1.3),
                }))
            }
        })
    }
}

class BurnClaimContract {
    constructor() {
        BurnClaim.callFunctions.forEach(fn_name => {
            this[fn_name] = async function(...args) {
                let contract = await getContract("BurnClaim")
                return (await contract?.methods[fn_name](...args).call())
            }
        });

        BurnClaim.transactionFunctions.forEach(fn_name => {
            this[fn_name] = async function(...args) {
                let contract = await getContract("BurnClaim")
                const estimateGasPrice = await window.web3Object.eth.getGasPrice();
                return (await contract?.methods[fn_name](...args).send({
                    from: await getCoinbase(),
                    gasPrice: parseInt(estimateGasPrice * 1.3),
                }))
            }
        })
    }
}

window.lizStaking = new LIZStakingContract()
window.lizCoin= new LIZCOINContract()
window.ethlizards = new EthlizardsContract()
window.ogEthlizards = new OGEthlizardsContract()
window.burnClaim = new BurnClaimContract()