import React, { useEffect, useState } from "react";
import BookModel from "../models/BookModel";
import { getAllBook } from "../api/BookAPI";
import BookProps from "./components/BookProps";
import { Pagination } from "../layouts/utils/Pagination";
const ListProduct: React.FC = () => {

    const [listBook, setListBook] = useState<BookModel[]>([]);
    const [dataConnecting, setDataConnecting] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [totalBook, setTotalBook] = useState(0);

    useEffect(() => {
        getAllBook(currentPage - 1).then(
            bookData =>{
                setListBook(bookData.result);
                setTotalPage(bookData.sumPage);
                setDataConnecting(false);
            }
        ).catch(
            error => {
                setDataConnecting(false);
                setError(error.message);
            }
        );
    }, [currentPage] // Chi goi mot lan
    )

    const pagination = (page: number) => setCurrentPage(page);

    if (dataConnecting) {
        return (
            <div>
                <h1>Đang tải dữ liệu</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <h1>Gặp lỗi: {error}</h1>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="row mt-4">
                {
                    listBook.map((book) => (
                        <BookProps key={book.codeBook} book={book} />
                    )
                    )
                }
            </div>
            <Pagination currentPage={currentPage} sumPage={totalPage} pagination={pagination}/>
        </div>
    );
}

export default ListProduct;