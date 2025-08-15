interface PackageType {
    archs: Array<string>,
    description: string,
    ids: Array<string>,
    name: string,
    release: string,
    summary: string,
    url: string,
    version: string,
    packager: string,
    category: string,
}

type Package = PackageType & GuraError;