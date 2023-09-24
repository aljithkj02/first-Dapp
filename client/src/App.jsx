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

  useEffect(() => {
    getContract();
  }, [])

  const getContract = async () => {
    const res = await template();
    setState({ ...res });
    readData(res.contract);
  }

  const readData = async (contract) => {
    const data = await contract.methods.getter().call();
    // console.log({ data })
    
    setData(Number(data));  
  }

  const writeData = async () => {
    const { contract } = state;
    if(!value) return;

    const res = await contract.methods.setter(value).send({
      from: "0x692Dd4E491f9c87C186c990aa6D018D051c4806b"
    });
    // console.log({ res })
    readData(state.contract);
    setValue("");
  }

  const handleChange = (e) => {
    setValue(e.target.value);
  }
  
  return (
    <>
      <h1>Block chain</h1>
      <h2>Contract Data: <span>{ data } </span></h2>
      <div>
        <input type='number' placeholder='Enter value' value={ value } onChange={ handleChange } /> 
        <button onClick={writeData}>Confirm</button>
      </div>
    </>
  )
}

export default App
