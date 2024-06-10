import ThemeProvider from "../theme-provider";
import React from "react";
import GetStartedCard, {type GetStartedCardProps} from "./getStartedCard";
import CodeBox, {InlineCodeBox} from "../CodeBox";
import {FigureManager} from "react-figure-ref";
import Hyperlink from "../Hyperlink";

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
            {label: "step-0", imageSrc: "./get-started/step-0.png"},
            {label: "step-1", imageSrc: "./get-started/step-1.png"},
            {label: "step-3", imageSrc: "./get-started/step-3.jpg"},
            {label: "step-3-1", imageSrc: "./get-started/step-3-1.jpg"},
            {label: "step-3-2", imageSrc: "./get-started/step-3-2.jpg"},
            {label: "omilaxr-workflow", imageSrc: "./OmiLAXR_Workflow_generic_small.jpg"},
            {label: "using-xapi", imageSrc: "./Using_xAPI.webm"},
        ]
    });

    const items: GetStartedCardProps[] = [
        {
            title: "Prepare your XR project",
            children: <div>
                <p>Make sure you have an XR project. Currently we are compatible with SteamVR and UnityXR projects.
                    Further XR frameworks are coming soon. If you are interested to make it your own compatible than
                    contact us
                    on Discord.</p>

                <fm.Figure caption="Screenshot of a XR start project" label="step-0" maxWidth="50%"/>
            </div>
        },
        {
            title: "Prepare Unity package scope (recommended)",
            children: <div>

                <strong>If you wish instead importing packages via their git url, than this step can be ignored. We
                    strongly
                    recommend to apply this step, to get update notifications of the packages.</strong>

                <p className="pt-3 pb-3">Unity packages are only looking for packages hosted by Unity. To enable
                    third-party
                    packages (like OmiLAXR) you need to add the registers to your project. This can do this either by
                    Unity
                    editor or by directly edit your manifest.json file of the project.</p>

                <p className="pt-3 pb-3">We recommended to just add all scopes of OmiLAXR by using manifest.json</p>

                <p className="pt-3 pb-3">Open for this the
                    file <InlineCodeBox>&lt;project_root&gt;/Packages/manifest.json</InlineCodeBox> any code editor and
                    look for <InlineCodeBox>scopedRegistries</InlineCodeBox> entry.
                    If there is no entry, than just put next to <InlineCodeBox>dependencies</InlineCodeBox> following
                    code.
                </p>


                <p className="pt-3 pb-3">
                    After saving the file, you should open Unity editor and check under <InlineCodeBox>Edit &gt; Project
                    Settings...</InlineCodeBox> if the scopes are applied (see <fm.FigureRef label="step-1"/>).
                </p>

                <div className="columns-2">

                    <CodeBox language="JavaScript" filename="<project_root>/Packages/manifest.json">
                        {JSON.stringify(jsonManifest(), null, 2)}
                    </CodeBox>

                    <fm.Figure className="align-middle" caption="Unity Package Manager scopes" label="step-1"/>

                </div>

            </div>
        },
        {
            title: "Prepare xAPI Registry",
            children: <div>

                <p className="pt-3 pb-3">For data tracking we are using the xAPI data format. To get an idea of the
                    eXperience API please read the official documentation
                    (<Hyperlink>https://xapi.com/statements-101/</Hyperlink>).</p>

                <p className="pt-3 pb-3">For standardization purpose we established an own xAPI registry specialized for
                    different research domains. One domain
                    is <InlineCodeBox>virtualReality</InlineCodeBox> (<InlineCodeBox>extendedReality</InlineCodeBox> is
                    in progress). We
                    maintain our registry on in our GitLab
                    repository <Hyperlink>https://gitlab.com/learntech-rwth/xapi</Hyperlink>.
                    For a more user friendly maintenance we created an user
                    interface <Hyperlink>https://xapi.elearn.rwth-aachen.de/</Hyperlink></p>

                <p className="pt-3 pb-3">OmiLAXR is using this registry for tracking interactions of the XR scenarios.
                    This is why you will need a local copy of the xAPI repository. You have following options to get
                    it:</p>

                <ul>
                    <li>(a) Download zip and unpack inside your Unity project and maintain it in your XR project.</li>
                    <li>(b) Request a branch in our official repository and clone it as submodule into your Unity
                        project.
                    </li>
                    <li>(c) Fork our repository and clone the fork as submodule into your Unity project.</li>
                    <li>(d) Include Unity package of xAPI registry (currently not available)</li>
                </ul>

                <p className="pt-3 pb-3">As we invite you to contribute to new vocabulary we strongly recommend option
                    (c).</p>

                <p className="pt-3 pb-3">After you have prepared the repository you shall have
                    a <InlineCodeBox>xapi</InlineCodeBox> folder in your project. We strongly recommend to place it
                    into <InlineCodeBox>Assets</InlineCodeBox> folder.</p>


            </div>
        },
        {
            title: "Install xAPI4Unity package",
            children: <div>
                <p className="pt-3 pb-3">For working more easy, consistent and IDE-supported, we created a tool
                    which transforms the xAPI registry into C# code you can use. In this step you will import this
                    tool. In <fm.FigureRef label="omilaxr-workflow"/> you can get an overview of our idea.
                </p>

                <fm.Figure caption="Compact overview of the OmiLAXR workflow" label="omilaxr-workflow" maxWidth="50%"/>

                <p className="pt-3 pb-3">In Unity menu navigate to <InlineCodeBox>Window &gt; Package
                    Manager</InlineCodeBox>, then on <InlineCodeBox>+</InlineCodeBox> in the top left corner. Type
                    now <InlineCodeBox>com.rwth.unity.omilaxr.xapi4unity</InlineCodeBox> into the "name" field
                    (see <fm.FigureRef label="step-3"/>). More details about this package you can read
                    in <Hyperlink>https://gitlab.com/learntech-rwth/omilaxr-ecosystem/xapi-4-unity</Hyperlink>.
                </p>

                <fm.Figure caption="Installing Unity package" label="step-3"/>

                <p className="pt-3 pb-3">Alternatively you can go to "My registries" and just select
                    the available package in the list (see <fm.FigureRef label="step-3-1"/>).
                </p>

                <fm.Figure caption="My Unity registries" label="step-3-1"/>

                <h6>xAPI4Unity Window</h6>
                <p className="pt-3 pb-3">Now, xAPI4Unity is installed and can be used in your Unity project. If you
                    already have the folder <InlineCodeBox>Assets/xapi</InlineCodeBox> then you can use it directly. But
                    we recommend to check whether everything is configured correctly. For doing this, go
                    to <InlineCodeBox>OmiLAXR &gt; xAPI &gt; Open Fetcher Window</InlineCodeBox>.
                    Now, you have to check if every path is correct. The recommended settings are defined by default.
                    If you haven't cloned a xAPI repository folder, yet you can do it by clicking the "Clone repository"
                    button. Make sure you have no error messages and your window looks similar to <fm.FigureRef
                        label="step-3-2"/>.
                    To (re-)transform the JSON files to C# you have to click the button "Transform JSON =&lt; C#". After
                    transformation you shall have the folder <InlineCodeBox>Assets/xAPI.Registry</InlineCodeBox> containing
                    all C# files.
                </p>

                <fm.Figure caption="My Unity registries" label="step-3-2"/>

                <p className="pt-3 pb-3">From now on, if you edit JSON files inside your IDE (and safe the changes),
                    the transformation happens in background automatically. In <fm.FigureRef label="using-xapi" /> you
                can see how we build a statement. For this you need to use the static class <InlineCodeBox>xAPI_Definitions</InlineCodeBox>.
                The <InlineCodeBox>SendStatement(...)</InlineCodeBox> method is either usable inside of tracking systems and controllers (see <Hyperlink>#</Hyperlink>), but
                    also from everywhere by using <InlineCodeBox>xAPI.SendStatement(...)</InlineCodeBox> (see <Hyperlink>https://docs.omilaxr.dev/scripts/OmiLAXR.xAPI.LRS.html</Hyperlink>).</p>

                <fm.Figure caption="Preview how to build xAPI statements with IDE support" label="using-xapi" autoPlay={true} />

            </div>
        },
        {
            title: "Install OmiLAXR Framework",
            children: <div>

                package manager
                include asmdef

            </div>
        },
        {
            title: "Setup OmiLAXR Framework",
            children: <div>

                setup prefabs

                enable and disable tracking controllers

                setup LRS

                test if statements are generated

            </div>
        },
        {
            title: "How to write own tracking controllers",
            children: <div>

                Small example

            </div>
        },
        {
            title: "How to validate tracked data",
            children: <div>

                Learning Locker
                or
                ILRS

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

                    <ol>
                        {
                            items.map(({title}, index) => (
                                <ul>
                                    <a href={'#section-' + index}>{index}. {title}</a>
                                </ul>
                            ))
                        }
                    </ol>

                    {
                        items.map(({title, children, image}, index) => (
                            <section id={'section-' + index}>
                                <GetStartedCard key={index} title={`Step ${index}: ${title}`}
                                                image={image}
                                                swapCells={index % 2 != 0}>
                                    {children}
                                </GetStartedCard>
                            </section>
                        ))
                    }
                </div>
            </div>
        </ThemeProvider>
    );
}

export default GetStartedPresentation;