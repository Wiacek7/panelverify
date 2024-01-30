import { React, useState } from "react";
import { useContractRead, useNetwork, useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi';
import ProjectContractInterface from '../contracts/abi/Project.json';

export const Table = ({ project }) => {
  const { chain, chains } = useNetwork()
  const [showAndHide, setShowAndHide] = useState(true);

  const projectContractConfig = {
    address: project?.id,
    abi: ProjectContractInterface,
  };
  //==================read functiuons=============
  const { data: isRevealed } = useContractRead({
    ...projectContractConfig,
    functionName: 'isRevealed',
  });

  const { data: isVerified } = useContractRead({
    ...projectContractConfig,
    functionName: 'isVerified',
  });

  const { data: filterTags } = useContractRead({
    ...projectContractConfig,
    functionName: 'filterTags',
  });

  const {
    config: verifyProjectConfig,
    error: verifyProjectConfigError,
    isError: isVerifyProjectConfigError,
  } = usePrepareContractWrite({
    ...projectContractConfig,
    functionName: 'setVerification',
    args: [
      true
    ],
  });

  const {
    data: verifyProjectReturnData,
    write: setVerification,
    error: verifyProjectError,
  } = useContractWrite(verifyProjectConfig);

  const {
    config: showProjectConfig,
    error: showProjectConfigError,
    isError: isShowProjectConfigError,
  } = usePrepareContractWrite({
    ...projectContractConfig,
    functionName: 'setVisibility',
    args: [
      showAndHide
    ],
  });

  const {
    data: showProjectReturnData,
    write: setVisibility,
    error: showProjectError,
    isSuccess
  } = useContractWrite(showProjectConfig);

  const setVerify = () => {
    setVerification?.();
  }

  const setShow = () => {
    setVisibility?.();
    console.log("object")
    if(isSuccess && showAndHide === true){
      setShowAndHide(false);
    }else if(isSuccess && showAndHide === false){
      setShowAndHide(true);
    }
  }

  return (
    <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
        <div className="bg-green-200 p-2 rounded-full mr-2 hidden md:block">
          <img
            src="./assets/icons/arrow.svg"
            className="  w-5 h-5"
            alt=""
          />
        </div>
        <span>{project?.creator?.slice(0, 15)}...</span>
      </td>
      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {project?.desc.slice(0, 30)}...
      </td>
      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {filterTags}
      </td>
      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {chain?.nativeCurrency.symbol}
      </td>

      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {project?.noOfContributors}
      </td>
      {isVerified ?
        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          <span className="bg-[#ECFBE6] text-[#3BB900] rounded-md py-1  font-bold px-2">
            Verified
          </span>
        </td> :
        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          <span className="bg-[#ECFBE6] text-[#000000] rounded-md py-1  font-bold px-2">
            UnVerified
          </span>
        </td>}

      <td class="text-sm  font-light px-6 py-4 whitespace-nowrap">
        <button
          disabled={isVerified ? true : false}
          onClick={
            setVerify
          }
          className="bg-[#1A75FF] bg-Chinese-Blue text-blue w-full sm:w-auto text-Pure-White rounded-4xl py-1 px-2.5 font-medium "
        >
          setVerify
        </button>
      </td>

      {isRevealed ?
        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          <span className="bg-[#ECFBE6] text-[#3BB900] rounded-md py-1  font-bold px-2">
            Revealed
          </span>
        </td> :
        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          <span className="bg-[#ECFBE6] text-[#000000] rounded-md py-1  font-bold px-2">
            UnRevealed
          </span>
        </td>}


      <td class="text-sm  font-light px-6 py-4 whitespace-nowrap">
        <button
          disabled={isVerified ? true : false}
          onClick={() => {
            setShow();
          }}
          className="bg-[#1A75FF] bg-Chinese-Blue text-blue w-full sm:w-auto text-Pure-White rounded-4xl py-1 px-2.5 font-medium "
        >
          {showAndHide ? "setShow" : "setHide"}
        </button>
      </td>

    </tr>
  );
};
export default Table;



