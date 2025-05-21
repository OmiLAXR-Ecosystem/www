import ThemeProvider from "../theme-provider";
import React from "react";
import {contentOf, type InstructionCardProps} from "./instructionCard";
import {InlineCodeBox} from "../CodeBox";
import {FigureManager} from "react-figure-ref";
import Hyperlink from "../Hyperlink";
import {JsonManifestCodebox} from "../jsonManifest";
import Tabs from "../Tabs";

const scopes = [
    "com.rwth.unity.omilaxr.xapi4unity",
    "com.rwth.unity.omilaxr",
    "com.rwth.unity.omilaxr.xapi"
];

function P({children, ...props}: any) {
    return <p className="pt-3 pb-3" {...props}>{children}</p>
}

function H({children}: any) {
    return <h6 className="pt-3">{children}</h6>
}

export default function () {

    const fm = new FigureManager({
        figures: [
            {label: "omilaxr-workflow", imageSrc: "/OmiLAXR_Workflow_generic_small.jpg"},
            {label: "step-0", imageSrc: "/get-started/step-0.png"},
            {label: "my-registries-2023", imageSrc: "/get-started/my-registries-2023.png"},
            {label: "my-registries", imageSrc: "/get-started/my-registries.png"},
            {label: "xapi4unity-menu", imageSrc: "/get-started/xAPI4Unity_Menu.png"},
            {label: "xapi4unity", imageSrc: "/get-started/xapi4unity.png"},
            {label: "installed-omilaxr", imageSrc: "/get-started/installed-omilaxr.png"},
            {label: "asmdef-inspector", imageSrc: "/get-started/asmdef.png"},
            {label: "prefabs", imageSrc: "/get-started/prefabs.png"},
            {label: "prefabs-2", imageSrc: "/get-started/prefabs-2.png"},
            {label: "prefabs-in-hierarchy", imageSrc: "/get-started/prefabs-in-hierarchy.png"},
            {label: "add-from-disk", imageSrc: "/get-started/add-from-disk.png"},
            {label: "unityxr", imageSrc: "/get-started/unityxr.png"},
            {label: "mrtk2", imageSrc: "/get-started/mrtk2.png"},
            {label: "unityxr-prefab", imageSrc: "/get-started/unityxr-prefab.png"},
            {label: "endpoints", imageSrc: "/get-started/endpoints.png"},
            {label: "credentials.json", imageSrc: "/get-started/credentials-json.png"},
            {label: "create-credentials.json", imageSrc: "/get-started/create-credentials-json.png"},
            {label: "osx-allow-java", imageSrc: "/get-started/osx-allow-java.png"},
            {label: "yetanalytics", imageSrc: "/get-started/yetanalytics.png"},

            {label: "discord", imageSrc: "/get-started/discord.png"},

            {label: "step-1", imageSrc: "/get-started/scoped-registry.png"},
        ]
    });

    const items: InstructionCardProps[] = [
        {
            title: "Overview of the Workflow",
            children: <div>
                <P>To streamline development with IDE support and ensure consistency, we provide a tool that converts the xAPI registry into C# code. Start by importing this tool. Refer to <fm.FigureRef label="omilaxr-workflow"/> for an overview.</P>
                <fm.Figure caption="Overview of the OmiLAXR workflow" label="omilaxr-workflow" maxWidth="50%"/>
                <P>We maintain xAPI definitions through a structured registry, organized as <InlineCodeBox>&lt;context&gt;/&lt;defType&gt;/&lt;defName&gt;.json</InlineCodeBox> for modular and reusable definitions. Our tool translates these definitions into static C# classes, avoiding typos and inconsistencies.</P>
                <P>These definitions can be integrated into your XR application to create custom xAPI statements, provided to a Learning Record Store (LRS). Developers also learn from tracked scenarios and update the registry with new definitions for broader community use.</P>
            </div>
        },
        {
            title: "Preparation",
            children: <div>
                <P>Ensure you have a Unity project where you plan to integrate this framework. OmiLAXRv2 is compatible with all Unity projects—both XR and non-XR.</P>
                <fm.Figure caption="XR Starter Project Screenshot" label="step-0" maxWidth="80%"/>
                <P>In this guide, you'll install three Unity packages:</P>
                <ul>
                    <li><InlineCodeBox>xAPI4Unity</InlineCodeBox>: Transforms JSON definitions into C# code.</li>
                    <li><InlineCodeBox>OmiLAXR</InlineCodeBox>: The base module for added functionality.</li>
                    <li><InlineCodeBox>OmiLAXR.xAPI</InlineCodeBox>: Adds xAPI handling tools and components.</li>
                </ul>
                <P><strong style={{color: "red" }}>For OmiLAXR.xAPI below 2.0.16: Packages must be installed in the mentioned order: (1) xAPI4Unity → (2) OmiLAXR → (3) OmiLAXR.xAPI.</strong></P>
            </div>
        },
{
            title: "Prepare Unity Package Scope",
            children: <div>
                <strong>If you prefer installing packages by Git URL, skip this step. Otherwise, follow these instructions to manage package updates:</strong>
                <P>Unity only recognizes Unity-hosted packages by default. To support third-party packages like <InlineCodeBox>OmiLAXR</InlineCodeBox>, update your `manifest.json` file to include the required scopes.</P>
                <P>Edit <InlineCodeBox>&lt;project_root&gt;/Packages/manifest.json</InlineCodeBox> and add the following within <InlineCodeBox>scopedRegistries</InlineCodeBox> if missing:</P>
                <JsonManifestCodebox scopes={scopes}></JsonManifestCodebox>
                <P>Once updated, restart Unity and verify the scopes via <InlineCodeBox>Edit &gt; Project Settings...</InlineCodeBox> as shown in <fm.FigureRef label="step-1"/>.</P>
            </div>
        },
        {
            title: "Install xAPI4Unity Package",
            children: <div>
                <P>In Unity, navigate to <InlineCodeBox>Window &gt; Package Manager</InlineCodeBox> → <InlineCodeBox>My Registries</InlineCodeBox> to locate and install the package (see <fm.FigureRef label="my-registries"/>).</P>
                <Tabs tabs={[{
                    id: "unity-2023",
                    label: "Unity 2023+",
                    content: <fm.Figure caption="My Registries in Unity (2023+)" label="my-registries-2023" maxWidth="70%"/>
                }, {
                    id: "unity-2022",
                    label: "< Unity 2023",
                    content: <fm.Figure caption="My Registries in Unity (<2023)" label="my-registries" maxWidth="70%"/>
                }]}/>
                <P>Alternatively, use the <InlineCodeBox>+</InlineCodeBox> button in the Package Manager and add the package by entering <InlineCodeBox clipboardButton={true}>com.rwth.unity.omilaxr.xapi4unity</InlineCodeBox>.</P>
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
                    in progress). We maintain our registry in our GitLab
                    repository <Hyperlink>https://gitlab.com/learntech-rwth/xapi</Hyperlink>.
                    For a more user friendly maintenance we created an user
                    interface <Hyperlink>https://xapi.elearn.rwth-aachen.de/</Hyperlink></P>

                <P> Check in <InlineCodeBox>xAPI4Unity &gt; Setup xAPI Definitions</InlineCodeBox>
                    whether everything is configured correctly.
                    Now, you have to check if every path is correct. The recommended settings are defined by default.
                    Here, you have three options. You can click through them because you need confirm again before action get executed.</P>

                <fm.Figure caption={"xAPI4Unity Menu"} label={"xapi4unity-menu"} />

                <ul>
                    <li><strong>(Option 1) I want to download a local copy and place it in projects 'Assets' folder</strong>:
                        In this case the <a href="https://gitlab.com/learntech-rwth/xapi/-/tree/master?ref_type=heads" target="_blank">latest xAPI repository version of 'master' branch</a> will be downloaded and extracted directly into your
                        Assets folder. This way the xAPI definitions will be part of your project repository (<InlineCodeBox>Assets/xapi</InlineCodeBox>). This option is used most commonly.
                    </li>
                    <li><strong>(Option 2) I want just to download local copy to selected path</strong>: It is also allowed to use a
                        local copy without a separate git. This makes sense if you plan to hold your local registry
                        changes inside your project repository. This can make sense if you plan a lot of
                        project-specific xAPI definitions. If you click on the button, the newest files will be
                        downloaded from our repository. All you need to do is to extract the content into your wished
                        path (recommended <InlineCodeBox>Assets/xapi</InlineCodeBox>). Make sure you have the
                        `definitions` folder in root of <InlineCodeBox>Assets/xapi</InlineCodeBox>.
                    </li>
                    <li><strong>(Option 3) I want to use git and clone it to my selected path</strong>: You can add a git submodule to your project. This
                        makes sense if you want to sync your local registry changes with a separate git repository or
                        contribute to a global repository. Of course, you can do it totally on your own, but the tool
                        window gives you the possibility to choose a target git repository and branch. By default it
                        will use our git repository and. Make sure you have no error messages and your window looks
                        similar to <fm.FigureRef label="xapi4unity"/>.
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

                <fm.Figure caption="Installed (xAPI4Unity, OmiLAXR and OmiLAXR.xAPI)" label="installed-omilaxr" maxWidth="70%"/>

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

                <P>Working with OmiLAXR means to implement components of the pipeline and add this way more functionality to the pipeline.
                    This can be done either by working in an own Unity package (see in the bottom) holding these classes or holding them in a folder inside of "Assets".</P>

                <P><InlineCodeBox>OmiLAXR</InlineCodeBox> modules are following a strict structure. They provide
                    prefabs that can be used to start directly (see <fm.FigureRef label="prefabs"/>, <fm.FigureRef label="prefabs-2"/> and <fm.FigureRef label="prefabs-in-hierarchy"/>).</P>

                <P style={{fontSize:"1.5em"}}>&gt;&gt;&gt; To see the modular architecture basics and some code examples click <a href="/pipeline">here</a>. &lt;&lt;&lt;</P>

                <P>Example scripts can be found
                    &nbsp;<a className="underline" target="_blank"
                             href="https://gitlab.com/learntech-rwth/omilaxr-ecosystem/v2/omilaxr.module-template/-/tree/main/Runtime/Examples">here</a> (Attention: Currently they are a bit outdated and will be updated later).</P>

                <fm.Figure caption={"OmiLAXR Prefab"} label={"prefabs"} maxWidth={"50%"}/>
                <fm.Figure caption={"OmiLAXR.xAPI Prefab"} label={"prefabs-2"} maxWidth={"50%"}/>
                <fm.Figure caption={"OmiLAXR Prefabs in Hierarchy"} label={"prefabs-in-hierarchy"} maxWidth={"50%"}/>
            </div>
        },
        {
            title: "Install your needed XR SDK Module",
            children: <div>
                <P>To support XR interactions it is needed to install a OmiLAXR module, that supports the SDK-specific components.</P>
                <P>We are working on several components. Please take a look into those which are already published.</P>
                <P>If you cannot find them in your Unity registry, please take a look <Hyperlink url="/ecosystem">here</Hyperlink>.</P>

                <Tabs tabs={[{
                    id: "unityxr",
                    label: "UnityXR",
                    content: <fm.Figure caption="OmiLAXR.UnityXR" label="unityxr" maxWidth="70%"/>
                }, {
                    id: "mrtk",
                    label: "MRTK2",
                    content: <fm.Figure caption="OmiLAXR.MRTK2" label="mrtk2" maxWidth="70%"/>
                }]}/>

                <P>After installing the XR module of your choice, you can use their prefabs for starting quick using <InlineCodeBox>OmiLAXR</InlineCodeBox>. See one example in <fm.FigureRef label={"unityxr-prefab"} />.</P>

                <fm.Figure caption={"OmiLAXR.UnityXR Prefab"} label={"unityxr-prefab"} maxWidth={"50%"}/>
            </div>
        },
        {
            title: "Configure a OmiLAXR Endpoint",
            children: <div>
                <P>To create some statements you need to setup an endpoint. You can use multiple endpoints to providing data. One of our default endpoints is <InlineCodeBox>StatementPrinter</InlineCodeBox>. This one can be used to print statements into Unity console. The other one is a Learning Record Store. In <fm.FigureRef label={"endpoints"} /> we have disabled the LRS components and just enabled <InlineCodeBox>PrintStatement</InlineCodeBox> component. If you still want to use the Learning Record Store component you need to keep it enabled.</P>

                <fm.Figure maxWidth={"75%"} caption={"OmiLAXR Default Endpoints"} label={"endpoints"} />

                <P>You can either provide credentials of your Learning Record Store (LRS) by changing your <InlineCodeBox>Streaming Assets / credentials.json</InlineCodeBox> (see <fm.FigureRef label={"credentials.json"} />) file. If you haven't a <InlineCodeBox>credentials.json</InlineCodeBox> yet, you can create one via <InlineCodeBox>OmiLAXR &gt; Create credentials.json</InlineCodeBox>  (see <fm.FigureRef label={"create-credentials.json"} />). As Learning Record Store you can use several solutions. Here are some LRS we recommend:</P>

                <ul style={{listStyle: "disc", paddingLeft: "20px"}}>
                    <li><Hyperlink url="https://learninglocker.atlassian.net/wiki/spaces/DOCS/overview">Learning Record Store</Hyperlink> for production use.</li>
                    <li><Hyperlink url="https://www.yetanalytics.com/sql-lrs">YetAnalytics LRSQL</Hyperlink> for development</li>
                </ul>

                <P>Follow the next instructions, to see how to setup an own LRS.</P>

                <fm.Figure maxWidth={"50%"} caption={"Assets / Streaming Assets / credentials.json"} label={"credentials.json"} />
                <fm.Figure maxWidth={"50%"} caption={"Create credentials.json file"} label={"create-credentials.json"} />

                <h5 style={{"fontWeight": "bold", "fontSize": "1.2em"}}>How to setup local Learning Record Store</h5>
                <P>For developing purposes we preconfigured LRSQL that you can use.</P>

                <ol style={{listStyle: "decimal", paddingLeft: "20px"}}>
                    <li><Hyperlink url="https://rwth-aachen.sciebo.de/s/SQgrxeH1TzEWQOf/download">Download preconfigured SQLRS</Hyperlink>.</li>
                    <li>Unpack the zip file.</li>
                    <li>Open LRSQL
                        <ul style={{listStyle: "disc", paddingLeft: "20px"}}>
                            <li>Windows: Open <InlineCodeBox>lrsql.exe</InlineCodeBox></li>
                            <li>OSX: Execute in terminal <InlineCodeBox>&gt; ./bin/run_sqlite.sh</InlineCodeBox> (it can happen that you need to make it executable with chmod and allow to open the application over preferences and data privacy).</li>
                        </ul>
                    </li>
                    <li>Visit <Hyperlink>http://localhost:8080/</Hyperlink> and login with the preconfigured username <InlineCodeBox>admin</InlineCodeBox> and password <InlineCodeBox>admin</InlineCodeBox>.</li>
                    <li>Now, you can see the dashboard of the LRS (see <fm.FigureRef label={"yetanalytics"} />).</li>
                    <li>You can pick LRS credentials from this dashboard. Our preconfigured credentials are API <InlineCodeBox>db3e9b32e6c2ceeb06c69a98ad3315c0137999172a4c3e56339bb61c94340872</InlineCodeBox> and the API Secret <InlineCodeBox>30cfcff6247a86c8023968a30956c8cea6a43e416faeb96c30fb7c9d4a10e46e</InlineCodeBox> (change it if you use it for production on server, for development it is enough). The default endpoint host is <InlineCodeBox>http://localhost:8080/xapi/</InlineCodeBox>.</li>
                    <li>Enter these credentials into your <InlineCodeBox>credentials.json</InlineCodeBox>. You can also download a ready file <Hyperlink url="https://rwth-aachen.sciebo.de/s/eAZYCVf6lMHhVsv/download">here</Hyperlink>.</li>
                    <li>You can see created statements in your LRS, now.</li>
                </ol>

                <fm.Figure caption={"Allow Java in Preferences"} label={"osx-allow-java"} />
                <fm.Figure caption={"YetAnalytics LRSQL"} label={"yetanalytics"} />
            </div>
        },
        {
            title: "Join our Discord server",
            children: <div>
                <P>Our Discord server has update notes and a community, where everyone is working with OmiLAXR.</P>
                <P>Join and work within a community! Click <Hyperlink url={'https://discord.gg/AnUXutpHZz'}>here</Hyperlink>.</P>

                <fm.Figure caption={"OmiLAXR Discord server"} label={"discord"} />
            </div>
        },
        {
            title: "Contribute and share with the community",
            children: <div>
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
        }
    ];

    return (
        <ThemeProvider>
            <div className="h-full w-screen place-items-center bg-white py-20">
                <div className="container mx-auto items-center relative">
                    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">Get
                        started</h1>
                    <P>Already installed OmiLAXRv2? Continue with the <a href="/pipeline" className="underline">Pipeline</a> instruction.</P>

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