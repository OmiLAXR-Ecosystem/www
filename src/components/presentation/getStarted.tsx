import ThemeProvider from "../theme-provider";
import React from "react";
import {contentOf, type InstructionCardProps} from "./instructionCard";
import {InlineCodeBox} from "../CodeBox";
import {FigureManager} from "react-figure-ref";
import Hyperlink from "../Hyperlink";
import {JsonManifestCodebox} from "../jsonManifest";

const scopes = [
    "com.rwth.unity.omilaxr.xapi4unity",
    "com.rwth.unity.omilaxr",
    "com.rwth.unity.omilaxr.xapi"
];

function P({children}: any) {
    return <p className="pt-3 pb-3">{children}</p>
}

function H({children}: any) {
    return <h6 className="pt-3">{children}</h6>
}

export default function () {
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

    const items: InstructionCardProps[] = [
        {
            title: "Preparation",
            children: <div>
                <P>Make sure you have an XR project. OmiLAXRv2 has no XR framework dependency and is compatible with all of them by design. Further, it is not limited to XR projects. Simple Unity projects are compatible, too. However, you can either use a new project or choose an existing one.</P>

                <fm.Figure caption="Screenshot of a XR start project" label="step-0" maxWidth="80%"/>

                <P>In this page you will install three OmiLAXR packages. They all have following purposes:</P>

                <ul>
                    <li><strong>xAPI4Unity</strong>: A package for transforming xAPI registry JSON files to strict C# files. These files are needed to work with xAPI in a specific C# notation. It creates a new namespace <InlineCodeBox>xAPI.Registry</InlineCodeBox> that is used by <InlineCodeBox>OmiLAXR.xAPI</InlineCodeBox>.</li>
                    <li><strong>OmiLAXR</strong>: This is the base package delivering the complete base for the whole <a href="/pipeline">OmiLAXR pipeline</a> but without any specific data standard.</li>
                    <li><strong>OmiLAXR.xAPI</strong>: As OmiLAXR gives you the possibility to use any data standard you need. This package uses <InlineCodeBox>xAPI.Registry</InlineCodeBox> and enables a new notation to build xAPI statements with like-spoken C# syntax. It contains OmiLAXR components using xAPI as data standard.</li>
                </ul>
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

                <div className="columns-2xl max-w-[100vw]">

                    <JsonManifestCodebox scopes={scopes}></JsonManifestCodebox>

                    <fm.Figure className="align-middle"  maxWidth="100%" caption="Unity Package Manager scopes (amount of packages can differ)" label="step-1"/>

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

                <P>In Unity menu navigate to <InlineCodeBox>Window &gt; Package Manager</InlineCodeBox>.</P>

                <P>Choose <InlineCodeBox>My Registries</InlineCodeBox> and select the available package in the list (see <fm.FigureRef label="my-registries"/>). Here you will be able to update your packages.</P>

                <fm.Figure caption="My Unity Registries (amount of packages can differ)" label="my-registries" maxWidth="70%"/>

                <P>Alternatively, you can add packages by using the <InlineCodeBox>+</InlineCodeBox> in the top left corner. Type
                    there <InlineCodeBox clipboardButton={true}>com.rwth.unity.omilaxr.xapi4unity</InlineCodeBox> into the "name" field
                    (see <fm.FigureRef label="step-3"/>). More details about this package you can read
                    in <Hyperlink>https://gitlab.com/learntech-rwth/omilaxr-ecosystem/xapi-4-unity</Hyperlink>.
                </P>

                <fm.Figure caption="Installing Unity package" label="step-3" maxWidth="100%"/>
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

                <P> Check in <InlineCodeBox>OmiLAXR &gt; Settings</InlineCodeBox>
                    whether everything is configured correctly.
                    Now, you have to check if every path is correct. The recommended settings are defined by default.
                    Here, you have two options.</P>

                <ul>
                    <li><strong>(Option 1) I want to use git</strong>: You can add a git submodule to your project. This
                        makes sense if you want to sync your local registry changes with a separate git repository or
                        contribute to a global repository. Of course, you can do it totally on your own, but the tool
                        window gives you the possibility to choose a target git repository and branch. By default it
                        will use our git repository and. Make sure you have no error messages and your window looks
                        similar to <fm.FigureRef label="xapi4unity"/>.
                    </li>
                    <li><strong>(Option 2) I want just to download local copy</strong>: It is also allowed to use a
                        local copy without a separate git. This makes sense if you plan to hold your local registry
                        changes inside your project repository. This can make sense if you plan a lot of
                        project-specific xAPI definitions. If you click on the button, the newest files will be
                        downloaded from our repository. All you need to do is to extract the content into your wished
                        path (recommended <InlineCodeBox>Assets/xapi</InlineCodeBox>). Make sure you have the
                        `definitions` folder in root of <InlineCodeBox>Assets/xapi</InlineCodeBox>.
                    </li>
                </ul>

                <P>
                    To (re-)transform the JSON files to C# you have to click the button <InlineCodeBox>Update xAPI.Registry</InlineCodeBox>. After
                    transformation you shall have the
                    folder <InlineCodeBox>Assets/xAPI.Registry</InlineCodeBox> containing
                    all C# files.
                </P>

                <fm.Figure caption="xAPI4Unity Config Window" label="xapi4unity" maxWidth="70%"/>
            </div>
        },
        {
            title: "Install OmiLAXR Framework",
            children: <div>

                <P>Use again "My Registries" and install <InlineCodeBox>OmiLAXR.xAPI</InlineCodeBox> package (see <fm.FigureRef label="my-registries"/>). As it depends on OmiLAXR package, it will be installed, too.</P>

                <fm.Figure caption="Installed OmiLAXR" label="installed-omilaxr" maxWidth="70%"/>

                <P>Alternatively, open <InlineCodeBox>Window &gt; Package Manager</InlineCodeBox> and install the
                    package <InlineCodeBox
                        clipboardButton={true}>com.rwth.unity.omilaxr.xapi</InlineCodeBox>
                    (see <fm.FigureRef label="installed-omilaxr"/>).
                </P>

                <div className="pt-3"></div>
                <h5 style={{fontSize: "20px"}}>(Optional, if you are using Assembly Definitions): Include OmiLAXR to your project</h5>
                <P>If you plan to use the Module Template (<a href="#section-6">Step 6</a>), you can skip the next
                    instruction.</P>
                <P>We your project is not using any asmdef-file it should work without including
                    OmiLAXR asmdef file.
                    But we recommend to use a asmdef file in your project. To do this create with right click in assets
                    window a new one <InlineCodeBox>Assembly Definition</InlineCodeBox> in root of your Unity scripts.
                    After that you have to include OmiLAXR to your project. To achieve this follow these steps:</P>

                <ol>
                    <li>(1) Select your asmdef file.</li>
                    <li>(2) Add a new entry in <InlineCodeBox>Assembly Definition References</InlineCodeBox> in
                        <InlineCodeBox>Inspector</InlineCodeBox> window (see <fm.FigureRef label="asmdef-inspector"/>).
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

                <P>The modular architecture of OmiLAXR enables to implemented needed modules for all XR frameworks.
                    Depending on needs, they differ in interaction and teleport behavior or player game object hierarchies.</P>

                <P>The modular architecture is explained in the <a href="/pipeline">Pipeline</a> instruction. Click on
                    the link to continue your work.</P>

                <P>Working with OmiLAXR means to implement components of the pipeline and add this way more functionality to the pipeline.
                    This can be done either by working in an own Unity package (see in the bottom) holding these classes or holding them in a folder inside of "Assets".</P>

                <P><InlineCodeBox>OmiLAXR</InlineCodeBox> modules are following a strict structure. They provide
                    prefabs <fm.FigureRef label="prefabs"/>. Example scripts can be found
                    &nbsp;<a className="underline" target="_blank"
                             href="https://gitlab.com/learntech-rwth/omilaxr-ecosystem/v2/omilaxr.module-template/-/tree/main/Runtime/Examples">here</a>.</P>

                <fm.Figure caption={"OmiLAXR Prefabs"} label={"prefabs"} maxWidth={"50%"}/>

                <div className="pt-3"></div>
                <h5 style={{fontSize: "20px"}}>(Optional, if you wish to work in separate Unity packages): Creating OmiLAXR modules</h5>
                <P>In OmiLAXRv2 we are working with so called "modules". The <a href="/pipeline">Pipeline</a> consists of components. Modules are a collection of components to extend or create OmiLAXR pipelines.</P>
                <P>This way you can split your LA work into an own repository.</P>
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
};