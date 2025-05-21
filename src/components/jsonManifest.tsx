import CodeBox from "./CodeBox";
import React from "react";

function scopedRegistriesCode(scopes: string[]) {
    return [
        {
            "name": "npmjs",
            "url": "https://registry.npmjs.com",
            "scopes": scopes
        },
    ];
}

export function jsonManifest(scopes: string[]) {
    return {
        "dependencies": {"...": "..."},
        "scopedRegistries": scopedRegistriesCode(scopes)
    };
}

interface IJsonManifestCodeboxProps {
    scopes: string[]
}
export function JsonManifestCodebox({scopes}: IJsonManifestCodeboxProps) {
    const s = JSON.stringify(scopedRegistriesCode(scopes));


    return <CodeBox language="JavaScript" filename="<project_root>/Packages/manifest.json" clipboardCode={'"scopedRegistries": ' + s}>
        {JSON.stringify(jsonManifest(scopes), null, 2)}
    </CodeBox>;
}