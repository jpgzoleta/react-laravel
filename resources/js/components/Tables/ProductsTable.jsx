import { useTable } from "react-table";
import { useMemo, useState } from "react";
import { ActionButton } from "../Buttons";
import { ProductForm } from "../Forms";
import { Pencil, Trash } from "@phosphor-icons/react";
import classNames from "classnames";
import React from "react";
import { Modal, Confirmation } from "../Modals";
import { StatusBadge } from "../Misc";
import axios from "axios";
import toast from "react-hot-toast";
import { TableRowSkeleton } from "../Loaders";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

/**
 * Create a single table row loader
 * @returns {JSX.Element}
 */

function Loader() {
    return (
        <SkeletonTheme baseColor="#cbd5e1" highlightColor="#e2e8f0" inline>
            <tr className="border-gray-200 border-b">
                <td className="p-4">
                    <Skeleton containerClassName="flex items-start" />
                </td>
                <td className="p-4 min-w-[150px] max-w-[200px]">
                    <Skeleton containerClassName="flex items-start" />
                </td>
                <td className="p-4 min-w-[250px]">
                    <Skeleton
                        count={2}
                        containerClassName="flex flex-col gap-1 justify-start"
                    />
                </td>
                <td className="p-4">
                    <Skeleton containerClassName="flex items-start" />
                </td>
                <td className="p-4">
                    <Skeleton
                        style={{
                            width: 24,
                            height: 24,
                        }}
                        count={2}
                        containerClassName="flex gap-2 items-center justify-center"
                        className="w-[24px] h-[24px]"
                    />
                </td>
            </tr>
        </SkeletonTheme>
    );
}

export default function ProductsTable({
    data = [],
    mutate = () => {},
    isLoading = false,
    isValidating = false,
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [toEditData, setToEditData] = useState(null);
    const [toDeleteId, setToDeleteId] = useState(null);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

    const docs = useMemo(() => data, [data]);

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
                Header: "Details",
                accessor: "details",
            },
            {
                Header: "Price",
                accessor: "price",
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

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data: docs });

    function handleDelete() {
        axios
            .delete(`/api/products/${toDeleteId}`)
            .then((res) => {
                if (res.data?.success) {
                    toast.success(res?.data?.message);
                    setToDeleteId(null);
                    setIsConfirmationOpen(false);
                    mutate();
                } else {
                    toast.error(res.data?.message);
                }
            })
            .catch((error) => console.log(error));
    }

    return (
        <div>
            <Confirmation
                isOpen={isConfirmationOpen}
                label="Delete Product?"
                message={`Product ${toDeleteId} will be gone forever!`}
                onCancel={() => setIsConfirmationOpen(false)}
                onConfirm={() => {
                    handleDelete();
                    setIsConfirmationOpen(false);
                    setToDeleteId("");
                }}
            />
            <Modal
                label={"Edit Product"}
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setToEditData(null);
                }}
            >
                <ProductForm
                    product={toEditData}
                    onCancel={() => {
                        setToEditData(null);
                        setIsModalOpen(false);
                    }}
                    onAfterSubmit={() => {
                        setToEditData(null);
                        setIsModalOpen(false);
                        mutate();
                    }}
                />
            </Modal>
            <div
                // autoHeight
                // autoHide
                className="flex flex-col gap-4 overflow-x-auto rounded-t-md"
            >
                <table {...getTableProps()} className="w-full">
                    <thead className="px-4 py-3 text-left font-display text-sm font-semibold">
                        {headerGroups.map((headerGroup, index) => (
                            <tr
                                key={index}
                                {...headerGroup.getHeaderGroupProps()}
                                // className="border-b border-gray-300"
                            >
                                {headerGroup.headers.map((column, index) => (
                                    <th
                                        key={index}
                                        {...column.getHeaderProps()}
                                        className={classNames(
                                            "my-2 border-r border-gray-300 bg-gray-200 px-4 py-3 last:border-0",
                                            {
                                                "text-center": index == 0,
                                            }
                                        )}
                                    >
                                        {column.render("Header")}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {isLoading && isValidating
                            ? [...Array(10)].map((index) => (
                                  <Loader key={index} />
                              ))
                            : rows.map((row, index) => {
                                  prepareRow(row);
                                  return (
                                      <React.Fragment key={row.original.id}>
                                          <tr
                                              // key={row.original._id}
                                              {...row.getRowProps()}
                                              className={classNames(
                                                  "cursor-pointer border-y border-gray-200 transition-colors hover:bg-blue-100"
                                              )}
                                          >
                                              {row.cells.map((cell, index) => {
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
                                                                  "min-w-[150px] max-w-[200px]":
                                                                      index ==
                                                                      1,
                                                                  "min-w-[250px]":
                                                                      index ==
                                                                      2,
                                                              }
                                                          )}
                                                      >
                                                          {cell.render("Cell")}
                                                      </td>
                                                  );
                                              })}
                                          </tr>
                                      </React.Fragment>
                                  );
                              })}
                        {/* {} */}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
