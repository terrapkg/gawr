import * as React from "react";
import { Combobox } from "./Combobox";
import { SearchBar } from "./SearchBar";

export function SearchPanel({ versions, initialQuery, initialRepo, initialArch }: {
  versions: CbValue[];
  initialQuery: string;
  initialRepo: string;
  initialArch: string;
}) {
  const [query, setQuery] = React.useState(initialQuery);
  const [repo, setRepo] = React.useState(initialRepo || versions[0]?.value || "");
  const [arch, setArch] = React.useState(initialArch || "x86_64");

  // Update URL when search or combobox changes
  const updateUrl = () => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (repo) params.set("repo", repo);
    if (arch) params.set("arch", arch);
    window.location.href = `/search?${params.toString()}`;
  };

  return (
    <div className="mx-auto max-w-6xl px-2 sm:px-6 lg:px-8">
      <div className="flex flex-row gap-8 justify-center pb-8">
        <Combobox
          values={versions}
          group="versions"
          defaultValue={versions.findIndex(v => v.value === repo)}
          onChange={setRepo}
        />
        <Combobox
          values={[
            { label: "x86_64", value: "x86_64" },
            { label: "aarch64", value: "aarch64" },
          ]}
          group="architectures"
          defaultValue={arch === "aarch64" ? 1 : 0}
          onChange={setArch}
        />
      </div>
      <SearchBar
        value={query}
        onChange={setQuery}
        onEnter={updateUrl}
        className="mx-auto flex justify-center"
      />
    </div>
  );
}
