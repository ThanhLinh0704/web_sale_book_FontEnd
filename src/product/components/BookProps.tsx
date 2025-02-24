import React, { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import ImageModel from "../../models/ImageModel";
import { getAllImageOfBook } from "../../api/ImageAPI";

interface BookPropsInterface{
    book: BookModel;
}

const BookProps: React.FC<BookPropsInterface> = (props) => {
    const codeBook: number = props.book.codeBook;

    const [listImage, setListImage] = useState<ImageModel[]>([]);
    const [dataConnecting, setDataConnecting] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getAllImageOfBook(codeBook).then(
            imageData =>{
                setListImage(imageData);
                console.log(listImage)
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

    let dataImage:string="";
    console.log(listImage)
    if(listImage[0] && listImage[0].dataImage){
        dataImage=listImage[0].dataImage;
    }
    console.log(dataImage)

    return (
        <div className="col-md-3 mt-2">
            <div className="card">
                <img
                    src={dataImage}
                    className="card-img-top"
                    alt={props.book.nameBook}
                    style={{ height: '200px' }}
                />
                <div className="card-body">
                    <h5 className="card-title">{props.book.nameBook}</h5>
                    <p className="card-text">{props.book.description}</p>
                    <div className="price">
                        <span className="original-price">
                            <del>{props.book.priceOriginal}</del>
                        </span>
                        <span className="discounted-price">
                            <strong>{props.book.priceSale}</strong>
                        </span>
                    </div>
                    <div className="row mt-2" role="group">
                        <div className="col-6">
                            <a href="#" className="btn btn-secondary btn-block">
                                <i className="fas fa-heart"></i>
                            </a>
                        </div>
                        <div className="col-6">
                            <button className="btn btn-danger btn-block">
                                <i className="fas fa-shopping-cart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default BookProps;