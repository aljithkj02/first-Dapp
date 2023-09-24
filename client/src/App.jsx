import { useEffect, useState } from 'react'
import './App.css'
import { template } from './utils/template';

function App() {
  const [state, setState] = useState({
    web3: null,
    contract: null
  })
  const [data, setData] = useState('Nil');
  const [value, setValue] = useState('');
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(0);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    getContract();
  }, [])

  const getContract = async () => {
    const res = await template();
    setState({ ...res });
    readData(res.contract);
    getAccounts(res.web3);
  }

  const readData = async (contract) => {
    const data = await contract.methods.getter().call();
    // console.log({ data })
    
    setData(Number(data));  
  }

  const writeData = async () => {
    const { contract } = state;
    if(!value) return;

    setLoad(true);
    try {
      const res = await contract.methods.setter(20).send({
        from: account,
        gas: 2000000,
      });
      console.log({ res })
      readData(state.contract);
      setValue("");
    } catch (error) {
      console.log({ error })
    } finally {
      setLoad(false);
    }
  }

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const getAccounts = async (web3) => {
    const accounts  = await web3.eth.getAccounts();
    accounts[0] && setAccount(accounts[0]);
    getBalance(web3, accounts[0]);
  }

  const getBalance = async (web3, account) => {
    const balance = await web3.eth.getBalance(account);
    const ethBalance = web3.utils.fromWei(balance.toString(), "ether");
    setBalance(ethBalance);
  }
  
  return (
    <>
      <div>
        <p>Balance: { balance }</p>
      </div>
      <h1>Block chain</h1>
      <h2>Contract Data: <span>{ data } </span></h2>
      <div>
        <input type='number' placeholder='Enter value' value={ value } onChange={ handleChange } /> 
        <button onClick={writeData}>Confirm</button>
      </div>
      {load && <h3>Loading...</h3>}
    </>
  )
}

export default App
