import { ethers } from 'ethers'
import contracts from '../config/constants/contracts'
import { weth_gw_abi } from '../config/abi/WethGateway'

const getContract = (abi: any, address: string, signer: ethers.providers.Provider | ethers.Signer) => {
  const contract = new ethers.Contract(address, abi, signer)
  return contract
}

export const getWethGwContract = (signer: ethers.providers.Provider | ethers.Signer): ethers.Contract => {
  console.log("getWethGwContract", signer)
  return getContract(weth_gw_abi, contracts.WETH_GATEWAY[5], signer)
}
