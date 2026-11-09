import React from "react";
import {contentOf, type InstructionCardProps} from "./instructionCard";
import CodeBox, {InlineCodeBox} from "../CodeBox";
import {FigureManager} from "../Figure";
import {INSTALLER_URL} from "../../lib/downloads";
import Hyperlink from "../Hyperlink";
import {JsonManifestCodebox} from "../jsonManifest";
import Tabs from "../Tabs";
import Package from "../Package";

const scopes = [
    "com.rwth.unity.omilaxr",
];

const mcpConfig = JSON.stringify({
    mcpServers: {
        omilaxr: {
            command: "dnx",
            args: ["OmiLAXR.MCP", "--yes"],
            env: {
                OMILAXR_WORKSPACE: ".",
                OMILAXR_UNITY_PROJECT: ".",
                OMILAXR_WRITE_ROOTS: ".",
                OMILAXR_AUTHOR: "Jane Doe <jane@example.org>"
            }
        }
    }
}, null, 2);

function P({children, ...props}: any) {
    return <p className="pt-3 pb-3" {...props}>{children}</p>
}

function H({children}: any) {
    return <h6 className="pt-3">{children}</h6>
}

export default function () {

    const fm = new FigureManager({
        figures: [
            {label: "omilaxr-workflow", imageSrc: "/OmiLAXR_Workflow_generic_small.webp"},
            {label: "step-0", imageSrc: "/get-started/step-0.webp"},
            {label: "scoped-registry", imageSrc: "/get-started/scoped-registry.webp"},
            {label: "my-registries-2023", imageSrc: "/get-started/my-registries-2023.webp"},
            {label: "my-registries", imageSrc: "/get-started/my-registries.webp"},
            {label: "xapi4unity-menu", imageSrc: "/get-started/xAPI4Unity_Menu.webp"},
            {label: "xapi4unity", imageSrc: "/get-started/xapi4unity.webp"},
            {label: "installed-omilaxr", imageSrc: "/get-started/installed-omilaxr.webp"},
            {label: "asmdef-inspector", imageSrc: "/get-started/asmdef.webp"},
            {label: "prefabs", imageSrc: "/get-started/prefabs.webp"},
            {label: "prefabs-2", imageSrc: "/get-started/prefabs-2.webp"},
            {label: "prefabs-in-hierarchy", imageSrc: "/get-started/prefabs-in-hierarchy.png"},
            {label: "unityxr", imageSrc: "/get-started/unityxr.webp"},
            {label: "mrtk2", imageSrc: "/get-started/mrtk2.webp"},
            {label: "unityxr-prefab", imageSrc: "/get-started/unityxr-prefab.webp"},
            {label: "endpoints", imageSrc: "/get-started/endpoints.webp"},
            {label: "credentials.json", imageSrc: "/get-started/credentials-json.webp"},
            {label: "create-credentials.json", imageSrc: "/get-started/create-credentials-json.webp"},
            {label: "osx-allow-java", imageSrc: "/get-started/osx-allow-java.webp"},
            {label: "yetanalytics", imageSrc: "/get-started/yetanalytics.webp"},
            {label: "definitions-editor", imageSrc: "/get-started/definitions-editor.webp"},
            {label: "discord", imageSrc: "/get-started/discord.webp"},
            {label: "add-from-disk", imageSrc: "/get-started/add-from-disk.webp"},
            {label: "wizard-welcome", imageSrc: "/get-started/wizard-1-welcome.webp"},
            {label: "wizard-required", imageSrc: "/get-started/wizard-2-required.webp"},
            {label: "wizard-tracking", imageSrc: "/get-started/wizard-3-tracking.webp"},
            {label: "wizard-tools", imageSrc: "/get-started/wizard-4-tools.webp"},
            {label: "wizard-mcp", imageSrc: "/get-started/wizard-5-mcp.webp"},
            {label: "wizard-done", imageSrc: "/get-started/wizard-6-done.webp"},
        ]
    });

    const items: InstructionCardProps[] = [
        {
            title: "Overview of the Workflow",
            children: <div>
                <P>To streamline development with IDE support and ensure consistency, we provide a tool that converts
                    the xAPI registry into C# code. Start by importing this tool. Refer to <fm.FigureRef
                        label="omilaxr-workflow"/> for an overview.</P>

                <fm.Figure caption="Overview of the OmiLAXR workflow" label="omilaxr-workflow" maxWidth="50%"/>

                <P>We maintain xAPI definitions through a structured registry, organized
                    as <InlineCodeBox>&lt;context&gt;/&lt;defType&gt;/&lt;defName&gt;.json</InlineCodeBox> to enable
                    modular and reusable definitions. Our tool translates these definitions into static C# classes,
                    helping to avoid typos and inconsistencies.</P>

                <P>These definitions can be integrated into your XR application to create custom xAPI statements, which
                    are then sent to a Learning Record Store (LRS). Developers can also learn from tracked scenarios and
                    update the registry with new definitions for broader community use.</P>
            </div>
        },
        {
            title: "Preparation",
            children: <div>
                <P>Make sure you have a Unity project set up where you plan to integrate this framework. OmiLAXRv2 is compatible with all Unity projects — both XR and non-XR.</P>

                <fm.Figure caption="XR Starter Project Screenshot" label="step-0" maxWidth="80%" />

                <P>In this guide, you'll install the following three Unity packages:</P>

                <ol className="default-style">
                    <li><Package scope={"com.rwth.unity.omilaxr.xapi4unity"}>xAPI4Unity</Package>: Translates JSON definitions into C# code.</li>
                    <li><Package>OmiLAXR</Package>: The base module that provides additional functionality.</li>
                    <li><Package>OmiLAXR.xAPI</Package>: Adds xAPI handling tools and components.</li>
                </ol>
                {/*<P><strong style={{color: "red" }}>For OmiLAXR.xAPI below 2.0.16: Packages must be installed in the mentioned order: (1) xAPI4Unity → (2) OmiLAXR → (3) OmiLAXR.xAPI.</strong></P>*/}
            </div>
        },
        {
            title: "Quick Start: Installer and Wizard",
            children: <div>
                <P>The quickest way to set up OmiLAXR takes two steps. The sections after this one describe the same steps by hand, if you prefer that.</P>

                <H>1. Run the installer</H>
                <P>Download the <a className="underline" href={INSTALLER_URL} download>OmiLAXR installer</a> and drag it into the Unity editor.
                    Unity shows the two files it imports (an editor script and its assembly definition). After you confirm, the installer adds the scoped registry and the <Package>OmiLAXR</Package> package
                    to your <InlineCodeBox>Packages/manifest.json</InlineCodeBox>, keeps a backup as <InlineCodeBox>manifest.json.bak</InlineCodeBox> and then removes itself.
                    Running it again changes nothing if OmiLAXR is already set up.</P>

                <H>2. Follow the OmiLAXR Wizard</H>
                <P>From OmiLAXR 2.3.0 on, the OmiLAXR Wizard opens once the package is installed (see <fm.FigureRef label="wizard-welcome" />). You can open it again at any time via <InlineCodeBox>OmiLAXR &gt; Open Wizard</InlineCodeBox>.
                    It opens on its own only the first time; tick <strong>Show on startup</strong> at the bottom left if it should open every time you start Unity.
                    Use <strong>Next</strong> and <strong>Back</strong> to go through the six steps, or click a step at the top. The tabs below show each step.</P>

                <P>Each package card shows its state on the right:</P>
                <ul className="default-style">
                    <li><strong>not installed</strong>: <strong>Install</strong> adds the package through the Unity Package Manager.</li>
                    <li><strong>installed 1.2.3</strong>: installed from the registry. <strong>Remove</strong> takes it out of the project again.</li>
                    <li><strong>1.2.3 → 1.3.0</strong>: a newer version is available. <strong>Update</strong> installs it.</li>
                    <li><strong>local 1.2.3</strong> (or <strong>git 1.2.3</strong>): the package comes from disk or a Git URL. The wizard leaves it as it is.</li>
                </ul>
                <P>Packages can only be installed once the scoped registry is added (first check of <strong>Required</strong>).</P>

                <Tabs tabs={[
                    {
                        id: "wizard-welcome",
                        label: "1 Welcome",
                        content: <div>
                            <P>The first page explains what the wizard sets up. Only the <strong>Required</strong> step is needed for tracking; you can skip all other steps and come back later.
                                The header shows the installed OmiLAXR core version and your Unity version.</P>
                            <fm.Figure caption="OmiLAXR Wizard: Welcome" label="wizard-welcome" maxWidth="60%" />
                        </div>
                    },
                    {
                        id: "wizard-required",
                        label: "2 Required",
                        content: <div>
                            <P>The <strong>Status</strong> list checks your project and the open scene. A check that fails shows a hint and a button that fixes it:</P>
                            <ul className="default-style">
                                <li><strong>Scoped registry for OmiLAXR packages</strong>: <strong>Add registry</strong> adds it to <InlineCodeBox>Packages/manifest.json</InlineCodeBox>.</li>
                                <li><strong>Pipeline in the open scene</strong>: <strong>Add prefab</strong> adds the OmiLAXR prefab with a learner pipeline, actor and instructor.</li>
                                <li><strong>Data provider in the open scene</strong>: install a data provider module such as <Package>OmiLAXR.xAPI</Package> under <strong>Data format</strong> and add its prefab.</li>
                                <li><strong>Credentials file in StreamingAssets</strong> (optional): web endpoints read their login from <InlineCodeBox>credentials.json</InlineCodeBox> (basic auth) or <InlineCodeBox>bearer.json</InlineCodeBox> (bearer token). Local file endpoints need none.</li>
                            </ul>
                            <P>Once <Package>OmiLAXR.xAPI</Package> is installed, three more checks appear: the xAPI data provider in the open scene, the folder <InlineCodeBox>Assets/xAPI.Registry</InlineCodeBox> (<strong>Copy sample</strong> copies the bundled one)
                                and the scripting define <InlineCodeBox>XAPI_REGISTRY_EXISTS</InlineCodeBox>, which is set automatically once the folder exists. Without it, the xAPI composers compile out.</P>
                            <P>Below the list are buttons to add the prefabs, create the credentials files and copy the xAPI samples by hand.</P>
                            <fm.Figure caption="OmiLAXR Wizard: Required" label="wizard-required" maxWidth="60%" />
                        </div>
                    },
                    {
                        id: "wizard-tracking",
                        label: "3 Tracking",
                        content: <div>
                            <P>Optional modules that track more:</P>
                            <ul className="default-style">
                                <li><strong>XR input</strong>: <Package>OmiLAXR.UnityXR</Package> (XR Interaction Toolkit), <Package>OmiLAXR.MetaXR</Package> (Meta XR SDK, including eye calibration and face data) and <Package>OmiLAXR.MRTK2</Package>. Install the one that matches the XR SDK of your project.</li>
                                <li><strong>Heart rate and PPM</strong>: <Package>OmiLAXR.HypeRate</Package> reads the heart rate from the HypeRate app.
                                    With <Package>OmiLAXR.xAPI</Package>, <strong>Add PPM hook</strong> adds the PPM hook to the xAPI data provider, which puts the current heart rate into every statement.</li>
                                <li><strong>Privacy</strong>: <Package>OmiLAXR.Pseudonymization</Package> creates unique pseudonyms for learners to use instead of their real names.</li>
                            </ul>
                            <fm.Figure caption="OmiLAXR Wizard: Tracking" label="wizard-tracking" maxWidth="60%" />
                        </div>
                    },
                    {
                        id: "wizard-tools",
                        label: "4 Tools",
                        content: <div>
                            <P><Package>OmiLAXR.ReCoPa</Package> connects your project to the Researcher Companion Panel, a desktop app in which you watch the statements live, pause tracking and calibrate.
                                <strong> Get the ReCoPa app</strong> leads to the download.</P>
                            <P><Package scope={"com.rwth.unity.omilaxr.xapi4unity"}>xAPI4Unity</Package> turns xAPI JSON definitions into the C# <InlineCodeBox>xAPI.Registry</InlineCodeBox> the xAPI composers use (see <a className="underline" href="#install-xapi4unity-package">Install xAPI4Unity Package</a>).</P>
                            <P><strong>More packages</strong> lists all other packages in the OmiLAXR registry, such as <Package>OmiLAXR.Benchmark</Package>.</P>
                            <fm.Figure caption="OmiLAXR Wizard: Tools" label="wizard-tools" maxWidth="60%" />
                        </div>
                    },
                    {
                        id: "wizard-mcp",
                        label: "5 AI (MCP)",
                        content: <div>
                            <P>This step connects AI coding agents to OmiLAXR (see <a className="underline" href="#use-ai-coding-agents-mcp">Use AI Coding Agents (MCP)</a>).</P>
                            <ol className="default-style">
                                <li>Under <strong>Agents</strong>, tick the agents you use: Claude Code, Cursor or VS Code (GitHub Copilot).</li>
                                <li>Under <strong>Start the server with</strong>, choose <InlineCodeBox>dnx OmiLAXR.MCP</InlineCodeBox> (runs the server from NuGet without installing it; needs the .NET 10 SDK)
                                    or <InlineCodeBox>omilaxr-mcp</InlineCodeBox> (after <InlineCodeBox clipboardButton={true}>dotnet tool install -g OmiLAXR.MCP</InlineCodeBox>).</li>
                                <li>Optionally enter an <strong>Author</strong> as <InlineCodeBox>Name &lt;email&gt;</InlineCodeBox> for the license headers and <InlineCodeBox>package.json</InlineCodeBox> of generated files. If it is empty, the server takes it from your Git config.</li>
                                <li>Click <strong>Write MCP configuration</strong>.</li>
                            </ol>
                            <P>The agent may then write generated files into your project, but it never overwrites existing files.</P>
                            <fm.Figure caption="OmiLAXR Wizard: AI (MCP)" label="wizard-mcp" maxWidth="60%" />
                        </div>
                    },
                    {
                        id: "wizard-done",
                        label: "6 Done",
                        content: <div>
                            <P>The last page sums up how many required steps are done, which modules are installed and whether MCP is configured.
                                If something still needs attention, go back to that step. Otherwise press Play in Unity to start tracking.
                                <strong> Learn more</strong> links to the documentation, this guide, the xAPI Registry and the changelog.</P>
                            <fm.Figure caption="OmiLAXR Wizard: Done" label="wizard-done" maxWidth="60%" />
                        </div>
                    },
                ]}/>
            </div>
        },
        {
            title: "Prepare Unity Package Scope",
            children: <div>
                <strong>You can skip this step if you used the installer above or install the packages via Git URL. Otherwise, follow the instructions below to manage package updates:</strong>

                <P>By default, Unity only recognizes packages hosted by Unity. To support third-party packages like <Package>OmiLAXR</Package>, you’ll need to update your <InlineCodeBox>manifest.json</InlineCodeBox> file to include the required scopes.</P>

                <P>To do this by hand, you have two options:</P>
                <ol className="default-style">
                    <li>(fastest way) Open <InlineCodeBox>&lt;project_root&gt;/Packages/manifest.json</InlineCodeBox> and add the following entry under <InlineCodeBox>scopedRegistries</InlineCodeBox> if it isn’t already present:</li>
                    <li><InlineCodeBox>Edit &gt; Project Settings...</InlineCodeBox>, as shown in <fm.FigureRef label="scoped-registry" />, and add the scopes by hand.</li>
                </ol>

                <JsonManifestCodebox scopes={scopes}></JsonManifestCodebox>
                <P>Since <strong>Unity 2020.1</strong> it is not needed anymore to have all packages inside the scoped registry. Having <InlineCodeBox>com.rwth.unity.omilaxr</InlineCodeBox> is enough to find all <InlineCodeBox>com.rwth.unity.omilaxr.*</InlineCodeBox> packages.</P>

                <P>After updating, restart Unity and verify the scopes under <InlineCodeBox>Edit &gt; Project Settings...</InlineCodeBox>, as shown in <fm.FigureRef label="scoped-registry" />.</P>

                <fm.Figure caption={"Scoped Registry Preview"} label={"scoped-registry"} />
            </div>
        },
        {
            title: "Install xAPI4Unity Package",
            children: <div>
                <P>In Unity, navigate to <InlineCodeBox>Window &gt; Package Manager</InlineCodeBox> → <InlineCodeBox>My
                    Registries</InlineCodeBox> to locate and install the package (see <fm.FigureRef
                    label="my-registries-2023"/> or <fm.FigureRef
                    label="my-registries"/>).</P>
                <Tabs tabs={[{
                    id: "unity-2023",
                    label: "Unity 2023+",
                    content: <fm.Figure caption="My Registries in Unity (2023+)" label="my-registries-2023"
                                        maxWidth="70%"/>
                }, {
                    id: "unity-2022",
                    label: "< Unity 2023",
                    content: <fm.Figure caption="My Registries in Unity (<2023)" label="my-registries" maxWidth="70%"/>
                }]}/>
                <P>Alternatively, use the <InlineCodeBox>+</InlineCodeBox> button in the Package Manager and add the
                    package by entering <InlineCodeBox
                        clipboardButton={true}>com.rwth.unity.omilaxr.xapi4unity</InlineCodeBox>.</P>
            </div>
        },
        {
            title: "Prepare xAPI Registry",
            children: <div>
                <P>For data tracking, we use the xAPI (Experience API) data format. To better understand xAPI, please refer to the official documentation: <Hyperlink>https://xapi.com/statements-101/</Hyperlink>.</P>

                <P>To support standardization, we maintain a dedicated xAPI registry tailored to various research domains. One such domain is <InlineCodeBox>virtualReality</InlineCodeBox> (support for <InlineCodeBox>extendedReality</InlineCodeBox> is in progress).
                    The registry is hosted in our GitLab repository: <Hyperlink>https://gitlab.com/learntech-rwth/xapi</Hyperlink>.
                    For a more user-friendly experience, we also provide a graphical interface at <Hyperlink>https://omilaxr-ecosystem.github.io/xapi/</Hyperlink>.</P>

                <P>In Unity, navigate to <InlineCodeBox>xAPI4Unity &gt; Setup xAPI Definitions</InlineCodeBox> to verify your configuration.
                    Ensure all paths are correct — the default settings are preconfigured and recommended.
                    You'll be guided through three options below. Don’t worry — changes will only be applied after you confirm your selection.</P>

                <fm.Figure caption="xAPI4Unity Menu" label="xapi4unity-menu"/>

                <ul>
                    <li><strong>(Option 1) Download a local copy into the project's 'Assets' folder</strong>:
                        This will download and extract the latest version of the <a href="https://gitlab.com/learntech-rwth/xapi/-/tree/master?ref_type=heads" target="_blank">master branch</a>
                        of the xAPI registry directly into your <InlineCodeBox>Assets</InlineCodeBox> folder.
                        The xAPI definitions will then be part of your project repository under <InlineCodeBox>Assets/xapi</InlineCodeBox>.
                        This is the most commonly used option.
                    </li>

                    <li><strong>(Option 2) Download a local copy to a custom path</strong>:
                        You may also use a local copy without relying on Git. This is useful if you want to keep xAPI definitions within your project repository
                        and expect to maintain project-specific definitions. When you click the button, the latest files will be downloaded.
                        You just need to extract the content into your desired path (recommended: <InlineCodeBox>Assets/xapi</InlineCodeBox>).
                        Ensure the <InlineCodeBox>definitions</InlineCodeBox> folder is at the root of <InlineCodeBox>Assets/xapi</InlineCodeBox>.
                    </li>

                    <li><strong>(Option 3) Use Git to clone into a custom path</strong>:
                        You can add the registry as a Git submodule. This is recommended if you want to sync local changes with a separate repository
                        or contribute to the global registry. While manual setup is possible, the tool window simplifies this process by allowing you to choose a Git repository and branch.
                        By default, it uses our GitLab repository. Ensure there are no errors and that your window looks similar to <fm.FigureRef label="xapi4unity" />.
                    </li>
                </ul>

                <P>To (re-)generate the C# code from your JSON definitions, click the <InlineCodeBox>Update xAPI.Registry</InlineCodeBox> button.
                    After transformation, the folder <InlineCodeBox>Assets/xAPI.Registry</InlineCodeBox> will contain all the generated C# files.</P>

                <fm.Figure caption="xAPI4Unity Config Window" label="xapi4unity" maxWidth="70%" />
            </div>
        },
        {
            title: "Install OmiLAXR Framework",
            children: <div>
                <P><strong>Tip:</strong> the step <strong>Required</strong> of the OmiLAXR Wizard installs <Package>OmiLAXR.xAPI</Package> with one click.</P>

                <P>Use the <strong>My Registries</strong> section again to install the <Package>OmiLAXR.xAPI</Package> package (see <fm.FigureRef label="my-registries-2023" /> or <fm.FigureRef label="my-registries" />).
                    Since <Package>OmiLAXR.xAPI</Package> depends on <Package>OmiLAXR</Package>, both packages will be installed automatically.</P>

                <fm.Figure caption="Installed Packages (xAPI4Unity, OmiLAXR, and OmiLAXR.xAPI)" label="installed-omilaxr" maxWidth="70%" />

                <P>Alternatively, open <InlineCodeBox>Window &gt; Package Manager</InlineCodeBox> and install the package
                    <InlineCodeBox clipboardButton={true}>com.rwth.unity.omilaxr.xapi</InlineCodeBox>
                    (see <fm.FigureRef label="installed-omilaxr" />).</P>

                {/*<div className="pt-3"></div>*/}

                {/*<h5 style={{ fontSize: "20px" }}>(Optional — if you are using Assembly Definitions): Include OmiLAXR in Your Project</h5>*/}

                {/*<P>If you plan to use the Module Template (<a href="#section-6">Step 6</a>), you can skip the following instructions.</P>*/}

                {/*<P>If your project does not use any assembly definition (.asmdef) files, OmiLAXR should work without additional steps.*/}
                {/*    However, we recommend using an assembly definition file for better modularity and build performance.*/}
                {/*    To set this up, create a new <InlineCodeBox>Assembly Definition</InlineCodeBox> file in the root of your Unity scripts folder (right-click in the Assets window).</P>*/}

                {/*<P>Next, you’ll need to include <Package>OmiLAXR</Package> in your assembly definition. Follow these steps:</P>*/}

                {/*<ol>*/}
                {/*    <li>(1) Select your newly created <InlineCodeBox>.asmdef</InlineCodeBox> file.</li>*/}
                {/*    <li>(2) In the <InlineCodeBox>Inspector</InlineCodeBox> window, add a new entry under <InlineCodeBox>Assembly Definition References</InlineCodeBox> (see <fm.FigureRef label="asmdef-inspector" />).</li>*/}
                {/*    <li>(3) Double-click to add <Package>OmiLAXR</Package>.</li>*/}
                {/*    <li>(4) Repeat the same process for <Package>OmiLAXR.xAPI</Package>.</li>*/}
                {/*    <li>(5) Scroll down and click "Apply" in the <InlineCodeBox>Inspector</InlineCodeBox> window.</li>*/}
                {/*</ol>*/}

                {/*<P>You have now successfully installed the base packages required for OmiLAXR.</P>*/}

                {/*<fm.Figure caption="Assembly Definition File Inspector" label="asmdef-inspector" maxWidth="50%" />*/}
            </div>
        },
        {
            title: "Use the OmiLAXR Prefabs",
            children: <div>
                <P><strong>Tip:</strong> the step <strong>Required</strong> of the OmiLAXR Wizard adds both prefabs to the open scene.</P>

                <P>The modular architecture of OmiLAXR makes it possible to implement necessary modules for all XR frameworks.
                    Depending on your needs, the frameworks may differ in terms of interaction behavior, teleportation logic, or the hierarchy of player game objects.</P>

                <P>Working with OmiLAXR means implementing components of the pipeline to extend its functionality.
                    This can be done either in your own Unity package (see section below) or by placing the classes inside a folder within the <InlineCodeBox>Assets</InlineCodeBox> directory.</P>

                <P><Package>OmiLAXR</Package> modules follow a strict structure. They provide prefabs that you can use to get started immediately (see <fm.FigureRef label="prefabs" />, <fm.FigureRef label="prefabs-2" />, and <fm.FigureRef label="prefabs-in-hierarchy" />).</P>

                <P>Example scripts can be found&nbsp;
                    <a className="underline" target="_blank"
                       href="https://gitlab.com/learntech-rwth/omilaxr-ecosystem/v2/omilaxr.module-template/-/tree/main/Runtime/Examples">
                        here
                    </a>.
                    <strong>Note:</strong> These examples are currently a bit outdated and will be updated soon.
                </P>

                <fm.Figure caption={"OmiLAXR Prefab"} label={"prefabs"} maxWidth={"50%"} />
                <fm.Figure caption={"OmiLAXR.xAPI Prefab"} label={"prefabs-2"} maxWidth={"50%"} />
                <fm.Figure caption={"OmiLAXR Prefabs in Hierarchy"} label={"prefabs-in-hierarchy"} maxWidth={"50%"} />
            </div>
        },
        {
            title: "Install Your Required XR SDK Module",
            children: <div>
                <P><strong>Tip:</strong> the step <strong>Tracking</strong> of the OmiLAXR Wizard lists the XR modules and installs them with one click.</P>
                <P>To support XR interactions, you need to install an appropriate <Package>OmiLAXR</Package> module that integrates with the specific XR SDK components used in your project.</P>

                <P>We are actively developing several XR modules. Please check the available ones that have already been published.</P>

                <P>If you don't see them in your Unity registry, please visit <Hyperlink url="/ecosystem">this page</Hyperlink> for more information.</P>

                <Tabs tabs={[
                    {
                        id: "unityxr",
                        label: "UnityXR / OpenXR",
                        content: <fm.Figure caption="OmiLAXR.UnityXR" label="unityxr" maxWidth="70%" />
                    },
                    {
                        id: "mrtk",
                        label: "MRTK2",
                        content: <fm.Figure caption="OmiLAXR.MRTK2" label="mrtk2" maxWidth="70%" />
                    }
                ]} />

                <P>After installing the XR module of your choice, you can start quickly by using the provided prefabs from the XR module (e.g. <Package>OmiLAXR.UnityXR</Package>).</P>
                <P style={{color: "red"}}>Attention: If you already included the prefab of <Package>OmiLAXR</Package>, you may not need it anymore if you use the new Prefab Variant.</P>
                <P>See an example in <fm.FigureRef label="unityxr-prefab" />.</P>

                <fm.Figure caption="OmiLAXR.UnityXR Prefab" label="unityxr-prefab" maxWidth="50%" />
            </div>
        },
        {
            title: "Configure an OmiLAXR Endpoint",
            children: <div>

                <P>To create and send statements, you must set up an endpoint. OmiLAXR supports multiple endpoints for delivering data.
                    One of the default endpoints is <InlineCodeBox>StatementPrinter</InlineCodeBox>, which logs statements to the Unity console.
                    Another common endpoint is a Learning Record Store (LRS).</P>

                <P>In <fm.FigureRef label="endpoints" />, the LRS components are disabled, and only the <InlineCodeBox>PrintStatement</InlineCodeBox> component is enabled.
                    If you wish to use the LRS, make sure to keep its component enabled.</P>

                <fm.Figure maxWidth="50%" caption="OmiLAXR Default Endpoints" label="endpoints" />

                <h5 style={{ fontWeight: "bold", fontSize: "1.2em" }}>Do you want to store your data persistent?</h5>

                <P>To connect to your Learning Record Store, provide the credentials by editing the file at
                    <InlineCodeBox>Assets/StreamingAssets/credentials.json</InlineCodeBox> (see <fm.FigureRef label="credentials.json" />).
                    If this file doesn't exist, you can create one via <InlineCodeBox>OmiLAXR &gt; Create credentials.json</InlineCodeBox>
                    (see <fm.FigureRef label="create-credentials.json" />).</P>

                <P>We support several LRS solutions. Recommended options:</P>

                <ul className="default-style">
                    <li><Hyperlink url="https://learninglocker.atlassian.net/wiki/spaces/DOCS/overview">Learning Locker</Hyperlink> — suitable for production use</li>
                    <li><Hyperlink url="https://www.yetanalytics.com/sql-lrs">YetAnalytics LRSQL</Hyperlink> — ideal for development environments</li>
                </ul>

                <P>Follow the steps below to set up a local LRS:</P>

                <fm.Figure maxWidth="50%" caption="Assets / StreamingAssets / credentials.json" label="credentials.json" />
                <fm.Figure maxWidth="50%" caption="Create credentials.json file" label="create-credentials.json" />


                <P>For development purposes, we provide a preconfigured version of LRSQL:</P>

                <ol className="default-style">
                    <li>
                        <Hyperlink url="https://rwth-aachen.sciebo.de/s/SQgrxeH1TzEWQOf/download">Download the preconfigured SQLRS package</Hyperlink>.
                    </li>
                    <li>Unpack the ZIP archive.</li>
                    <li>
                        Launch LRSQL:
                        <ul className="default-style">
                            <li><strong>Windows:</strong> Run <InlineCodeBox>lrsql.exe</InlineCodeBox></li>
                            <li>
                                <strong>macOS:</strong> In Terminal, execute
                                <InlineCodeBox>./bin/run_sqlite.sh</InlineCodeBox>.
                                You may need to make the file executable using <InlineCodeBox>chmod</InlineCodeBox> and allow it to run via **System Preferences → Privacy & Security**.
                            </li>
                        </ul>
                    </li>
                    <li>
                        Open <Hyperlink>http://localhost:8080/</Hyperlink> in your browser and log in using:
                        <ul className="default-style">
                            <li><strong>Username:</strong> <InlineCodeBox>admin</InlineCodeBox></li>
                            <li><strong>Password:</strong> <InlineCodeBox>admin</InlineCodeBox></li>
                        </ul>
                    </li>
                    <li>Once logged in, you'll see the LRS dashboard (see <fm.FigureRef label="yetanalytics" />).</li>
                    <li>
                        Use the following preconfigured credentials for development (change them if used in production):
                        <ul className="default-style">
                            <li><strong>API Key:</strong> <InlineCodeBox>db3e9b32e6c2ceeb06c69a98ad3315c0137999172a4c3e56339bb61c94340872</InlineCodeBox></li>
                            <li><strong>API Secret:</strong> <InlineCodeBox>30cfcff6247a86c8023968a30956c8cea6a43e416faeb96c30fb7c9d4a10e46e</InlineCodeBox></li>
                            <li><strong>Endpoint:</strong> <InlineCodeBox>http://localhost:8080/xapi/</InlineCodeBox></li>
                        </ul>
                    </li>
                    <li>You can now enter these credentials into your <InlineCodeBox>credentials.json</InlineCodeBox> file.
                        Alternatively, download a pre-filled file
                        <Hyperlink url="https://rwth-aachen.sciebo.de/s/eAZYCVf6lMHhVsv/download">here</Hyperlink>.
                    </li>
                    <li>Once configured, you will be able to see generated xAPI statements in the LRS dashboard.</li>
                </ol>

                <fm.Figure maxWidth="50%" caption="Allow Java in System Preferences (macOS)" label="osx-allow-java" />
                <fm.Figure maxWidth="50%" caption="YetAnalytics LRSQL Dashboard" label="yetanalytics" />

            </div>
        },
        {
            title: "Work with xAPI Definitions",
            children: <div>
                <P>To manage xAPI definitions, you can either edit the JSON files directly using your IDE
                    in <InlineCodeBox>Assets/xapi</InlineCodeBox>, or you can use the <Package scope="com.rwth.unity.omilaxr.xapi4unity">xAPI4Unity</Package> package.</P>

                <P>This package provides a dedicated tool window to manage xAPI definitions (see <fm.FigureRef label="definitions-editor" />).
                    You can access it via <InlineCodeBox>xAPI4Unity &gt; Edit xAPI Definitions</InlineCodeBox>.</P>

                <P>From this window, you can easily create, edit, rename, or delete xAPI definitions.</P>

                <fm.Figure maxWidth="50%" caption="Edit xAPI Definitions Window" label="definitions-editor" />
            </div>
        },
        {
            title: "Work with OmiLAXR Modules",
            children: <div>
                <P>You can now begin developing your own OmiLAXR modules.</P>
                <P style={{ fontSize: "1.5em" }}>
                    &gt;&gt;&gt; To learn more about the modular architecture and see example code, click <a href="/pipeline">here</a>. &lt;&lt;&lt;
                </P>
            </div>
        },
        {
            title: "Use AI Coding Agents (MCP)",
            children: <div>
                <P>The OmiLAXR MCP server gives AI coding agents such as Claude Code, Cursor or GitHub Copilot in VS Code knowledge about OmiLAXR.
                    With it, an agent can search and propose xAPI definitions, follow the recipes for listeners, tracking behaviours, composers and endpoints,
                    and generate components that match the package conventions. It needs the <Hyperlink url="https://dotnet.microsoft.com/download">.NET 10 SDK</Hyperlink>.</P>

                <P>The step <strong>AI (MCP)</strong> of the OmiLAXR Wizard writes the server into the configuration files of the agents you select:
                    <InlineCodeBox>.mcp.json</InlineCodeBox> (Claude Code), <InlineCodeBox>.cursor/mcp.json</InlineCodeBox> (Cursor) and <InlineCodeBox>.vscode/mcp.json</InlineCodeBox> (VS Code).
                    Other servers in these files are kept. Restart the agent or reload its MCP servers afterwards.</P>

                <P>To do it by hand, add this entry to <InlineCodeBox>.mcp.json</InlineCodeBox> in your Unity project root:</P>

                <CodeBox language="json" filename="<project_root>/.mcp.json" clipboardCode={mcpConfig}>{mcpConfig}</CodeBox>

                <P>All options are described in the <Hyperlink url="https://github.com/OmiLAXR-Ecosystem/OmiLAXR.MCP">OmiLAXR.MCP repository</Hyperlink>.</P>
            </div>
        },
        {
            title: "Join Our Discord Server",
            children: <div>
                <P>Stay connected through our official Discord server, where we share update notes and collaborate as a community of OmiLAXR users and developers.</P>

                <P>Join the conversation and grow with the community!
                    Click <Hyperlink url="https://discord.gg/AnUXutpHZz">here</Hyperlink> to join.</P>

                <fm.Figure maxWidth="50%" caption="OmiLAXR Discord Server" label="discord" />
            </div>
        },
        {
            title: "Contribute and Share with the Community",
            children: <div>
                <P>In OmiLAXRv2, we use a modular architecture based on so-called “modules.” The <a href="/pipeline">Pipeline</a> consists of individual components, and a module is a collection of such components used to extend or create OmiLAXR pipelines.</P>

                <P>This allows you to organize your Learning Analytics (LA) work in a separate repository.</P>

                <P>To develop your own LA module, you can either place all components inside a dedicated folder within your project or create a standalone module based on our module template.</P>

                <P>If you prefer to place the module inside your existing XR project, simply download the template as a ZIP file from:
                    <Hyperlink>https://gitlab.com/learntech-rwth/omilaxr-ecosystem/v2/omilaxr.module-template</Hyperlink>.</P>

                <ul>
                    <li>
                        <strong>(a)</strong> Fork the following repository:
                        <Hyperlink>https://gitlab.com/learntech-rwth/omilaxr-ecosystem/v2/omilaxr.module-template</Hyperlink>,
                        then clone your fork locally.
                    </li>
                    <li>
                        <strong>(b)</strong> In Unity, go to <InlineCodeBox>Window &gt; Package Manager</InlineCodeBox>.
                        Click the <InlineCodeBox>+</InlineCodeBox> button in the top-left corner and select
                        <InlineCodeBox>Add from disk...</InlineCodeBox> (see <fm.FigureRef label="add-from-disk" />).

                        <fm.Figure maxWidth="700px" className="align-middle" caption="Add package from disk" label="add-from-disk" />
                    </li>
                    <li>
                        <strong>(c)</strong> Navigate to the cloned project folder and select the <InlineCodeBox>package.json</InlineCodeBox> file.
                    </li>
                    <li>
                        <strong>(d)</strong> The module will now be imported into your project, and you can begin working with it.
                    </li>
                    <li>
                        <strong>(e)</strong> Update all placeholder entries labeled <InlineCodeBox>YOUR_MODULE_NAME</InlineCodeBox>
                        in files such as <InlineCodeBox>README.md</InlineCodeBox>, <InlineCodeBox>package.json</InlineCodeBox>,
                        your <InlineCodeBox>.asmdef</InlineCodeBox> file, and any script namespaces.
                        This can be done step by step.
                    </li>
                </ul>

                <P>If you want to contribute directly to OmiLAXR by extending or modifying existing modules,
                    you can use the same workflow. In this case, we recommend forking the relevant project and submitting your changes via merge requests.</P>

                <P>To contribute, first clone one of the repositories from:
                    <Hyperlink>https://gitlab.com/learntech-rwth/omilaxr-ecosystem/v2</Hyperlink></P>
            </div>
        }
    ];

    return (
        <>
            <div className="h-full w-full place-items-center bg-white px-4 py-20 sm:px-6 lg:px-8">
                <div className="doc-page relative items-center">
                    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">
                        Get Started
                    </h1>

                    <P>Already installed OmiLAXRv2? Continue with the <a href="/pipeline" className="underline">Pipeline</a> instructions.</P>

                    <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                        This site provides educators, students, and developers with technical guides, best practices, case studies, and real-world examples.
                        Whether you're new to XR or an experienced developer, you'll find valuable resources to help you integrate XR into educational settings.
                    </p>

                    <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                        We hope you find our materials useful. Thank you for exploring XR in education with us.
                    </p>
                    {contentOf(items)}
                </div>
            </div>
        </>
    );
};
