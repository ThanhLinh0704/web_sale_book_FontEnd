import React, { useEffect, useState } from "react";
import BookModel from "../../../models/BookModel";
import { getThirdNewBook } from "../../../api/BookAPI";
import CarouselItem from "./CarouseIItem";

const Carousel: React.FC = () => {
    const [listBook, setListBook] = useState<BookModel[]>([]);
    const [dataConnecting, setDataConnecting] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getThirdNewBook().then(
            bookData => {
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
        <div>
            <div id="carouselExampleDark" className="carousel carousel-dark slide">
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="10000">
                        <CarouselItem key={0} book={listBook[0]} />
                    </div>
                    <div className="carousel-item " data-bs-interval="10000">
                        <CarouselItem key={1} book={listBook[1]} />
                    </div>
                    <div className="carousel-item " data-bs-interval="10000">
                        <CarouselItem key={2} book={listBook[2]} />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}

export default Carousel;