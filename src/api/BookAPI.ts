import React from "react";
import BookModel from "../models/BookModel";
import { my_request } from "./Request";

interface ResultInterface{
    result: BookModel[];
    sumPage: number;
    sumBook: number;  
}

async function getBook(url: string): Promise<ResultInterface> {
    const result: BookModel[] = [];

    // Gọi phương thức request
    const response = await my_request(url);

    console.log(response)

    // Lấy ra json sach
    const responseData = response._embedded.books;
    console.log(responseData);

    // lấy thông tin trang
    const sumPage:number = response.page.totalPages;
    const sumBook: number = response.page.totalElements;
    console.log(sumPage)
    console.log(sumBook)

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
    console.log(result)

    return {result: result, sumPage: sumPage, sumBook: sumBook};
}

export async function getAllBook(currentPage: number): Promise<ResultInterface> {
    // Xác định endpoint
    const url: string = `http://localhost:8080/book?sort=codeBook,desc&size=8&page=${currentPage}`;
    return getBook(url);
}

export async function getThirdNewBook(): Promise<ResultInterface> {
    // Xác định endpoint
    const url: string = 'http://localhost:8080/book?sort=codeBook,desc&page=0&size=3';
    return getBook(url);
}

export async function searchBook(keywordSearch: string, codeCategory: number): Promise<ResultInterface> {
   // Xác định endpoint
   let url: string = `http://localhost:8080/book?sort=codeBook,desc&size=8&page=0`;
   if (keywordSearch !== "" && codeCategory == 0) {
    url = `http://localhost:8080/book/search/findByNameBookContaining?nameBook=${keywordSearch}&sort=codeBook,desc&size=8&page=0`;
    return getBook(url);
   } else if (keywordSearch === "" && codeCategory > 0) {
    url = `http://localhost:8080/book/search/findByCategoryList_CodeCategory?nameCategory=${codeCategory}&sort=codeBook,desc&size=8&page=0`;
   return getBook(url);
   } else {
       return getBook(url);
   }
}