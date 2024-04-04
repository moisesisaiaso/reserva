import { useEffect, useState } from "react";
import { CustomInput, Pagination, PaginationItem, PaginationLink } from "reactstrap";

export const PaginationComponent = ({ currentPage, setCurrentPage, pages }) => {
    const [isActiveNumPrev, setIsActiveNumPrev] = useState("active");
    const [isActiveNumCenter, setIsActiveNumCenter] = useState("");
    const [isActiveNumNext, setIsActiveNumNext] = useState("");
    const [stateActive, setStateActive] = useState("");

    /* creo un array apartir de un numero */
    const arrayPages = Array.from({ length: pages }, (_, index) => index);

    const handleBtnPrevious = () => {
        console.log("prev", currentPage - 1);
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleBtnNext = () => {
        console.log("next", currentPage + 1);
        if (currentPage !== pages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const active = () => {
        if (currentPage <= 1) {
            setIsActiveNumPrev("");
            setIsActiveNumCenter("");
            setIsActiveNumNext("active");
        } else if (currentPage >= pages) {
            setIsActiveNumPrev("active");
            setIsActiveNumCenter("");
            setIsActiveNumNext("");
        } else {
            setIsActiveNumPrev("");
            setIsActiveNumCenter("active");
            setIsActiveNumNext("");
        }

        if (pages < 3) {
            setStateActive([isActiveNumPrev, isActiveNumNext]);
        } else {
            setStateActive([isActiveNumPrev, isActiveNumCenter, isActiveNumNext]);
        }
    };

    useEffect(() => {
        active();
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

                {arrayPages.map((page) => {
                    if (page < 3) {
                        return (
                            <PaginationItem className={stateActive[page]}>
                                <PaginationLink onClick={(e) => e.preventDefault()}>
                                    {page + 1}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    }
                })}

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
