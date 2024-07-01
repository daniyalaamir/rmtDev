import { useState } from "react";
import { useDebounce, useJobItems } from "../lib/hooks";
import Background from "./Background";
import Header, { HeaderTop } from "./Header";
import Container from "./Container";
import Footer from "./Footer";
import Logo from "./Logo";
import BookmarksButton from "./BookmarksButton";
import SearchForm from "./SearchForm";
import Sidebar, { SidebarTop } from "./Sidebar";
import JobItemContent from "./JobItemContent";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";
import JobList from "./JobList";
import PaginationControls from "./PaginationControls";
import { Toaster } from "react-hot-toast";
import { RESULTS_PER_PAGE } from "../lib/constants";

export default function App() {
  const [searchText, setSearchText] = useState("")
  const debouncedSearchText = useDebounce(searchText, 250)
  const { jobItems, isLoading } = useJobItems(debouncedSearchText)
  const [currentPage, setCurrentPage] = useState(1)
  
  const totalNumberOfResults = jobItems?.length || 0
  const totalNumberOfPages = totalNumberOfResults / RESULTS_PER_PAGE
  const jobitemsSliced = jobItems?.slice(
    currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE, 
    currentPage * RESULTS_PER_PAGE) || []

  const handleChangePage = (direction: 'next' | 'previous') => {
    if (direction === 'next') {
      setCurrentPage(prev => prev + 1)
    } else if (direction === 'previous') {
      setCurrentPage(prev => prev - 1)
    }
  }

  return (
    <>
      <Background />
      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>
        <SearchForm searchText={searchText} setSearchText={setSearchText} />
      </Header>
      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount totalNumberOfResults={totalNumberOfResults} />
            <SortingControls />
          </SidebarTop>
          <JobList jobItems={jobitemsSliced} isLoading={isLoading} />
          <PaginationControls 
            currentPage={currentPage} 
            totalNumberOfPages={totalNumberOfPages}
            onClick={handleChangePage} 
          />
        </Sidebar>
        <JobItemContent />
      </Container>
      <Footer />
      <Toaster position="top-right" />
    </>
  )
}

