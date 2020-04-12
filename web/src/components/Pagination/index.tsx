import React from "react";
import { Pages, Page, NextPage } from "./styles";

interface Props {
  pages: number;
  onChange?: (currentPage: number) => void;
}

const Pagination: React.FC<Props> = ({ pages, onChange }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  React.useEffect(() => {
    if (onChange) {
      onChange(currentPage);
    }
  }, [currentPage]);
  const handleNext = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
  };
  const handlePrevious = () => {
    const previousPage = currentPage - 1;
    setCurrentPage(previousPage);
  };
  const shouldNextPageRender = React.useMemo(() => {
    if (currentPage === pages || pages === 1) {
      return false;
    }
    return true;
  }, [currentPage, pages]);
  const shouldPreviousPageRender = React.useMemo(() => {
    if (currentPage === 1) {
      return false;
    }
    return true;
  }, [currentPage, pages]);
  if (pages === 1) {
    return null;
  }
  return (
    <Pages>
      {shouldPreviousPageRender && (
        <NextPage onClick={handlePrevious}>Pagina Anterior</NextPage>
      )}
      {[...Array(pages)].map((_, index) => (
        <Page
          active={index + 1 === currentPage}
          onClick={() => {
            setCurrentPage(index + 1);
          }}
        >
          {index + 1}
        </Page>
      ))}
      {shouldNextPageRender && (
        <NextPage onClick={handleNext}>Proxima Pagina</NextPage>
      )}
    </Pages>
  );
};

export default Pagination;
