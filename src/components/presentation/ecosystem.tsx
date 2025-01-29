import ThemeProvider from "../theme-provider";
import React from "react";
import {contentOf, type InstructionCardProps} from "./instructionCard";
import CodeBox, {InlineCodeBox} from "../CodeBox";
import {FigureManager} from "react-figure-ref";
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
            sourceCode: "https://gitlab.com/learntech-rwth/omilaxr-ecosystem/v2/omilaxr.pseudnomization",
            package: "com.rwth.unity.omilaxr.pseudonymization",
            purpose: "Offers pseudonymization methods for an actor.",
            required: {"OmiLAXR@^2.0.0": "https://www.npmjs.com/package/com.rwth.unity.omilaxr/v/2.0.0"}
        },
        {
            name: 'OmiLAXR.HypeRate',
            sourceCode: "https://gitlab.com/learntech-rwth/omilaxr-ecosystem/v2/heart-rate/omilaxr.hyperate",
            package: "com.rwth.unity.omilaxr.hyperate",
            purpose: "Enables tracking of heart rate using HypeRate SDK.",
            required: {"OmiLAXR@^2.0.9": "https://www.npmjs.com/package/com.rwth.unity.omilaxr/v/2.0.9", "HypeRate API Key": "https://www.hyperate.io/api"}
        },
        {
            name: "xAPI4Unity",
            sourceCode: "",
            package: "com.rwth.unity.omilaxr.xapi4unity",
            purpose: "Unity Editor plugin supporting development with xAPI. It transforms JSON xAPI defintions to strict C\# classes.",
            required: {"xAPI Definitions Registry": "https://xapi.elearn.rwth-aachen.de/"}
        },
        {
            name: "OmiLAXR.UnityXR",
            sourceCode: "https://gitlab.com/learntech-rwth/omilaxr-ecosystem/v2/xr-framework-modules/omilaxr.unityxr",
            package: "com.rwth.unity.omilaxr.unityxr",
            purpose: "Collection of Listeners, Filters and Tracking Behaviours for Unity's XR SDK.",
            required: {"OmiLAXR@^2.0.11": "https://www.npmjs.com/package/com.rwth.unity.omilaxr/v/2.0.11", "Unity XR Plugin": "https://docs.unity.com/2020.3/Documentation/Manual/Unity-XR-Overview.html"}
        },
        {
            name: "OmiLAXR.UnityXR.xAPI",
            sourceCode: "https://gitlab.com/learntech-rwth/omilaxr-ecosystem/v2/xr-framework-modules/omilaxr.unityxr.xapi",
            package: "com.rwth.unity.omilaxr.unityxr.xapi",
            purpose: "Composers enabling xAPI statements for OmiLAXR.UnityXR. Longterm: will be moved standardized into OmiLAXR.xAPI.",
            required: {"OmiLAXR@^2.0.11": "https://www.npmjs.com/package/com.rwth.unity.omilaxr/v/2.0.11", "OmiLAXR.UnityXR@^0.0.1-beta": ""}
        }
    ];

    const scopes = [
        "com.rwth.unity.omilaxr.xapi4unity",
        "com.rwth.unity.omilaxr",
        "com.rwth.unity.omilaxr.xapi"
    ];

    const newScopes = rows.map(row => row.package);

    return (
        <ThemeProvider>
            <div className="h-full w-screen place-items-center bg-white py-20">
                <div className="container mx-auto items-center relative">
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

                    <JsonManifestCodebox scopes={[...scopes, ...newScopes]}></JsonManifestCodebox>

                    <Table columns={columns} data={rows.sort((a, b) => a.name.localeCompare(b.name)).map(r => ({
                        Name: <a target="_blank" href={r.sourceCode}>{r.name}</a>,
                        Purpose: r.purpose,
                        Package: <InlineCodeBox href={'https://www.npmjs.com/package/' + r.package} target="_blank" clipboardButton={true}>{r.package}</InlineCodeBox>,
                        Requirements: Object.entries(r.required).map(([k,v]) => (<><a target="_blank" href={v}>{k}</a><br/></>)),
                    }))}/>
                </div>
            </div>
        </ThemeProvider>
    );
}