export async function my_request(url: string) {
    // Truy cập đến đường dẫn
    const response = await fetch(url);

    // Nếu bị trả về lỗi
    if (!response.ok) {
        throw new Error(`access faile ${url}`);
    }

    // Nếu trả về OK
    return response.json();
}