import { ProductsTable } from "../components/Tables";
import { MyButton } from "../components/Buttons";
import { ProductForm } from "../components/Forms";
import { Modal } from "../components/Modals";
import { useState } from "react";
import { useEffect } from "react";
import { Plus } from "@phosphor-icons/react";
import { Layout } from "../components/Layouts";
import usePaginate from "../hooks/usePaginate";
import ReactPaginate from "react-paginate";

function Products() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        document.title = "Products | React CRUD";
        return () => {};
    }, []);

    const { docs, error, mutate, pageData, setPageIndex } = usePaginate({
        url: "/api/products",
        limit: 10,
    });

    console.log(docs, pageData);

    return (
        <>
            <Modal
                label={"New Product"}
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                }}
            >
                <ProductForm
                    onAfterSubmit={() => setIsModalOpen(false)}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
            <Layout>
                <div className="flex min-h-screen w-full flex-col gap-4 p-8 pt-4">
                    <div className="flex items-center justify-between border-b border-gray-300 pb-4">
                        <h1 className="font-display text-3xl font-bold">
                            Products
                        </h1>
                        <MyButton onClick={() => setIsModalOpen(true)}>
                            <Plus size={16} weight="bold" />
                            <p>New Product</p>
                        </MyButton>
                    </div>
                    <ProductsTable data={docs} mutate={mutate} />
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="next >"
                        onPageChange={({ selected }) =>
                            setPageIndex(selected + 1)
                        }
                        pageRangeDisplayed={5}
                        pageCount={Math.ceil(pageData?.last_page) || 0}
                        previousLabel="< prev"
                        renderOnZeroPageCount={null}
                        containerClassName="paginate-container ml-auto"
                        previousLinkClassName="paginate-button"
                        nextLinkClassName="paginate-button"
                        pageLinkClassName="paginate-link"
                        activeLinkClassName="paginate-link-active"
                        breakLinkClassName="paginate-break"
                        disabledLinkClassName="paginate-link-disabled"
                    />
                </div>
            </Layout>
        </>
    );
}

export default Products;
