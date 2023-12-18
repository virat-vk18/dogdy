import React from "react";
import { useGetUserListQuery } from "./userListApi";
import DataTable from "react-data-table-component";

const UserList = () => {
  const {
    data: userLists,
    isSuccess,
    isError,
    isLoading,
    error,
  } = useGetUserListQuery();

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
    const getUserData = userLists?.getUser;
    content = (
      <div>
        <DataTable
          className="dataTable"
          title="Users_Lists"
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

export default UserList;
