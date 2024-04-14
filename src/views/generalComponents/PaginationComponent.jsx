import { useEffect, useState } from "react";
import { CustomInput, Pagination, PaginationItem, PaginationLink } from "reactstrap";

export const PaginationComponent = ({ currentPage, setCurrentPage, pages }) => {
    const [isActivePrev, setIsActivePrev] = useState();
    const [isActiveNext, setIsActiveNext] = useState();
    const handleBtnPrevious = () => {
        console.log("prev", currentPage - 1);
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleBtnNext = () => {
        console.log("next", currentPage + 1);
        if (currentPage < pages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPage = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        if (currentPage === pages) {
            setIsActivePrev("");
            setIsActiveNext("active");
        } else {
            setIsActiveNext("");
            setIsActivePrev("active");
        }
    }, [currentPage]);

    return (
        <nav aria-label="Page navigation example">
            <Pagination
                className="pagination justify-content-center"
                listClassName="justify-content-center"
            >
                <PaginationItem>
                    <PaginationLink onClick={handleBtnPrevious}>
                        <i className="fa fa-angle-left" />
                        <span className="sr-only">Previous</span>
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem className={isActivePrev}>
                    <PaginationLink
                        onClick={(e) => {
                            currentPage === pages ? goToPage(1) : e.preventDefault();
                        }}
                    >
                        {currentPage === pages ? 1 : currentPage}
                    </PaginationLink>
                </PaginationItem>
                <p
                    style={{
                        display: "flex",
                        alignItems: "end",
                        height: "2.2rem",
                        margin: "0 0.5rem",
                    }}
                >
                    ......... De
                </p>
                <PaginationItem className={isActiveNext}>
                    <PaginationLink onClick={() => goToPage(pages)}>{pages}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink onClick={handleBtnNext}>
                        <i className="fa fa-angle-right" />
                        <span className="sr-only">Next</span>
                    </PaginationLink>
                </PaginationItem>
            </Pagination>
        </nav>
    );
};
