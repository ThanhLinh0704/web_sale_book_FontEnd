class BookModel {
    codeBook: number;
    nameBook?: string; // có thể bị NULL
    priceSale?: number;
    priceOriginal?: number;
    description?:string;
    quantity?: number;
    author?:string;
    rating?:number;

    constructor(
        codeBook: number,
        nameBook?: string, // có thể bị NULL
        priceSale?: number,
        priceOriginal?: number,
        description?:string,
        quantity?: number,
        author?:string,
        rating?:number,
    ){
        this.codeBook= codeBook;
        this.nameBook= nameBook;
        this.priceSale= priceSale;
        this.priceOriginal= priceOriginal;
        this.description= description;
        this.quantity= quantity;
        this.author= author;
        this.rating= rating;
    }
}

export default BookModel;