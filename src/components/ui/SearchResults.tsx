import * as React from "react";
import { PkgCard } from "./PkgCard";

export interface SearchResultsProps {
  query: string;
  repo: string;
  arch: string;
}

interface SearchResult {
  name: string;
  pkg: string;
  summary: string;
  version: string;
  repos: string[];
  arches: string[];
}

const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "https://gura.fyralabs.com";

  export const SearchResults: React.FC<SearchResultsProps> = ({
  query,
  repo,
  arch,
}) => {
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Only search if query is non-empty
    if (!query) {
      setResults([]);
      setError(null);
      setLoading(false);
      return;
    }

    const params = new URLSearchParams();
    params.set("q", query);
    if (repo) params.set("repo", repo);
    if (arch) params.set("arch", arch);

    fetch(`${baseUrl}/api/search?${params.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch search results");
        return res.json();
      })
      .then((data) => {
        // If the API returns a single object, wrap it in an array
        const items = Array.isArray(data) ? data : [data];
        setResults(items);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message || "Unknown error");
        setLoading(false);
      });
  }, [query, repo, arch]);

  return (
    <div className="w-full">
      {loading && (
        <div className="text-center py-8 text-lg text-gray-500">Searching…</div>
      )}
      {error && (
        <div className="text-center py-8 text-red-500">
          Error: {error}
        </div>
      )}
      {!loading && !error && results.length === 0 && query && (
        <div className="text-center py-8 text-gray-500">No results found.</div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {results.map((result, idx) => (
          <PkgCard
            key={result.pkg + "-" + idx}
            name={result.name}
            pkg={result.pkg}
            summary={result.summary}
            version={result.version}
            repos={result.repos}
            arches={result.arches}
          />
        ))}
      </div>
    </div>
  );
};
