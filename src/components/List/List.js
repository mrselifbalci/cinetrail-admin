import React, { useMemo, useEffect, useState } from "react";
import axios from "axios";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { BsArrowUpDown } from "react-icons/bs";
import { BsFillEyeFill, BsPencilSquare, BsFillTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { COLUMNS } from "./ListTableData";
import "../../styles/table.css";
import "../../styles/list.css";
import swal from "sweetalert";
Modal.setAppElement("#root");

export default function List({ apiBaseUrl }) {
  const [data, setData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalPost, setModalPost] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [block, setBlock] = useState(false);
  const [reasonBlock, setReasonBlock] = useState("");
  // const [limits, setLimits] = useState(10);
  // const [pages, setPages] = useState(3);
  
  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    if (e.target.value === "false") {
      setBlock(true);
    } else {
      setBlock("");
    }
    setIsActive(e.target.value);
  };
  const handleSubmit = (listId) => {
    const updatedList = {
      isActive,
      
    };
    axios
      .put(`${apiBaseUrl}/lists/${listId}`, updatedList)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
    setModalIsOpen(false);
  };
  const editList = async (listId) => {
    await axios
      .get(`${apiBaseUrl}/lists/${listId}`)
      .then((res) => {
        setModalPost(res.data.response[0]);
        setIsActive(res.data.response[0].isActive);
        setReasonBlock(res.data.response[0].reasonToBlock);
      })
      .catch((err) => {
        console.log(err);
      });
    setModalIsOpen(true);
  };
  const deleteList = (listId) => {
    swal("Are you sure you want to do this?", {
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`${apiBaseUrl}/lists/${listId}`)
          .then((res) => {
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
        swal("Poof! it has been deleted!", {
          icon: "success",
        });
      }
    });
  };
  useEffect(() => {
      axios.get(`${apiBaseUrl}/lists`)
      // axios.get(`${apiBaseUrl}/lists?limit=${limits}&page=${pages}`)
      .then((res) => {
        setData(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const columns = useMemo(() => COLUMNS, []);
  const trailers = useMemo(() => data, []);
  useTable({
    columns: columns,
    data: trailers,
  });
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const { globalFilter, pageIndex, pageSize } = state;
  return (
    <div className="trailer-component-wrapper ">
      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          className="list-modal-content"
          overlayClassName="list-modal-overlay"
        >
          <div className="modal-container">
            <p
              className="list-close-modal-x"
              onClick={() => setModalIsOpen(false)}
            >
              X
            </p>
            <h1>Block or Unblock the list.</h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(modalPost._id);
              }}
              className="list-modal-form"
            >
              <div>
                <select
                  className="change-list-active"
                  value={isActive}
                  onChange={handleChange}
                >
                  <option value="true">Active</option>
                  <option value="false">Block</option>
                </select>
              </div>
              {block ? (
                <div className="block-reason">
                  <label> Reason to block message</label>
                  <input
                    className="blockMessage"
                    value={reasonBlock}
                    type="text"
                    onChange={(e) => setReasonBlock(e.target.value)}
                  />
                </div>
              ) : (
                ""
              )}
              <div className="list-update-button-container">
                <button
                  className="list-update-button submit-button"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
      <div className="table-container">
        <h1 className="table-title">Lists</h1>
        <hr className="hr-table" />
        <div className="table-show-search-wrapper">
          <div className="table-show-bar">
            <p>Show&nbsp;</p>{" "}
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[5, 10, 15].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
            &nbsp; <p>entries</p>
          </div>
          <div className="table-search-bar">
            <p>Search:&nbsp;&nbsp;</p>
            <input
              value={globalFilter || ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
          </div>
        </div>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {/* <th></th> */}
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    <div className="table-sort-icon-container">
                      <div>{column.render("Header")}</div>
                      <div className="table-sort-icon">
                        <BsArrowUpDown />
                      </div>
                    </div>
                  </th>
                ))}
                <th>ACTION</th>
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr className="table-row-wrapper" {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                  <td className="table-action-icons-wrapper">
                    <Link to={`/listdetails/${row.original._id}`}>
                      <BsFillEyeFill
                        to={`/listdetails/${row.original._id}`}
                        className="table-view-icon action-icons"
                      />
                      &nbsp;
                    </Link>
                    <BsPencilSquare
                      className="table-edit-icon action-icons"
                      onClick={() => {
                        editList(row.original._id);
                      }}
                    />
                    &nbsp;
                    <BsFillTrashFill
                      className="table-delete-icon action-icons"
                      onClick={() => {
                        deleteList(row.original._id);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="table-button-container">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {"<<"}
          </button>
          <button
            className="table-page-nav"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            Previous
          </button>
          <div className="table-current-page">{pageIndex + 1}</div>
          <button
            className="table-page-nav"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            Next
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </button>
        </div>
      </div>
    </div>
  );
}