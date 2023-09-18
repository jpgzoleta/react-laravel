import { useTable } from "react-table";
import { useEffect, useMemo, useState } from "react";
import { ActionButton } from "../Buttons";
import { UserForm } from "../Forms";
import { Pencil, Trash } from "@phosphor-icons/react";
import classNames from "classnames";
// import ReactPaginate from "react-paginate";
import React from "react";
// import usePaginate from "../../hooks/usePaginate";
import { Modal, Confirmation } from "../Modals";
import { StatusBadge } from "../Misc";
import useSWR from "swr";
import axios from "axios";
import toast from "react-hot-toast";

const fetcher = (url) =>
    axios
        .get(url, {
            headers: {
                Authorization: "EBd0JOSDB64s8udwNDrSobA1VV1A99dr1wtAbh3oMbk=",
                // "content-type": "application/json",
            },
        })
        .then((res) => res.data);

export default function UserTable() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [toEditData, setToEditData] = useState(null);
    const [toDeleteId, setToDeleteId] = useState(null);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [docs, setDocs] = useState([]);

    const { data, error, mutate } = useSWR(
        "http://10.101.96.224/users/show",
        fetcher
    );

    useEffect(() => {
        if (data && data?.length) {
            setDocs(data);
        }
    }, [data]);

    // useEffect(() => {
    //   axios
    //     .get("http://10.101.96.224/users/show", {
    //       headers: {
    //         Authorization: "EBd0JOSDB64s8udwNDrSobA1VV1A99dr1wtAbh3oMbk=",
    //         "content-type": "application/json",
    //       },
    //     })
    //     .then((res) => setDocs(res.data))
    //     .catch((error) => console.log(error));
    // }, []);

    const columns = useMemo(
        () => [
            {
                Header: "ID",
                accessor: "id",
            },
            {
                Header: "Name",
                accessor: "name",
            },
            {
                Header: "Email",
                accessor: "email",
            },
            {
                Header: "Password",
                accessor: "password",
            },
            {
                Header: "Contact No.",
                accessor: "contact_no",
            },
            {
                Header: "User Group",
                accessor: "group_name",
            },
            {
                Header: () => null,
                id: "actions",
                Cell: ({ cell }) => (
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center justify-center gap-3"
                    >
                        <ActionButton
                            icon={<Pencil size={16} className="text-white" />}
                            buttonColor="#3b82f6"
                            toolTipId="edit"
                            toolTipContent="Edit"
                            onClick={() => {
                                setToEditData(cell.row.original);
                                setIsModalOpen(true);
                            }}
                        />
                        <ActionButton
                            icon={<Trash size={16} className="text-white" />}
                            buttonColor="#ef4444"
                            toolTipId="delete"
                            toolTipContent="Delete"
                            onClick={() => {
                                setToDeleteId(cell.row.original.id);
                                setIsConfirmationOpen(true);
                            }}
                        />
                    </div>
                ),
            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        visibleColumns,
    } = useTable({ columns, data: docs });

    console.log("Data ----", toEditData);

    function handleDelete() {
        axios
            .delete(`http://10.101.96.224/users/${toDeleteId}/delete`, {
                headers: {
                    Authorization:
                        "EBd0JOSDB64s8udwNDrSobA1VV1A99dr1wtAbh3oMbk=",
                },
            })
            .then((res) => {
                toast.success(res?.data?.message), mutate();
            })
            .catch((error) => console.log(error));
    }

    return (
        <div>
            <Confirmation
                isOpen={isConfirmationOpen}
                label="Delete User?"
                message={`User ${toDeleteId} will be gone forever!`}
                onCancel={() => setIsConfirmationOpen(false)}
                onConfirm={() => {
                    handleDelete();
                    setIsConfirmationOpen(false);
                    setToDeleteId("");
                }}
            />
            <Modal
                label={"Edit User"}
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                }}
            >
                <UserForm
                    user={toEditData}
                    onCancel={() => {
                        setToEditData(null);
                        setIsModalOpen(false);
                    }}
                    onAfterSubmit={mutate}
                />
            </Modal>
            <div
                // autoHeight
                // autoHide
                className="flex flex-col gap-4 overflow-x-auto rounded-t-md"
            >
                {docs && docs?.length ? (
                    <table {...getTableProps()} className="w-full">
                        <thead className="px-4 py-3 text-left font-display text-sm font-semibold">
                            {headerGroups.map((headerGroup, index) => (
                                <tr
                                    key={index}
                                    {...headerGroup.getHeaderGroupProps()}
                                    // className="border-b border-gray-300"
                                >
                                    {headerGroup.headers.map(
                                        (column, index) => (
                                            <th
                                                key={index}
                                                {...column.getHeaderProps()}
                                                className={classNames(
                                                    "my-2 border-r border-gray-300 bg-gray-200 px-4 py-3 last:border-0",
                                                    {
                                                        "text-center":
                                                            index == 0,
                                                    }
                                                )}
                                            >
                                                {column.render("Header")}
                                            </th>
                                        )
                                    )}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {rows.map((row, index) => {
                                prepareRow(row);
                                return (
                                    <React.Fragment key={row.original._id}>
                                        <tr
                                            // key={row.original._id}
                                            {...row.getRowProps()}
                                            className={classNames(
                                                "cursor-pointer border-y border-gray-200 transition-colors hover:bg-blue-100"
                                            )}
                                        >
                                            {row.cells.map((cell, index) => {
                                                if (
                                                    cell.column.Header ==
                                                    "Status"
                                                ) {
                                                    return (
                                                        <td
                                                            key={index}
                                                            {...cell.getCellProps()}
                                                            className={classNames(
                                                                "p-4"
                                                            )}
                                                        >
                                                            <StatusBadge
                                                                status={
                                                                    cell.value
                                                                }
                                                            />
                                                        </td>
                                                    );
                                                } else {
                                                    return (
                                                        <td
                                                            key={index}
                                                            {...cell.getCellProps()}
                                                            className={classNames(
                                                                "p-4",
                                                                {
                                                                    "whitespace-nowrap text-center font-semibold uppercase":
                                                                        index ==
                                                                        0,
                                                                    "min-w-[200px]":
                                                                        index ==
                                                                            1 ||
                                                                        index ==
                                                                            3,
                                                                }
                                                            )}
                                                        >
                                                            {cell.render(
                                                                "Cell"
                                                            )}
                                                        </td>
                                                    );
                                                }
                                            })}
                                        </tr>
                                    </React.Fragment>
                                );
                            })}
                        </tbody>
                    </table>
                ) : null}
                {/* <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={({ selected }) => setPageIndex(selected + 1)}
          pageRangeDisplayed={5}
          pageCount={Math.ceil(pageData?.totalPages) || 0}
          previousLabel="< prev"
          renderOnZeroPageCount={null}
          containerClassName="paginate-container"
          previousLinkClassName="paginate-button"
          nextLinkClassName="paginate-button"
          pageLinkClassName="paginate-link"
          activeLinkClassName="paginate-link-active"
          breakLinkClassName="paginate-break"
          disabledLinkClassName="paginate-link-disabled"
        /> */}
            </div>
        </div>
    );
}
