import { Web3 } from 'web3'
import SimpleStorage from '../contracts/SimpleStorage.json'

export const template = async () => {
    try {
        const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
        
        const web3 = new Web3(provider);
        // console.log({ web3 })

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