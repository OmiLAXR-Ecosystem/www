import ThemeProvider from "../theme-provider";
import React from "react";
import GetStartedCard, {contentOf, type GetStartedCardProps} from "./getStartedCard";
import CodeBox, {InlineCodeBox} from "../CodeBox";
import {FigureManager} from "react-figure-ref";
import Hyperlink from "../Hyperlink";

const scopes = [
    "com.rwth.unity.omilaxr.xapi4unity",
    "com.rwth.unity.omilaxr",
    "com.rwth.unity.omilaxr.xapi",
    "com.rwth.unity.omilaxr.pseudonymization"
];

const jsonManifest = () => ({
    "dependencies": {"...": "..."},
    "scopedRegistries": [
        {
            "name": "npmjs",
            "url": "https://registry.npmjs.com",
            "scopes": scopes
        },
    ]
});

function P({children}: any) {
    return <p className="pt-3 pb-3">{children}</p>
}

function H({children}: any) {
    return <h6 className="pt-3">{children}</h6>
}

export function GetStartedPresentation() {
    const fm = new FigureManager({
        figures: [
            {label: "step-0", imageSrc: "/get-started/step-0.png"},
            {label: "step-1", imageSrc: "/get-started/scoped-registry.png"},
            {label: "step-3", imageSrc: "/get-started/step-3.jpg"},
            {label: "my-registries", imageSrc: "/get-started/my-registries.png"},
            {label: "xapi4unity", imageSrc: "/get-started/xapi4unity.png"},
            {label: "add-from-disk", imageSrc: "/get-started/add-from-disk.png"},
            {label: "omilaxr-workflow", imageSrc: "/OmiLAXR_Workflow_generic_small.jpg"},
            {label: "using-xapi", imageSrc: "/Using_xAPI_v2.webm"},
            {label: "trackable-register", imageSrc: "/get-started/Trackable_Register.png"},
            {label: "installed-omilaxr", imageSrc: "/get-started/installed-omilaxr.png"},
            {label: "asmdef-inspector", imageSrc: "/get-started/asmdef.png"},
            {label: "prefabs", imageSrc: "/get-started/prefabs.png"},
        ]
    });

    const items: GetStartedCardProps[] = [
        {
            title: "Prepare your XR project",
            children: <div>
                <P>Make sure you have an XR project. Currently we are compatible with SteamVR and UnityXR projects.
                    Further XR frameworks are coming soon. If you are interested to make it your own compatible than
                    contact us
                    on Discord.</P>

                <fm.Figure caption="Screenshot of a XR start project" label="step-0" maxWidth="50%"/>
            </div>
        },
        {
            title: "Prepare Unity package scope",
            children: <div>

                <strong>If you wish instead importing packages via their git url, than this step can be ignored. We
                    strongly
                    recommend to apply this step, to get update notifications of the packages.</strong>

                <P>Unity packages are only looking for packages hosted by Unity. To enable
                    third-party packages (like <InlineCodeBox>OmiLAXR</InlineCodeBox>) you need to add the registers to your project.
                    This can do this either by Unity editor or by directly edit your manifest.json file of the project.</P>

                <P>We recommended to just add all scopes of OmiLAXR by using manifest.json</P>

                <P>Open for this the
                    file <InlineCodeBox>&lt;project_root&gt;/Packages/manifest.json</InlineCodeBox> any code editor and
                    look for <InlineCodeBox>scopedRegistries</InlineCodeBox> entry.
                    If there is no entry, than just put next to <InlineCodeBox>dependencies</InlineCodeBox> following
                    code.
                </P>

                <P>
                    After saving the file, you should open Unity editor and check under <InlineCodeBox>Edit &gt; Project
                    Settings...</InlineCodeBox> if the scopes are applied (see <fm.FigureRef label="step-1"/>). Further modules are coming soon.
                </P>

                <div className="columns-2xl">

                    <CodeBox language="JavaScript" filename="<project_root>/Packages/manifest.json">
                        {JSON.stringify(jsonManifest(), null, 2)}
                    </CodeBox>

                    <fm.Figure className="align-middle" caption="Unity Package Manager scopes" label="step-1"/>

                </div>
            </div>
        },

        {
            title: "Install xAPI4Unity package",
            children: <div>
                <P>For working more easy, consistent and IDE-supported, we created a tool
                    which transforms the xAPI registry into C# code you can use. In this step you will import this
                    tool. In <fm.FigureRef label="omilaxr-workflow"/> you can get an overview of our idea.
                </P>

                <fm.Figure caption="Compact overview of the OmiLAXR workflow" label="omilaxr-workflow" maxWidth="50%"/>

                <P>In Unity menu navigate to <InlineCodeBox>Window &gt; Package
                    Manager</InlineCodeBox>, then on <InlineCodeBox>+</InlineCodeBox> in the top left corner. Type
                    now <InlineCodeBox>com.rwth.unity.omilaxr.xapi4unity</InlineCodeBox> into the "name" field
                    (see <fm.FigureRef label="step-3"/>). More details about this package you can read
                    in <Hyperlink>https://gitlab.com/learntech-rwth/omilaxr-ecosystem/xapi-4-unity</Hyperlink>.
                </P>

                <fm.Figure caption="Installing Unity package" label="step-3"/>

                <P>Alternatively you can go to "My registries" and just select
                    the available package in the list (see <fm.FigureRef label="my-registries"/>).
                </P>

                <fm.Figure caption="My Unity registries" label="my-registries" maxWidth="70%"/>

                <h5 style={{fontSize: "20px"}}>xAPI4Unity Window</h5>
                <P>Now, xAPI4Unity is installed and can be used in your Unity project. If you
                    already have the folder <InlineCodeBox>Assets/xapi</InlineCodeBox> then you can use it directly. But
                    we recommend to check whether everything is configured correctly. For doing this, go
                    to <InlineCodeBox>OmiLAXR &gt; xAPI &gt; Open Fetcher Window</InlineCodeBox>.
                    Now, you have to check if every path is correct. The recommended settings are defined by default.
                    If you haven't cloned a xAPI repository folder, yet you can do it by clicking the "Clone repository"
                    button. Make sure you have no error messages and your window looks similar to <fm.FigureRef label="xapi4unity"/>.
                    To (re-)transform the JSON files to C# you have to click the button "Transform JSON =&lt; C#". After
                    transformation you shall have the
                    folder <InlineCodeBox>Assets/xAPI.Registry</InlineCodeBox> containing
                    all C# files.
                </P>

                <fm.Figure caption="xAPI4Unity Config Window" label="xapi4unity" maxWidth="70%"/>


            </div>
        },

        {
            title: "Prepare xAPI Registry",
            children: <div>
                <P>For data tracking we are using the xAPI data format. To get an idea of the
                    eXperience API please read the official documentation
                    (<Hyperlink>https://xapi.com/statements-101/</Hyperlink>).</P>

                <P>For standardization purpose we established an own xAPI registry specialized for
                    different research domains. One domain
                    is <InlineCodeBox>virtualReality</InlineCodeBox> (<InlineCodeBox>extendedReality</InlineCodeBox> is
                    in progress). We maintain our registry on in our GitLab
                    repository <Hyperlink>https://gitlab.com/learntech-rwth/xapi</Hyperlink>.
                    For a more user friendly maintenance we created an user
                    interface <Hyperlink>https://xapi.elearn.rwth-aachen.de/</Hyperlink></P>

                <P>OmiLAXR is using this registry for tracking interactions of the XR scenarios.
                    This is why you will need a local copy of the xAPI repository.</P>
                <P>Follow the steps of <fm.FigureRef label="xapi4unity"/> or alternatively do:</P>


                <ul>
                    <li>(a) Download zip and unpack inside your Unity project and maintain it in your XR project.</li>
                    <li>(b) Request a branch in our official repository and clone it as submodule into your Unity project.</li>
                    <li>(c) Fork our repository and clone the fork as submodule into your Unity project.</li>
                    <li>(d) Include Unity package of xAPI registry (currently not available)</li>
                </ul>

                <P>As we invite you to contribute to new vocabulary we strongly recommend option (c).</P>

                <P>After you have prepared the repository you shall have a <InlineCodeBox>xapi</InlineCodeBox> folder in your project.
                    We strongly recommend to place it into <InlineCodeBox>Assets</InlineCodeBox> folder.</P>


            </div>
        },
        {
            title: "Install OmiLAXR Framework",
            children: <div>

                <P>Open <InlineCodeBox>Window &gt; Package Manager</InlineCodeBox> and install the
                    packages <InlineCodeBox>com.rwth.unity.omilaxr</InlineCodeBox> and <InlineCodeBox>com.rwth.unity.omilaxr.xapi</InlineCodeBox>
                    (see <fm.FigureRef label="installed-omilaxr"/>).
                    You can do this by using the namespaces (recommended) or their git urls.
                </P>

                <P>Another convenient way to do it is to install by selecting from "My Registries" (see <fm.FigureRef label="my-registries" />).</P>

                <fm.Figure caption="Installed OmiLAXR" label="installed-omilaxr" maxWidth="70%"/>

                <div className="pt-3"></div>
                <h5 style={{fontSize: "20px"}}>Include OmiLAXR to your project</h5>
                <P>If you plan to use the Module Template (<a href="#section-6">Step 6</a>), you can skip the next instruction.</P>
                <P>We your project is not using any asmdef-file it should work without including
                    OmiLAXR asmdef file.
                    But we recommend to use a asmdef file in your project. To do this create with right click in assets
                    window a new one <InlineCodeBox>Assembly Definition</InlineCodeBox> in root of your Unity scripts.
                    After that you have to include OmiLAXR to your project. To achieve this follow these steps:</P>

                <ol>
                    <li>(1) Select your asmdef file.</li>
                    <li>(2) Add a new entry in <InlineCodeBox>Assembly Definition References</InlineCodeBox> in
                        <InlineCodeBox>Inspector</InlineCodeBox> window (see <fm.FigureRef label="asmdef-inspector" />).
                    </li>
                    <li>(3) Select <InlineCodeBox>OmiLAXR</InlineCodeBox> by double click.</li>
                    <li>(4) Repeat the same for <InlineCodeBox>OmiLAXR.xAPI</InlineCodeBox>.</li>
                    <li>(5) Scroll down in <InlineCodeBox>Inspector</InlineCodeBox> window and click on "Apply".</li>
                </ol>

                <P>Now, you have successfully installed the base packages for OmiLAXR.</P>

                <fm.Figure caption="Assembly Defintion File Inspector" label="asmdef-inspector" maxWidth="50%" />
            </div>
        },
        {
            title: "Start working with OmiLAXR",
            children: <div>

                <P>Supporting all XR frameworks is not trivial. They differ (for example) in
                    interaction and teleport behavior or player game object hierarchies. This is why OmiLAXR is
                    organized in modules.</P>

                <P>To continue look into <a href="/pipeline">Pipeline</a> instruction.</P>

                <P><InlineCodeBox>OmiLAXR</InlineCodeBox> modules are following a strict structure. They provide
                prefabs <fm.FigureRef label="prefabs" />. Further details can be read
                &nbsp;<a className="underline" href="https://gitlab.com/learntech-rwth/omilaxr-ecosystem/v2/omilaxr.module-template/-/tree/main?ref_type=heads">here</a>.</P>

                <fm.Figure caption={"OmiLAXR Prefabs"} label={"prefabs"} maxWidth={"50%"} />

                <P>Further, some example components can be found in the module template <Hyperlink>https://gitlab.com/learntech-rwth/omilaxr-ecosystem/v2/omilaxr.module-template</Hyperlink>.</P>
            </div>
        },

        {
            title: "Working with OmiLAXR modules",
            children: <div>
                <P>In OmiLAXRv2 we are working with so called "modules". The <a href="/pipeline">Pipeline</a> consists of components. Modules are a collection of components to extend or create OmiLAXR pipelines.</P>
                <P>We <strong>strongly</strong> recommend to create an own module for your project. This way you can split your LA work into an own repository. Anyway, it is also possible and good practise if you wish to place it inside your project.</P>
                <P>To do LA work, you can either place all components in an own folder inside your project or you can work with an own module following this template.</P>
                <P>If you want to place the module inside your XR project repository, it is enough to download the project by ZIP from <Hyperlink>https://gitlab.com/learntech-rwth/omilaxr-ecosystem/v2/omilaxr.module-template</Hyperlink>.</P>

                <ul>
                    <li>(a) Fork the following repository <Hyperlink>https://gitlab.com/learntech-rwth/omilaxr-ecosystem/v2/omilaxr.module-template</Hyperlink> and fork your clone.</li>
                    <li>(b) In Unity menu navigate to <InlineCodeBox>Window &gt; Package
                        Manager</InlineCodeBox>, then on <InlineCodeBox>+</InlineCodeBox> in the top left corner. Then click on
                        <InlineCodeBox>Add from disk...</InlineCodeBox> (see <fm.FigureRef label="add-from-disk" />).

                        <fm.Figure maxWidth="700px" className="align-middle" caption="Add package from disk" label="add-from-disk"/>
                    </li>
                    <li>(c) Navigate to the cloned project(s) and select its <InlineCodeBox>package.json</InlineCodeBox>.</li>
                    <li>(d) Now you have imported the package into your project and you can start to work.</li>
                    <li>(e) Adjust all "YOUR_MODULE_NAME" entries in the module package (e.g. in README.md, package.json, asmdef-File, asmdef-File name, Namespaces of scripts). This can be done step by step.</li>
                </ul>

                <P>In case you want to contribute to OmiLAXR by extending or changing OmiLAXR modules, use can use the same workflow. For contribution we recommend to create a fork of our projects and push the changes back.</P>
                <P>But here you need to clone one of these <Hyperlink>https://gitlab.com/learntech-rwth/omilaxr-ecosystem/v2</Hyperlink> repositories to your computer.</P>
            </div>
        },
    ];

    return (
        <ThemeProvider>
            <div className="h-full w-screen place-items-center bg-white py-20">
                <div className="container mx-auto items-center relative">
                    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">Get
                        started</h1>
                    <p style={{color: 'red'}}
                       className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                        Looking for v1 of OmiLAXR? Click <a href="/get-started-v1" className="underline">here</a>.
                    </p>

                    <p style={{color: 'green'}}
                       className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                        <P>Already installed OmiLAXRv2? Continue with the <a href="/pipeline" className="underline">Pipeline</a> instruction.</P>.
                    </p>

                    <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                        Here, educators, students, and developers can find technical guides, best practices, case
                        studies, and examples. Whether you're
                        new to XR or an experienced developer, you'll find
                        useful information to help you integrate XR into learning.
                    </p>

                    <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                        We hope you find our resources helpful. Thank you for exploring XR in education with us.
                    </p>

                    {contentOf(items)}
                </div>
            </div>
        </ThemeProvider>
    );
}

export default GetStartedPresentation;