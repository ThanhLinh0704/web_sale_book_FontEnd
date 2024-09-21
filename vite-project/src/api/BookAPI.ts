import React from "react";
import BookModel from "../models/BookModel";
import { my_request } from "./Request";

async function getBook(url: string): Promise<BookModel[]> {
    const result: BookModel[] = [];


    // Gọi phương thức request
    const response = await my_request(url);

    console.log(response)

    // Lấy ra json sach
    const responseData = response._embedded.books;
    console.log(responseData);

    for (const key in responseData) {
        result.push({
            codeBook: responseData[key].codeBook,
            nameBook: responseData[key].nameBook,
            priceSale: responseData[key].priceSale,
            priceOriginal: responseData[key].priceOriginal,
            description:responseData[key].description,
            quantity:responseData[key].quantity,
            author:responseData[key].author,
            rating:responseData[key].rating
        });
    }

    return result;
}

export async function getAllBook(): Promise<BookModel[]> {
    // Xác định endpoint
    const url: string = 'http://localhost:8080/book?sort=codeBook,desc';
    return getBook(url);
}

export async function getThirdNewBook(): Promise<BookModel[]> {
    // Xác định endpoint
    const url: string = 'http://localhost:8080/book?sort=codeBook,desc&page=0&size=3';
    return getBook(url);
}