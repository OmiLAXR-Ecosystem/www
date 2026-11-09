import React from "react";
import {InlineCodeBox} from "../CodeBox";
import Table from "../Table";
import {JsonManifestCodebox} from "../jsonManifest";

function P({children}: any) {
    return <p className="pt-3 pb-3">{children}</p>
}

function H({children}: any) {
    return <h6 className="pt-3">{children}</h6>
}

interface ModuleRow {
    name: string;
    purpose: string;
    required: {[key: string]: string};
    package: string;
    sourceCode: string;
}

export default function () {
    const columns = ['Name', "Package", 'Purpose', 'Requirements'];
    const rows: ModuleRow[] = [
        {
            name: 'OmiLAXR.Pseudonymization',
            sourceCode: "https://github.com/OmiLAXR-Ecosystem/OmiLAXR.Pseudonymization",
            package: "com.rwth.unity.omilaxr.pseudonymization",
            purpose: "Offers pseudonymization methods for an actor.",
            required: {"OmiLAXR@^2.0.0": "https://www.npmjs.com/package/com.rwth.unity.omilaxr/v/2.0.0"}
        },
        {
            name: 'OmiLAXR.HypeRate',
            sourceCode: "https://github.com/OmiLAXR-Ecosystem/OmiLAXR.HypeRate",
            package: "com.rwth.unity.omilaxr.hyperate",
            purpose: "Enables tracking of heart rate using HypeRate SDK.",
            required: {"OmiLAXR@^2.0.9": "https://www.npmjs.com/package/com.rwth.unity.omilaxr/v/2.0.9", "HypeRate API Key": "https://www.hyperate.io/api"}
        },
        {
            name: "xAPI4Unity",
            sourceCode: "https://github.com/OmiLAXR-Ecosystem/xAPI4Unity",
            package: "com.rwth.unity.omilaxr.xapi4unity",
            purpose: "Unity Editor plugin supporting development with xAPI. It transforms JSON xAPI defintions to strict C\# classes.",
            required: {"xAPI Definitions Registry": "https://xapi.elearn.rwth-aachen.de/"}
        },
        {
            name: "OmiLAXR.MRTK2",
            sourceCode: "https://github.com/OmiLAXR-Ecosystem/OmiLAXR.MRTK2",
            package: "com.rwth.unity.omilaxr.mrtk2",
            purpose: "Collection of Listeners, Filters and Tracking Behaviours for MRTK2 SDK.",
            required: {"OmiLAXR@^2.0.17": "https://www.npmjs.com/package/com.rwth.unity.omilaxr/v/2.0.17", "MRTK2": "https://learn.microsoft.com/en-us/windows/mixed-reality/mrtk-unity/mrtk2/packages/mrtk-packages?view=mrtkunity-2022-05"}
        },
        {
            name: "OmiLAXR.UnityXR",
            sourceCode: "https://github.com/OmiLAXR-Ecosystem/OmiLAXR.UnityXR",
            package: "com.rwth.unity.omilaxr.unityxr",
            purpose: "Collection of Listeners, Filters and Tracking Behaviours for Unity's XR SDK.",
            required: {"OmiLAXR@>=2.0.11": "https://www.npmjs.com/package/com.rwth.unity.omilaxr/v/2.0.11", "Unity XR Plugin": "https://docs.unity.com/2020.3/Documentation/Manual/Unity-XR-Overview.html"}
        },
        {
            name: "OmiLAXR.MetaXR",
            sourceCode: "https://github.com/OmiLAXR-Ecosystem/OmiLAXR.MetaXR",
            package: "com.rwth.unity.omilaxr.metarx",
            purpose: "Collection of Listeners, Filters and Tracking Behaviours for Meta's XR SDK.",
            required: {"OmiLAXR@^2.2.0": "https://www.npmjs.com/package/com.rwth.unity.omilaxr/v/2.0.11", "Meta Interaction SDK": "https://developers.meta.com/horizon/documentation/unity/unity-isdk-interaction-sdk-overview/"}
        }
    ];

    const scopes = [
        "com.rwth.unity.omilaxr"
    ];

    // const newScopes = rows.map(row => row.package);

    return (
        <>
            <div className="h-full w-full place-items-center bg-white px-4 py-20 sm:px-6 lg:px-8">
                <div className="doc-page relative items-center">
                    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">OmiLAXR
                        Ecosystem</h1>

                    <p className="mb-6 mt-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                        The OmiLAXR Ecosystem consists of several tools and modules. Here you can find only approved modules that are accepted as part of the ecosystem.
                        If you cannot find a module fitting your needs, try to find a module you need, please look into the channel <InlineCodeBox>#modules</InlineCodeBox> in our <a href="https://discord.gg/Bu8YaUnf">Discord Server</a>.
                    </p>

                    <p className="mb-6 mt-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                        In the following code example you can see how you should register the module into your projects <InlineCodeBox>manifest.json</InlineCodeBox>. In this example all available modules are entered. But you can remove those you don't need.
                        Afterwards think about installing the packages through <InlineCodeBox>Package Manager</InlineCodeBox>.
                    </p>

                    <div className="mt-6 mb-6">
                        <img style={{margin: "auto"}} src="/ecosystem/OmiLAXR_Interface.drawio.webp" alt="OmiLAXR Ecosystem" className="mb-6 rounded-lg shadow-lg" width={1000} height={336} loading="lazy" decoding="async" />
                    </div>

                    <JsonManifestCodebox scopes={scopes}></JsonManifestCodebox>


                    <Table columns={columns} data={rows.sort((a, b) => a.name.localeCompare(b.name)).map(r => ({
                        Name: <a target="_blank" href={r.sourceCode}>{r.name}</a>,
                        Purpose: r.purpose,
                        Package: <InlineCodeBox href={'https://www.npmjs.com/package/' + r.package} target="_blank" clipboardButton={true}>{r.package}</InlineCodeBox>,
                        Requirements: Object.entries(r.required).map(([k,v]) => (<React.Fragment key={k}><a target="_blank" href={v}>{k}</a><br/></React.Fragment>)),
                    }))}/>
                </div>
            </div>
        </>
    );
}