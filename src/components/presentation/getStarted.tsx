import ThemeProvider from "../theme-provider";
import React from "react";
import GetStartedCard, {type GetStartedCardProps} from "./getStartedCard";
import CodeBox, {InlineCodeBox} from "../CodeBox";
import {FigureManager, Figure, FigureRef} from "react-figure-ref";

const scopes = [
    "com.rwth.unity.omilaxr.xapi4unity",
    "com.rwth.unity.omilaxr",
    "com.rwth.unity.omilaxr.xapi",
    "com.rwth.unity.omilaxr.assistance",
    "com.rwth.unity.omilaxr.assistance.xapi",
    "com.rwth.unity.omilaxr.adapters.recopa",
    "com.rwth.unity.omilaxr.adapters.steamvr",
    "com.rwth.unity.omilaxr.adapters.unityxr",
    "com.rwth.unity.omilaxr.adapters.vivesr",
    "com.rwth.unity.omilaxr.scenemanager",
    "com.rwth.unity.opentts4unity"
];

const jsonManifest = () => ({
    "dependencies": {"...": "..."},
    "scopedRegistries": [
        {
            "name": "npmjs",
            "url": "https://registry.npmjs.com",
            "scopes": scopes
        },
        {
            "name": "package.openupm.com",
            "url": "https://package.openupm.com",
            "scopes": [
                "com.itisnajim.socketiounity"
            ]
        }
    ]
});

export function GetStartedPresentation() {

    const fm = new FigureManager({
        figures: [
            { label: "step-0", imageSrc: "./get-started/step-0.png"},
            { label: "step-1", imageSrc: "./get-started/step-1.png"},
        ]
    });

    console.log(fm);

    const items: GetStartedCardProps[] = [
        {
            title: "Prepare your XR project",
            children: <div>
                <p>Make sure you have an XR project. Currently we are compatible with SteamVR and UnityXR projects.
                    Further XR frameworks are coming soon. If you are interested to make it your own compatible than contact us
                    on Discord.</p>

                <fm.Figure caption="Screenshot of a XR start project" label="step-0" />
            </div>
        },
        {
            title: "Prepare Unity package scope (recommended)",
            children: <div>

                <strong>If you wish instead importing packages via their git url, than this step can be ignored. We strongly
                    recommend to apply this step, to get update notifications of the packages.</strong>

                <p className="pt-3 pb-3">Unity packages are only looking for packages hosted by Unity. To enable third-party
                    packages (like OmiLAXR) you need to add the registers to your project. This can do this either by Unity
                    editor or by directly edit your manifest.json file of the project.</p>

                <p className="pt-3 pb-3">We recommended to just add all scopes of OmiLAXR by using manifest.json</p>

                <p className="pt-3 pb-3">Open for this the
                    file <InlineCodeBox>&lt;project_root&gt;/Packages/manifest.json</InlineCodeBox> any code editor and look
                    for <InlineCodeBox>scopedRegistries</InlineCodeBox> entry.
                    If there is no entry, than just put next to <InlineCodeBox>dependencies</InlineCodeBox> following code.
                </p>


                <div className="w-2/3" style={{margin: "auto"}}>
                    <CodeBox language="JavaScript" filename="<project_root>/Packages/manifest.json">
                        {JSON.stringify(jsonManifest(), null, 2)}
                    </CodeBox>
                </div>

                <p className="pt-3 pb-3">
                    After saving the file, you should open Unity editor and check under <InlineCodeBox>Edit &gt; Project
                    Settings...</InlineCodeBox> if the scopes are applied (see <fm.FigureRef label="step-1" />).</p>

                <fm.Figure caption="Unity Package Manager scopes" label="step-1" />


            </div>
        }
    ];

    return (
        <ThemeProvider>
            <div className="h-full w-screen place-items-center bg-white py-20">
                <div className="container mx-auto items-center relative">
                    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">Get
                        started</h1>
                    <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                    Here, educators, students, and developers can find technical guides, best practices, case
                        studies, and examples. Whether you're
                        new to XR or an experienced developer, you'll find
                        useful information to help you integrate XR into learning.
                    </p>

                    <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                        We hope you find our resources helpful. Thank you for exploring XR in education with us.
                    </p>

                    {
                        items.map(({title, children, image}, index) => (
                            <GetStartedCard key={index} title={`Step ${index}: ${title}`}
                                            image={image}
                                            swapCells={index % 2 != 0}>
                                {children}
                            </GetStartedCard>
                        ))
                    }
                </div>
            </div>
        </ThemeProvider>
);
}

export default GetStartedPresentation;