import React from "react";
import DataTable from "react-data-table-component";
import { useGetNftBuyersQuery } from "../nftListApi";

const NftBuyers = () => {
  const {
    data: nftBuyers,
    isSuccess,
    isError,
    isLoading,
    error,
  } = useGetNftBuyersQuery();

  const columns = [
    {
      id: 0,
      name: "S.no",
      selector: (row, index) => index + 1,
      sortable: true,
      reorder: true,
    },
    {
      id: 1,
      name: "Account Address",
      selector: (row) => row.address,
      sortable: true,
      reorder: true,
    },
    {
      id: 2,
      name: "Account Balance",
      selector: (row) => row.accountbalance,
      sortable: true,
      reorder: true,
    },
  ];

  let content;

  //   Loading status
  if (isLoading) {
    content = <p className="loadingData col-12">Your Data Loading...</p>;
  }
  //   Succuess Status
  else if (isSuccess) {
    const getUserData = nftBuyers.getNftBuyersList;

    console.log(getUserData);
    content = (
      <div>
        <DataTable
          className="dataTable"
          title="NFT BUYERS LIST"
          columns={columns}
          data={getUserData}
          defaultSortFieldId={1}
          pagination
        />
      </div>
    );
  }
  //   Error Status
  else if (isError) {
    content = <p>{error}</p>;
  }

  return <>{content} </>;
};

export default NftBuyers;
