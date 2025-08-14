import React, { useEffect, useState } from "react";

export function PkgCount() {
  const [pkgcount, setPkgcount] = useState<string>("2000+");

  useEffect(() => {
    const baseUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:8000"
        : "https://gura.fyralabs.com";
    fetch(`${baseUrl}/api/packages/count`)
      .then((res) => res.text())
      .then((text) => setPkgcount(text))
      .catch(e => console.error(e));
  }, []);

  return (
    <span className="text-blue-300">{pkgcount}</span>
  );
}
