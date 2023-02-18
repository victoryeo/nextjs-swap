import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useSelector } from "react-redux";
import { getWethGwContract, getDaiContract, getLPContract } from "../../utils/web3Utils";
import { selectSigner } from "../../redux/selectors"
import { selectUserAddress } from "../../redux/selectors/user";
import contracts from "../../config/constants/contracts";
import styles from "./Aave.module.css";

const tokenList = [
  {
    heading: 'ETH',
    balance: 10,
    rate: '<0.01%',
    collateral: 'yes'
  },
  {
    heading: 'DAI',
    balance: 20,
    rate: '<0.01%',
    collateral: 'yes'
  },
];

let contractWETH: ethers.Contract;
let contractDAI: ethers.Contract;
let contractLP: ethers.Contract;
let account: string;

const handleClick = async (token) => {
  alert("supply "+token)
  const overrides = { gasLimit: 1000000, gasPrice: 210000 };
  if (token === "DAI") {
    console.log("supply DAI")
    // approve
    const approval = await contractDAI.approve(
      contracts.LENDING_POOL[5],
      1 /* 1wei */
    );
    await approval.wait();

    const daiAddr = contracts.DAI_CONTRACT[5];
    const newSupply = await contractLP.supply(
      daiAddr,
      1 /* 1wei */,
      account,
      0, // referralCode -- set to 0
      overrides
    );
    console.log(newSupply);
    const res = await newSupply.wait();
    console.log(res)
  } else if (token === "ETH") {
    console.log("supply ETH")
    console.log(account)
    const ethOverrides = { ...overrides, value: 1 /* 1wei */ };
    const newSupply = await contractWETH.depositETH(
      contracts.LENDING_POOL[5],
      account,
      0, // referralCode
      ethOverrides
    );
    const res = await newSupply.wait();
    console.log(res);
  }
}

export const SupplyTokenList = () => {
  const buttonTextArray = ["Disable", "Supply"];
  const [buttonText, setButtonText] = useState("");

  account = useSelector(selectUserAddress);
  const signer = useSelector(selectSigner);
  contractWETH = getWethGwContract(signer);
  contractDAI = getDaiContract(signer);
  contractLP = getLPContract(signer);

  useEffect(() => {
    if (account == "" || account == null) {
      setButtonText(buttonTextArray[0]);
    } else {
      setButtonText(buttonTextArray[1]);
    }
  }, [account]);

  useEffect(() => {
    if (account == "" || account == null) {
      setButtonText(buttonTextArray[0]);
    } else {
      setButtonText(buttonTextArray[1]);
    }
  }, []);

  return(
    <div className={styles.tokenList}>
      {tokenList.map((e: any) => (
        <span className={styles.aaveblock}
          key={e.heading} >
          {e.heading} &nbsp;&nbsp;&nbsp; 
          {e.balance} &nbsp;&nbsp;&nbsp; 
          {e.rate} &nbsp;&nbsp;&nbsp; 
          {e.collateral} 
            <button className={buttonText==="Disable"?styles.disableButton:styles.supplyLiquidity} 
            onClick={()=>handleClick(e.heading)} 
            disabled={buttonText==="Disable"?true:false}>
            {buttonText}
          </button>
        </span>
      ))}
    </div>
  )
}