import Sidebar from "./Sidebar";
import JobItemContent from "./JobItemContent";

export default function Container() {
  return <div className="container">
    <Sidebar />
    <JobItemContent />
  </div>;
}
