import { Web3 } from 'web3'
import SimpleStorage from '../contracts/SimpleStorage.json'

export const template = async () => {
    try {
        let web3;

        if(window.ethereum) {
            web3           = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else {
            // const provider = new Web3.providers.HttpProvider('https://eth-sepolia.g.alchemy.com/v2/vBB7s2QPOETHQ75XO9eoUIXjaZXApb7z');
            // web3           = new Web3(provider);
        }
        
        const networkid = await web3.eth.net.getId();
        const deployedNetwork = SimpleStorage.networks[networkid];

        // console.log({ deployedNetwork, networkid })

        // To interact with a smart contract we require two things
        // 1. ABI
        // 2. Contract address

        // Create an instance of our contract with whom we are going to make an interaction
        const contract = new web3.eth.Contract(SimpleStorage.abi, deployedNetwork.address);
        // console.log({ contract })

        return { web3, contract };
    } catch (error) {
        console.log({error})
    }
}