import * as React from "react";

export interface PkgCardProps {
  name: string;
  pkg: string;
  summary: string;
  version: string;
  repos: string[];
  arches: string[];
  className?: string;
  style?: React.CSSProperties;
}

export const PkgCard: React.FC<PkgCardProps> = ({
  name,
  pkg,
  summary,
  version,
  repos,
  arches,
  className = "",
  style = {},
}) => {
  return (
    <div
      className={`pkg-card-component dark:bg-zinc-900 bg-white shadow-lg p-6 box-border border border-white/15 rounded-[14px] font-sans ${className}`}
      style={style}
    >
      <div className="pkg-card-title font-bold pb-2 text-2xl">{name}</div>
      <div className="pkg-card-meta flex flex-wrap gap-2 text-sm pb-2">
        <span className="bg-sky-100 text-sky-800 px-2 py-0.5 rounded font-medium">
          {version}
        </span>
        {repos.length > 0 && (
          <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
            Repo: {repos.join(", ")}
          </span>
        )}
        {arches.length > 0 && (
          <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
            Arch: {arches.join(", ")}
          </span>
        )}
        <span className="bg-gray-50 text-gray-500 px-2 py-0.5 rounded">
          <span className="font-mono">{pkg}</span>
        </span>
      </div>
      <div className="pkg-card-summary text-base text-gray-700 dark:text-gray-300 hyphens-auto">
        {summary}
      </div>
    </div>
  );
};
