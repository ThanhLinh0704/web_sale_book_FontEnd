import React, { useEffect, useState } from "react";
import BookModel from "../models/BookModel";
import { getAllBook } from "../api/BookAPI";
import BookProps from "./components/BookProps";
const ListProduct: React.FC = () => {

    const [listBook, setListBook] = useState<BookModel[]>([]);
    const [dataConnecting, setDataConnecting] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getAllBook().then(
            bookData =>{
                setListBook(bookData);
                setDataConnecting(false);
            }
        ).catch(
            error => {
                setDataConnecting(false);
                setError(error.message);
            }
        );
    }, [] // Chi goi mot lan
    )

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
        </div>
    );
}

export default ListProduct;