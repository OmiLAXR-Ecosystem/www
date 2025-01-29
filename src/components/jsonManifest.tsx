import CodeBox from "./CodeBox";
import React from "react";

export function jsonManifest(scopes: string[]) {
    return {
        "dependencies": {"...": "..."},
        "scopedRegistries": [
            {
                "name": "npmjs",
                "url": "https://registry.npmjs.com",
                "scopes": scopes
            },
        ]
    };
}

interface IJsonManifestCodeboxProps {
    scopes: string[]
}
export function JsonManifestCodebox({scopes}: IJsonManifestCodeboxProps) {
    return <CodeBox language="JavaScript" filename="<project_root>/Packages/manifest.json">
        {JSON.stringify(jsonManifest(scopes), null, 2)}
    </CodeBox>;
}