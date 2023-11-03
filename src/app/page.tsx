import ResultsPanel from "../components/ResultsPanel";
import SearchPanel from "../components/SearchPanel";

export default function Home() {
  return (
    <div className="w-full flex flex-col md:flex-row py-2 md:py-4">
      <div className="md:basis-1/4">
        <SearchPanel />
      </div>
      <div className="md:basis-3/4">
        <ResultsPanel />
      </div>
    </div>
  );
}
