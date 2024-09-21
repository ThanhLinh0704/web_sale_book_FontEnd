class ImageModel {
    codeImage?: number;
    nameImage?: string;
    isIcon?: boolean;
    url?: string;
    dataImage?: string;

    constructor(
        codeImage: number,
        nameImage: string,
        isIcon: boolean,
        url: string,
        dataImage: string,
    ) {
        this.codeImage = codeImage;
        this.nameImage = nameImage;
        this.isIcon = isIcon;
        this.url = url;
        this.dataImage = dataImage;
    }
}

export default ImageModel;