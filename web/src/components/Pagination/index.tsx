import React from "react";
import { Pages, Page, NextPage } from "./styles";

interface Props {
  pages: number;
  setter: any;
  currentPage: any;
}

const Pagination: React.FC<Props> = ({ pages, currentPage, setter }) => {
  const handleNext = () => {
    if (currentPage === pages || pages === 1) {
      return;
    }
    const nextPage = currentPage + 1;
    setter(nextPage);
  };
  const handlePrevious = () => {
    if (currentPage === 1) {
      return;
    }
    const previousPage = currentPage - 1;
    setter(previousPage);
  };
  // const shouldNextPageRender = React.useMemo(() => {
  //   if (currentPage === pages || pages === 1) {
  //     return false;
  //   }
  //   return true;
  // }, [currentPage, pages]);
  // const shouldPreviousPageRender = React.useMemo(() => {
  //   if (currentPage === 1) {
  //     return false;
  //   }
  //   return true;
  // }, [currentPage]);
  if (pages <= 1) {
    return null;
  }
  return (
    <Pages>
      <NextPage onClick={handlePrevious}>Pagina Anterior</NextPage>

      {[...Array(pages)].map((_, index) => (
        <Page
          active={index + 1 === currentPage}
          key={index}
          onClick={() => {
            setter(index + 1);
          }}
        >
          {index + 1}
        </Page>
      ))}
      <NextPage onClick={handleNext}>Proxima Pagina</NextPage>
    </Pages>
  );
};

export default Pagination;
