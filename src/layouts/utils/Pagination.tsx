
import React from "react";

interface PaginationInterface {
    currentPage: number;
    sumPage: number;
    pagination: any
}

export const Pagination: React.FC<PaginationInterface> = (props) => {

    const danhSachTrang = [];

    if (props.currentPage === 1) {
        danhSachTrang.push(props.currentPage);
        if (props.sumPage >= props.currentPage + 1) {
            danhSachTrang.push(props.currentPage + 1);
        }
        if (props.sumPage >= props.currentPage + 2) {
            danhSachTrang.push(props.currentPage + 2);
        }
    } else if (props.currentPage > 1) {
        // trang -2
        if (props.currentPage >= 3) {
            danhSachTrang.push(props.currentPage - 2);
        }
        // trang -1
        if (props.currentPage >= 2) {
            danhSachTrang.push(props.currentPage - 1);
        }
        // ban than no
        danhSachTrang.push(props.currentPage);
        // trang + 1
        if (props.currentPage >= props.currentPage + 1) {
            danhSachTrang.push(props.currentPage + 1);
        }
        // trang + 2
        if (props.sumPage >= props.currentPage + 2) {
            danhSachTrang.push(props.currentPage + 2);
        }
    }

    return (
        <nav aria-label="...">
            <ul className="pagination">
                <li className="page-item" onClick={()=>props.pagination(1)}>
                    <button className="page-link" >
                        Trang Đầu
                    </button>
                </li>
                {
                    danhSachTrang.map(page => (
                        <li className="page-item" key={page} onClick={()=>props.pagination(page)}>
                            <button className={"page-link " + (props.currentPage===page?"active":"")}>
                                {page}
                            </button>
                        </li>
                    ))
                }
                <li className="page-item" onClick={()=>props.pagination(props.sumPage)}>
                    <button className="page-link" >
                        Trang Cuối
                    </button>
                </li>
            </ul>
        </nav>
    )
}