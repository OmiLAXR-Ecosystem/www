import ThemeProvider from "../../theme-provider";
import React from "react";
import {contentOf, type GetStartedCardProps} from "../instructionCard";
import CodeBox, {InlineCodeBox} from "../../CodeBox";
import {FigureManager} from "react-figure-ref";
import Hyperlink from "../../Hyperlink";

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
            {label: "step-1", imageSrc: "/get-started/step-1.png"},
            {label: "step-3", imageSrc: "/get-started/step-3.jpg"},
            {label: "step-3-1", imageSrc: "/get-started/step-3-1.jpg"},
            {label: "step-3-2", imageSrc: "/get-started/step-3-2.jpg"},
            {label: "omilaxr-workflow", imageSrc: "/OmiLAXR_Workflow_generic_small.jpg"},
            {label: "using-xapi", imageSrc: "/Using_xAPI.webm"},
            {label: "trackable-register", imageSrc: "/get-started/Trackable_Register.png"},
            {label: "step-4", imageSrc: "/get-started/step-4.png"},
            {label: "asmdef-inspector", imageSrc: "/get-started/asmdef.png"},
            {label: "omilaxr-prefabs", imageSrc: "/get-started/OmiLAXR_Prefabs.jpg"},
            {label: "lrs-component", imageSrc: "/get-started/LRS_Component.png"},
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
            title: "Prepare Unity package scope (recommended)",
            children: <div>

                <strong>If you wish instead importing packages via their git url, than this step can be ignored. We
                    strongly
                    recommend to apply this step, to get update notifications of the packages.</strong>

                <P>Unity packages are only looking for packages hosted by Unity. To enable
                    third-party
                    packages (like OmiLAXR) you need to add the registers to your project. This can do this either by
                    Unity
                    editor or by directly edit your manifest.json file of the project.</P>

                <P>We recommended to just add all scopes of OmiLAXR by using manifest.json</P>

                <P>Open for this the
                    file <InlineCodeBox>&lt;project_root&gt;/Packages/manifest.json</InlineCodeBox> any code editor and
                    look for <InlineCodeBox>scopedRegistries</InlineCodeBox> entry.
                    If there is no entry, than just put next to <InlineCodeBox>dependencies</InlineCodeBox> following
                    code.
                </P>


                <P>
                    After saving the file, you should open Unity editor and check under <InlineCodeBox>Edit &gt; Project
                    Settings...</InlineCodeBox> if the scopes are applied (see <fm.FigureRef label="step-1"/>).
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
                    This is why you will need a local copy of the xAPI repository. You have following options to get
                    it:</P>

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
                    the available package in the list (see <fm.FigureRef label="step-3-1"/>).
                </P>

                <fm.Figure caption="My Unity registries" label="step-3-1" maxWidth="50%"/>

                <H>xAPI4Unity Window</H>
                <P>Now, xAPI4Unity is installed and can be used in your Unity project. If you
                    already have the folder <InlineCodeBox>Assets/xapi</InlineCodeBox> then you can use it directly. But
                    we recommend to check whether everything is configured correctly. For doing this, go
                    to <InlineCodeBox>OmiLAXR &gt; xAPI &gt; Open Fetcher Window</InlineCodeBox>.
                    Now, you have to check if every path is correct. The recommended settings are defined by default.
                    If you haven't cloned a xAPI repository folder, yet you can do it by clicking the "Clone repository"
                    button. Make sure you have no error messages and your window looks similar to <fm.FigureRef
                        label="step-3-2"/>.
                    To (re-)transform the JSON files to C# you have to click the button "Transform JSON =&lt; C#". After
                    transformation you shall have the
                    folder <InlineCodeBox>Assets/xAPI.Registry</InlineCodeBox> containing
                    all C# files.
                </P>

                <fm.Figure caption="xAPI4Unity Config Window" label="step-3-2" maxWidth="50%"/>
            </div>
        },
        {
            title: "Install OmiLAXR Framework",
            children: <div>

                <P>Open <InlineCodeBox>Window &gt; Package Manager</InlineCodeBox> and install the
                    packages <InlineCodeBox>com.rwth.unity.omilaxr</InlineCodeBox> and <InlineCodeBox>com.rwth.unity.omilaxr.xapi</InlineCodeBox> version <InlineCodeBox>1.0.7</InlineCodeBox>
                    (see <fm.FigureRef label="step-4"/>).
                    You can do this by using the namespaces (recommended) or their git urls.
                </P>

                <fm.Figure caption="Installed OmiLAXR" label="step-4" maxWidth="50%"/>


                <H>TinCan Library</H>
                <P>To use <InlineCodeBox>OmiLAXR.xAPI</InlineCodeBox> you need the TinCan.NET library:</P>

                <ol>
                    <li>(1) Download the DLL file
                        from <Hyperlink>https://github.com/SGoerzen/TinCanUnity/releases/download/1.3.0.2/TinCan.dll</Hyperlink>.
                    </li>
                    <li>(2) Create the folder <InlineCodeBox>Assets/Plugins</InlineCodeBox>.</li>
                    <li>(3)
                        Place <InlineCodeBox>TinCan.dll</InlineCodeBox> in <InlineCodeBox>Assets/Plugins</InlineCodeBox>.
                    </li>
                    <li>(4) Open Unity to let it reload.</li>
                </ol>


                <H>Include OmiLAXR to your project</H>
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
            title: "Install adapter packages for best compatibility",
            children: <div>

                <P>Supporting all XR frameworks is not trivial. They differ (for example) in
                    interaction and teleport behavior or player game object hierarchies. This is why OmiLAXR is working
                    with interfaces to achieve a generic tracking behavior (see <a
                        href="https://docs.omilaxr.dev/scripts/OmiLAXR.Adapters.IPlayer.html">IPlayer</a>). In center of
                    our tracking system we have a <InlineCodeBox>Learner</InlineCodeBox> who is inside a <InlineCodeBox>Learning
                        Environment</InlineCodeBox>.
                    This way it is possible to track player position on different XR frameworks.
                    So we recommend to always target <InlineCodeBox>Learner</InlineCodeBox> (see <a
                        href="https://docs.omilaxr.dev/scripts/OmiLAXR.Learner.html">here</a>) by code, whenever you
                    want to target the player.</P>

                <CodeBox language="csharp" filename="Learner Example">

                    {"var learner = Learner.Instance;\n" +
                        "if (learner.IsXR)\n" +
                        "{\n" +
                        "\t// do XR only stuff\n" +
                        "}\n" +
                        "var position = learner.Player.WorldPosition;\n" +
                        "var camera = learner.Player.GetCamera();\n..."}

                </CodeBox>

                <P>Another advantage is that not every project needs all features.
                    To cover these use cases we developed so called "Adapters". A adapter may define how
                    a <InlineCodeBox>Player</InlineCodeBox>looks like on a specific framework or application.
                    We developed already adapters for UnityXR <InlineCodeBox>com.rwth.unity.omilaxr.adapters.unityxr</InlineCodeBox>
                    and SteamVR <InlineCodeBox>com.rwth.unity.omilaxr.adapters.steamvr</InlineCodeBox>. MRTK is in development (see <Hyperlink>https://gitlab.com/learntech-rwth/omilaxr-ecosystem/adapters/omilaxr.adapters.mrtk</Hyperlink>).
                    If we dont have an adapter you need, you can easily write your own (see <a href="#section-10">Step 10</a>).</P>

                <P>Further, we have adapters for external tools like the Researcher Companion Panel.
                    This can configure tracking setups by a desktop UI (useful for studies). With this adapter
                OmiLAXR is able to communicate with ReCoPa (see <Hyperlink>https://gitlab.com/learntech-rwth/omilaxr-ecosystem/adapters/omilaxr.adapters.recopa</Hyperlink>.</P>

            </div>
        },
        {
            title: "Setup OmiLAXR Framework",
            children: <div>
                <P>First of all ensure, you have installed all needed adapters for your project (depending on your
                    needs).</P>
                <P>To enable the tracking systems you need to add following prefabs. To make it easier you can click the
                    right mouse button inside of <InlineCodeBox>Hierarchy</InlineCodeBox> window in Unity and open the
                    menu item<InlineCodeBox>OmiLAXR</InlineCodeBox> (see <fm.FigureRef label="omilaxr-prefabs"/>).</P>
                <fm.Figure caption="OmiLAXR Quick menu" label="omilaxr-prefabs" maxWidth="25%" />
                <P>Please add following prefabs by using the menu. We recommend to add all tracking systems and remove
                    those you dont need:</P>
                <ol>
                    <li>(1) <InlineCodeBox>Hierarchy &gt; OmiLAXR &gt; Learner (mandatory)</InlineCodeBox></li>
                    <li>(2) <InlineCodeBox>Hierarchy &gt; OmiLAXR &gt; Learning Environment</InlineCodeBox></li>
                    <li>(3) <InlineCodeBox>Hierarchy &gt; OmiLAXR &gt; xAPI Tracking &gt; Main Tracking System
                        Pack</InlineCodeBox></li>
                    <li>(4) <InlineCodeBox>Hierarchy &gt; OmiLAXR &gt; Adapters &gt; SteamVR/UnityXR/...</InlineCodeBox></li>
                </ol>

                <H>Setup Learning Record Store (LRS)</H>
                <P>To setup tracking config you need client <InlineCodeBox>key</InlineCodeBox> and <InlineCodeBox>secret</InlineCodeBox>
                    of your LRS. You can place them in four different ways:</P>
                <ol>
                    <li>(1) By code: <CodeBox language="csharp">{"var lrs = LrsController.Instance;\n" +
                        "lrs.clientKey = \"xxxxxxxxxxxx\";\n" +
                        "lrs.clientSecret = \"yyyyyyyyyyyyy\";\n" +
                        "MainTrackingSystem.Instance.autoStartTracking = true;"}</CodeBox>
                    </li>
                    <li>(2) By using ReCoPa (todo screenshot)</li>
                    <li>(3) By using Unity component <fm.Figure maxWidth="50%" caption="LRS Component" label="lrs-component" /></li>
                </ol>

                <P>The credentials you can get from your Learning Record Store. In Learning Locker you can find them in
                <InlineCodeBox>Settings &gt; Clients</InlineCodeBox>. In our experience it may help to use a local
                LRS for development (for example <Hyperlink>https://github.com/yetanalytics/lrsql</Hyperlink>).</P>

                <H>Start and stop tracking</H>
                <P>You can start or stop tracking by code or by using ReCoPa. To doing it by code you can do it by following code.</P>

                <CodeBox language="csharp">
                    {"// Can be also enabled in Unity inspector\n" +
                        "MainTrackingSystem.Instance.autoStartTracking = true;\n" +
                        "// Start/Stop Tracking\n" +
                        "MainTrackingSystem.Instance.StartTracking();\n" +
                        "MainTrackingSystem.Instance.StopTracking();"}
                </CodeBox>

                <H>Trackables and Gazables</H>
                <P>To make game objects trackable you have to assign them the <InlineCodeBox>Trackable</InlineCodeBox> component. This can be
                    also done by using right click and <InlineCodeBox>Hierarchy &gt; OmiLAXR &gt; xAPI Tracking &gt; Make GameObject trackable</InlineCodeBox>.
                The same can be done for <InlineCodeBox>Gazeable</InlineCodeBox> (for eye tracking).</P>

                <P>This makes sense because not every game object need to be tracked (e.g. ground or sub game objects of a complex one).
                In complex game objects it is important to assign the <InlineCodeBox>Trackable</InlineCodeBox> component
                to the part which has a collider. A custom trackable name can help for identification.</P>

                <P>All trackables are collected inside of the <InlineCodeBox>Trackable Register</InlineCodeBox>. This component
                helps to keep the overview (see <fm.FigureRef label="trackable-register" />). In this example, we have
                added the <InlineCodeBox>Trackable</InlineCodeBox> component to the game object "Sphere". If you click on the
                entry you will be navigated directly to the game object.</P>

                <fm.Figure caption="Trackable Register" label="trackable-register" maxWidth="50%" />
            </div>
        },
        {
            title: "How to build xAPI statements",
            children: <div>
                <P>From now on, if you edit JSON files inside your IDE (and safe the changes),
                    the transformation happens in background automatically. In <fm.FigureRef label="using-xapi"/> you
                    can see how we build a statement. For this you need to use the static class
                    <InlineCodeBox>xAPI_Definitions</InlineCodeBox>. The <InlineCodeBox>SendStatement(...)</InlineCodeBox>
                    method is either usable inside of tracking systems and controllers (see <a href="#section-8">Step 8</a>),
                    but also from everywhere by using <InlineCodeBox>LRS.Instance.SendStatement(...)</InlineCodeBox> (see <Hyperlink>https://docs.omilaxr.dev/scripts/OmiLAXR.xAPI.LRS.html</Hyperlink>).
                </P>

                <fm.Figure caption="Preview how to build xAPI statements with IDE support" label="using-xapi"
                           maxWidth="75%" autoPlay={true} loop={true} />
            </div>
        },
        {
            title: "Tracking systems and controllers",
            children: <div>

                <P>The main tracking system contains sub tracking systems. A tracking system can be imagined as a group of
                tracking behaviours. For example: "Interaction Tracking System" manages "Mouse", "Keyboard", "Laser Pointer"
                    or "Interactions" tracking controllers. Each tracking controller handles on its on how to track data.
                If you tracking behavior is less complex, it may be enough to just write a tracking system instead of multiple controllers.</P>

                <H>Create own tracking system</H>
                <P>To create an own tracking system, you have to create a new Unity script. Now, it is enough to extend from base
                class <InlineCodeBox>TrackingSystemBase</InlineCodeBox> and to attach to a game object in your Unity scene. The script
                will be registered to the <InlineCodeBox>MainTrackingSystem</InlineCodeBox> automatically. For demonstration, lets look
                    into <InlineCodeBox>InteractionTrackingSystem</InlineCodeBox>. Inside the <InlineCodeBox>StartTracking(...)</InlineCodeBox>
                method you can handle what tracking controllers are handled by this system. Alternatively, you can track data directly
                from this class.</P>

                <CodeBox language="csharp" filename="InteractionTrackingSystem.cs">
                    {"public class InteractionTrackingSystem : TrackingSystemBase\n" +
                        "{\n" +
                        "    private static InteractionTrackingSystem _instance;\n" +
                        "    /// <summary>\n" +
                        "    /// Singleton instance of the InteractionTrackingSystem. Only one can exist at a time.\n" +
                        "    /// </summary>\n" +
                        "    public static InteractionTrackingSystem Instance => _instance ??= FindObjectOfType<InteractionTrackingSystem>();\n" +
                        "\n" +
                        "    public override MonoBehaviour GetInstance() => Instance;\n" +
                        "    public override void StartTracking(MainTrackingSystem mainTrackingSystem, TrackingContext ctx)\n" +
                        "    {\n" +
                        "       AddTrackingController<UiInteractionController>();\n" +
                        "       AddTrackingController<InteractionController>();\n" +
                        "       \n" +
                        "       if (Learner.Instance.IsVR)\n" +
                        "       {\n" +
                        "           AddTrackingController<ActionController>();\n" +
                        "           AddTrackingController<LaserPointerController>();\n" +
                        "        }\n" +
                        "        else\n" +
                        "        {\n" +
                        "           AddTrackingController<MouseInteractionController>();\n" +
                        "           AddTrackingController<KeyboardController>();\n" +
                        "        }\n" +
                        "\n" +
                        "        foreach (var tc in TrackingControllers)\n" +
                        "        {\n" +
                        "           tc.StartTracking(mainTrackingSystem, this, ctx);\n" +
                        "           mainTrackingSystem.AddConsiderProvider(tc);\n" +
                        "         }\n" +
                        "        }\n" +
                        "\n" +
                        "    public override TrackingMeta GetMeta(string metaContext) => TrackingMeta.Empty;\n" +
                        "}"}

                </CodeBox>

                <H>Create own tracking controllers</H>
                <P>One way to track data is to use the "Consider" mechanism. A more intuitive option is currently in work, but
                the idea behind is following: a tracking controller is checking all trackable game objects and start tracking
                mechanism for it. For example you can look at <InlineCodeBox>MouseInteractionController</InlineCodeBox>.
                Alternatively, you can override <InlineCodeBox>StartTracking(...)</InlineCodeBox> and <InlineCodeBox>StopTracking(...)</InlineCodeBox>
                    or trigger statements manually by using <InlineCodeBox>LRS.Instance.SendStatement(...)</InlineCodeBox> (like in <a href="#section-7">Step 7</a>).</P>

                <CodeBox language="csharp">
                    {"public class MouseInteractionController : TrackingControllerBase {\n" +
                        "...\n" +
                        "    public override void Consider(GameObject go)\n" +
                        "    {\n" +
                        "        if (!_isTracking)\n" +
                        "           return;\n" +
                        "        // Skip not pointable, interactable or trackable objects\n" +
                        "        var trackable = go.GetComponent<Trackable>();\n" +
                        "        if (trackable == null || !trackable.Has(Gestures.Interacting, Gestures.Pointing))\n" +
                        "            return;\n" +
                        "        ...\n" +
                        "        // Add interaction events to pointable\n" +
                        "        if (trackable.Has(Gestures.Pointing))\n" +
                        "        {\n" +
                        "            mouseEvents.onMouseEnter.AddListener(OnEnter);\n" +
                        "            mouseEvents.onMouseLeave.AddListener(OnLeave);\n" +
                        "        }\n" +
                        "        if (trackable.Has(Gestures.Interacting))\n" +
                        "        {\n" +
                        "            mouseEvents.onMouseClick.AddListener(OnClick);\n" +
                        "            mouseEvents.onMouseDown.AddListener(OnDown);\n" +
                        "            mouseEvents.onMouseUp.AddListener(OnUp);\n" +
                        "        }\n" +
                        "    }\n...\n}"}
                </CodeBox>

            </div>
        },
        {
            title: "How to validate tracked data",
            children: <div>

               ... coming soon ...

            </div>
        },
        {
            title: "How to write own adapter",
            children: <div>

                ... coming soon ...

            </div>
        },
        {
            title: "How to write registers",
            children: <div>

                ... coming soon ...

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
                        Looking for v2 of OmiLAXR? Click <a href="/get-started">here</a>.
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