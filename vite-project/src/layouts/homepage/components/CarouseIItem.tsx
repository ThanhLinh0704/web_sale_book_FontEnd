import React, { useEffect, useState } from "react";
import BookModel from "../../../models/BookModel";
import ImageModel from "../../../models/ImageModel";
import { getFirstImageOfBook } from "../../../api/ImageAPI";


interface CarouselItemInterface{
    book: BookModel;
}

const CarouselItem: React.FC<CarouselItemInterface> = (props) => {
    const codeBook: number = props.book.codeBook;

    const [listImage, setListImage] = useState<ImageModel[]>([]);
    const [dataConnecting, setDataConnecting] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getFirstImageOfBook(codeBook).then(
            imageData =>{
                setListImage(imageData);
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
    if(listImage[0] && listImage[0].dataImage){
        dataImage=listImage[0].dataImage;
    }

    return (
        <div className="row align-items-center">
            <div className="col-5 text-center">
                <img src={dataImage} className="float-end" style={{ width: '150px' }} />
            </div>
            <div className="col-7">
                <h5>{props.book.nameBook}</h5>
                <p>{props.book.description}</p>
            </div>
        </div>
    );
}
export default CarouselItem;