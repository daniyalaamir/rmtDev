import { SortBy } from "../lib/types";

type SortingControlsProps = {
  sortBy: SortBy
  onClick: (newSortBy: SortBy) => void
}

export default function SortingControls({ sortBy, onClick }: SortingControlsProps) {
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>
      <SortingButton 
        onClick={() => onClick('relevant')} 
        isActive={sortBy === 'relevant'}
      >
        Relevant
      </SortingButton>
      <SortingButton 
        onClick={() => onClick('recent')} 
        isActive={sortBy === 'recent'}
      >
        Recent
      </SortingButton>
    </section>
  );
}

type SortingButtonProps = {
  children: React.ReactNode
  onClick: () => void
  isActive: boolean
}

function SortingButton({ children, onClick, isActive }: SortingButtonProps) {
  return (
    <button 
      className={`sorting__button sorting__button--relevant ${isActive ? 'sorting__button--active' : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}