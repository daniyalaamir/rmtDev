import { useActiveId } from "../lib/hooks";
import { TJobItem } from "../lib/types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

type JobListProps = {
  jobItems: TJobItem[]
  isLoading: boolean
}

export function JobList({ jobItems, isLoading }: JobListProps) {
  const activeId = useActiveId()
  return (
    <ul className="job-list">
      {isLoading && <Spinner />}
      {!isLoading && jobItems.map(jobItem => (
          <JobListItem 
            key={jobItem.id} 
            jobItem={jobItem} 
            isActive={jobItem.id === activeId} 
          />
        ))
      }
    </ul>
  )
}

export default JobList;
