import NodeCache from "node-cache";

export interface CbValue {
  label: string;
  value: string;
}

export interface MadoguchiRepos {
  name: string;
  // Add other fields if needed
}

const cache = new NodeCache({ stdTTL: 600 }); // 10 minutes

export async function getVersions(): Promise<CbValue[]> {
  let versions: CbValue[] = [];

  let cachedVersions = cache.get<CbValue[]>("versions");
  if (cachedVersions) {
    versions = cachedVersions;
  } else {
    const response = await fetch(`https://madoguchi.fyralabs.com/api/repos`);
    const data = await response.json() as MadoguchiRepos[];
    versions = parseRepos(data);
    cache.set("versions", versions);
  }

  return versions;
}

function parseRepos(data: MadoguchiRepos[]): CbValue[] {
  let versions: CbValue[] = [];

  data.forEach((repo) => {
    const name = repo.name.split("terra")[1];

    versions.push({
      label: `Terra ${name}`,
      value: name,
    });
  });

  // FIXME: This function is kinda a mess, check the sorter code later
  let maxVersion: number = 0;
  versions.sort((a, b) => {
    if (
      !Number.isNaN(parseInt(a.value)) &&
      !Number.isNaN(parseInt(b.value))
    ) {
      let intA = parseInt(a.value);
      let intB = parseInt(b.value);

      // check max version to assign rawhide
      if (intA > maxVersion) maxVersion = intA;
      if (intB > maxVersion) maxVersion = intB;

      return intB - intA;
    } else if (!Number.isNaN(parseInt(a.value))) {
      return -maxVersion;
    } else if (a.value == "rawhide" || b.value == "rawhide") {
      return -maxVersion - 1;
    }

    return 0;
  });

  return versions;
}
