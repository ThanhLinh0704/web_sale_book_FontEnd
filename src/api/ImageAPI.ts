import React from "react";
import { my_request } from "./Request";
import ImageModel from "../models/ImageModel";

async function getImageOfBook(url:string): Promise<ImageModel[]>{
    const result: ImageModel[] = [];

    // Gọi phương thức request
    const response = await my_request(url);

    // Lấy ra json sach
    const responseData = response._embedded.books;
    // console.log(responseData);

    for (const key in responseData) {
        result.push({
            codeImage: responseData[key].codeImage,
            nameImage: responseData[key].nameImage,
            isIcon: responseData[key].isIcon,
            url: responseData[key].url,
            dataImage: responseData[key].dataImage,
        });
    }

    return result;
}

export async function getAllImageOfBook(codeBook: number): Promise<ImageModel[]> {
        // Xác định endpoint
        const url: string = `http://localhost:8080/book/${codeBook}/imageList`;
        return getImageOfBook(url);
}

export async function getFirstImageOfBook(codeBook: number): Promise<ImageModel[]> {
    // Xác định endpoint
    const url: string = `http://localhost:8080/book/${codeBook}/imageList?sort=codeImage,asc&page=0&size=1`;
    return getImageOfBook(url);
}