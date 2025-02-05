import ThemeProvider from "../theme-provider";
import React from "react";
import {contentOf, type InstructionCardProps} from "./instructionCard";
import CodeBox, {InlineCodeBox} from "../CodeBox";
import {FigureManager} from "react-figure-ref";
import {OmiLAXRPipeline} from "../Pipeline";

function P({children}: any) {
    return <p className="pt-3 pb-3">{children}</p>
}

function H({children}: any) {
    return <h6 className="pt-3">{children}</h6>
}

export default function () {
    const fm = new FigureManager({
        figures: [
            {label: "components", imageSrc: "/pipeline/OmiLAXR_Pipeline_Blackbox.drawio.svg"},
            {label: "hierarchy", imageSrc: "/pipeline/hierarchy.png"},
            {label: "learner_pipeline", imageSrc: "/pipeline/learner_pipeline.png"},
            {label: "step-listeners", imageSrc: "/pipeline/Listeners.png"},
            {label: "learner_listeners", imageSrc: "/pipeline/learner_listeners.png"},
            {label: "step-filters", imageSrc: "/pipeline/Filters.png"},
            {label: "step-tb", imageSrc: "/pipeline/TrackingBehaviours.png"},
            {label: "step-composers", imageSrc: "/pipeline/Composers.png"},
            {label: "step-hooks", imageSrc: "/pipeline/Hooks.png"},
            {label: "step-endpoints", imageSrc: "/pipeline/Endpoints.png"},
        ]
    });

    const items: InstructionCardProps[] = [
        {
            title: "Actor Pipelines and Data Providers",
            children: <div>
                <fm.Figure caption="Pipeline Components. Blackbox view of the pipeline." label="components"
                           maxWidth="100%"/>

                <P>The overall progress involves multiple actor pipelines that communicate via asynchronous events with
                    the available data providers. A virtual scene is transferred asynchronously to a database.</P>

                <P>Both categories interact through asynchronous events, enabling
                    the use of multiple pipelines and, if necessary, multiple data providers.</P>

                <P>The key idea is to maintain separate pipelines for different actors. By default, OmiLAXR provides a
                    <InlineCodeBox>Learner Pipeline</InlineCodeBox> and a <InlineCodeBox>System Pipeline</InlineCodeBox>.
                    The <InlineCodeBox>Learner Pipeline</InlineCodeBox> processes actions and objects specifically related to
                    learner interactions (e.g. teleported event), while the <InlineCodeBox>System Pipeline</InlineCodeBox> functions in a similar
                    manner for system-related interactions (e.g. game start). This makes it possible to extend existing pipelines by new
                    components or build new pipelines with a set of components (depending on use case).</P>


                <P>The "Data Provider" stage operates independently of any data standard. In our examples, we are using
                    xAPI. To send data to the learning record store, the <InlineCodeBox>OmiLAXR.xAPI</InlineCodeBox> module
                    provides a set of Data Provider components for working with xAPI. Therefore, in the following
                    instructions, we will also be working with xAPI.</P>

                <P>The components are strictly organized in the game object hierarchy.
                    The <InlineCodeBox>OmiLAXR</InlineCodeBox>
                    and <InlineCodeBox>OmiLAXR.xAPI</InlineCodeBox> modules are providing Unity prefabs with
                    ready-to-use component sets (see <fm.FigureRef label="hierarchy"/>).</P>

                <fm.Figure caption="OmiLAXR Pipeline organized in Unity" label="hierarchy"
                           maxWidth="250px"/>

                <P>As example, in <fm.FigureRef label="learner_pipeline"/> you can see the Learner Pipeline. The
                    actor is defined by an own component and you can see a <InlineCodeBox>Learner Pipeline</InlineCodeBox>
                    component.</P>

                <fm.Figure caption="Learner Pipeline as example in Unity" label="learner_pipeline"
                           maxWidth="500px"/>

                <P>In our example, we are using an explicit <InlineCodeBox>Learner Pipeline</InlineCodeBox>. Alternatively,
                    to create an own pipeline, it is enough to use the <InlineCodeBox>Pipeline</InlineCodeBox> component.
                    However, even an own component for a custom pipeline is not needed, we strongly recommend to create one.
                    See for example, how an own pipeline component could look like.</P>

                <CodeBox language="csharp">
                    {"[AddComponentMenu(\"OmiLAXR / 0) Pipelines / Learner Pipeline\")]\n" +
                        "public class LearnerPipeline : Pipeline\n" +
                        "{\n" +
                        "   // do nothing \n" +
                        "}"}
                </CodeBox>


            </div>
        },
        {
            title: "Listener",
            children: <div>

                <fm.Figure caption="Listener Step" label="step-listeners" maxWidth="100%"/>

                <P>In first step, you are able to work with specific scene objects you can use Listeners to pass them to the
                    pipeline.</P>
                <P>You may define one Listener for many objects or define specific Listeners for different cases.</P>

                <P>In the following example code the Listener is looking for explicit GameObjects having the component <InlineCodeBox>Collider</InlineCodeBox>.
                    These objects are passed to the mandatory function <InlineCodeBox>Found(objects: Object[])</InlineCodeBox>.
                    Attention: as the parameter of <InlineCodeBox>Found(objects: Object[])</InlineCodeBox> is an array of
                    type <InlineCodeBox>Object</InlineCodeBox> it is also allowed to pass components instead of game objects.</P>

                <CodeBox language="csharp">
                    {"[AddComponentMenu(\"OmiLAXR / 1) Listeners / Collider Listener (YOUR_MODULE_NAME)\")]\n" +
                        "public sealed class ColliderListener : Listener\n" +
                        "{\n" +
                        "    public override void StartListening()\n" +
                        "    {\n" +
                        "        var exampleComponents = FindObjectsOfType<Collider>();\n" +
                        "        Found(exampleComponents);\n" +
                        "    }\n" +
                        "}"}
                </CodeBox>

                <P>The pipeline is triggered whenever <InlineCodeBox>Found(objects: Object[])</InlineCodeBox> is called.
                    This makes it possible to also wait asynchronously for specific in future appearing objects.</P>

                <P>The order of components is not relevant. All listeners are attached to one game objects (see <fm.FigureRef label="learner_listeners" />).</P>

                <H>Safe time by using AutoListener</H>
                <P>If you just need to find specific game components like in the example above, than we have a more easier way to implement the same. Here is an equivalent example of the <InlineCodeBox>ColliderListener</InlineCodeBox> implementation. Technically, <InlineCodeBox>AutoListener</InlineCodeBox> is doing the same as you can see above. The only thing you have to do is to provide the wished type.</P>

                <CodeBox language="csharp">
                    {"[AddComponentMenu(\"OmiLAXR / 1) Listeners / Collider Listener (YOUR_MODULE_NAME)\")]\n" +
                        "public sealed class ColliderListener : AutoListener<Collider>\n" +
                        "{\n" +
                        "   // do nothing \n" +
                        "}"
                    }
                </CodeBox>

                <fm.Figure caption="Example of listeners of Learner Pipeline" label="learner_listeners" maxWidth={"500px"} />

            </div>
        },
        {
            title: "Filters",
            children: <div>

                <fm.Figure caption="Filters Step" label="step-filters" maxWidth="100%"/>

                <P>The objects from the previous step are passed as input to the filtering stage.</P>

                <P>Filters can selectively isolate certain objects from the full set of passed objects.
                    This is useful in scenarios where you need to blacklist specific objects or manage particular ones
                    (such as <InlineCodeBox>InputManager</InlineCodeBox>). Since the filters are applied in a sequence,
                    their order is important. Objects that have already been filtered out will not be passed to subsequent filters.</P>

                <P>The following example demonstrates filtering specific objects by name using a blacklist.</P>

                <CodeBox language="csharp">
                    {"[AddComponentMenu(\"OmiLAXR / 2) Filters / Blacklist Filter\")]\n" +
                        "public class BlacklistFilter : Filter\n" +
                        "{\n" +
                        "    public List<string> blacklist;\n" +
                        "    public override Object[] Pass(Object[] objects)\n" +
                        "    {\n" +
                        "        return objects.Where(go => !blacklist.Contains(go.GetTrackingName())).ToArray();\n" +
                        "    }\n" +
                        "}"}
                </CodeBox>


            </div>
        },
        {
            title: "Tracking Behaviours",
            children: <div>

                <fm.Figure caption="Tracking Behaviours Step" label="step-tb" maxWidth="100%"/>

                <P><InlineCodeBox>Tracking Behaviours</InlineCodeBox> serve two main purposes.
                    Firstly, they can process previously passed objects and perform actions on them.
                    For example, if a list of buttons is provided, <InlineCodeBox>Tracking Behaviours</InlineCodeBox>
                    can attach listeners to the click events.</P>

                <P>Further the explicit event class <InlineCodeBox>TrackingBehaviourEvent</InlineCodeBox> ensures a clean
                    binding and unbinding of listener events whenever the pipeline is started, paused or restarted.</P>

                <CodeBox language="csharp">
                    {"[AddComponentMenu(\"OmiLAXR / 3) Tracking Behaviours / UI Tracking Behaviour\")]\n" +
                        "public class UiTrackingBehaviour : TrackingBehaviour\n" +
                        "{\n" +
                        "    [Gesture(\"UI\"), Action(\"Click\")]\n" +
                        "    public TrackingBehaviourEvent<Button> OnClickedButton = new TrackingBehaviourEvent<Button>();\n" +
                        "    ..." +
                        "    \n" +
                        "    protected override void AfterFilteredObjects(Object[] objects)\n" +
                        "    {\n" +
                        "        var selectables = Select<Selectable>(objects);\n" +
                        "        \n" +
                        "        foreach (var selectable in selectables)\n" +
                        "        {\n" +
                        "            var type = selectable.GetType();\n" +
                        "\n" +
                        "            if (type == typeof(Button))\n" +
                        "            {\n" +
                        "                var button = (Button)selectable;\n" +
                        "                OnClickedButton.Bind(button.onClick, () =>\n" +
                        "                {\n" +
                        "                    OnClickedButton?.Invoke(this, button);\n" +
                        "                });\n" +
                        "            }\n" +
                        "            ..." +
                        "        }\n" +
                        "    }\n" +
                        "}"}
                </CodeBox>


                <P>Secondly, they can respond to specific inputs or user gestures. This can be solved by using (for example)
                    the <InlineCodeBox>Update</InlineCodeBox> function of Unity or whatever is needed. One example for this usecase
                    can be seen in component <InlineCodeBox>MouseTrackingBehaviour</InlineCodeBox> in source code.</P>
                <P>Their core concept is to react to any kind of action (such as button clicks or interactions) and
                    emit public events for further processing. These events function as an interface for composers.</P>
                {/*<P>A more abstract example could be if we reuse our <InlineCodeBox>ExampleComponent</InlineCodeBox> again.*/}
                {/*We added a random event to the component and just react on its triggering.</P>*/}
            </div>
        },
        {
            title: "Composers",
            children: <div>

                <fm.Figure caption="Composers Step" label="step-composers" maxWidth="100%"/>

                <P><InlineCodeBox>Composers</InlineCodeBox> are the part where the events of
                    <InlineCodeBox>Tracking Behaviours</InlineCodeBox> are translated to data rows (in our example to
                    xAPI statements).</P>

                <P>In our example, our composer is waiting when the <InlineCodeBox>OnClickedButton</InlineCodeBox> event
                    is triggered by <InlineCodeBox>UiTrackingBehaviour</InlineCodeBox>.</P>

                <P>An xAPI statement can be composed by following the xAPI syntax of <InlineCodeBox>actor.Does(verb).Activity(activity)</InlineCodeBox>.
                    Further information (like context, result and activity extensions) can be provided by using <InlineCodeBox>.WithContext(resultExtension)</InlineCodeBox>
                    <InlineCodeBox>.WithContext(contextExtension)</InlineCodeBox> and <InlineCodeBox>.WithExtension(activityExtension)</InlineCodeBox> notation.</P>
                <P>The actor is assigned automatically depending on which actor pipeline triggers this specific <InlineCodeBox>Tracking Behaviour</InlineCodeBox>.</P>

                <P>The xAPI registry can be addressed by using <InlineCodeBox>xapi</InlineCodeBox> field.</P>

                <P>However, the old syntax is also enabled by using <InlineCodeBox>xAPIv1.CreateStatement(statement)</InlineCodeBox>
                    (instead of actor) and <InlineCodeBox>xAPI_Definitions</InlineCodeBox> (instead of xapi) class.</P>

                <P>Further, we enabled to provide a responsible person to ensure some kind of data quality. This is covered
                    by a mandatory method <InlineCodeBox>GetAuthor()</InlineCodeBox>. This information is provided automatically
                    to a xAPI statement.</P>

                <CodeBox language="csharp">
                    {"[AddComponentMenu(\"OmiLAXR / 4) Composers / UI Statement Composer (xAPI)\")]\n" +
                        "public sealed class UiComposer : XApiComposer<UiTrackingBehaviour>\n" +
                        "{\n" +
                        "    protected override Author GetAuthor()\n" +
                        "        => new Author(\"Sergej Görzen\", \"goerzen@cs.rwth-aachen.de\");\n" +
                        "    protected override void Compose(UiTrackingBehaviour tb)\n" +
                        "    {\n" +
                        "        tb.OnClickedButton.AddHandler((_, button) =>\n" +
                        "        {\n" +
                        "            var buttonName = button.gameObject.GetTrackingName();\n" +
                        "            var text = button.GetTextOrDefault();\n" +
                        "            \n" +
                        "            var statement = actor.Does(xapi.generic.verbs.clicked)\n" +
                        "                .WithExtension(xapi.virtualReality.extensions.activity\n" +
                        "                    .uiElementValue(text)\n" +
                        "                    .uiElementType(\"button\")\n" +
                        "                    .vrObjectName(buttonName))\n" +
                        "                .Activity(xapi.virtualReality.activities.uiElement);\n" +
                        "            \n" +
                        "            SendStatement(statement);\n" +
                        "        });\n" +
                        "        ...\n" +
                        "    }\n" +
                        "}"}
                </CodeBox>

                <P>If another data standard is wished instead of xAPI, than a new data composer class need to be implemented
                    analog to <InlineCodeBox>XApiComposer</InlineCodeBox>.</P>

                <h5 style={{fontSize: "20px"}}>Higher or Semantic Composers</h5>

                <P>Our pipeline allows to create higher level <InlineCodeBox>Composers</InlineCodeBox> right before processing
                    to hooks. They are useful, for example, if you wish to compose further statements depending on some existing other
                    statements. They are triggered whenever a set of conditions is matched.</P>

                <P>In our example, we create a new statement whenever mouse clicked happened one time and move event 5 times.
                    For checking the statements there some <InlineCodeBox>Match</InlineCodeBox> functions.</P>

                <CodeBox language="csharp">
                    {"[AddComponentMenu(\"OmiLAXR / 4.1) Higher Composers / Example Semantic Composer (YOUR_MODULE_NAME)\")]\n" +
                        "public sealed class ExampleSemanticComposer : xApiStatementSemanticComposer<LearnerPipeline>\n" +
                        "{\n" +
                        "    protected override Author GetAuthor()\n" +
                        "        => new Author(\"Sergej Görzen\", \"goerzen@cs.rwth-aachen.de\");\n" +
                        "    protected override Dictionary<string, MatchCondition<xApiStatement>> Conditions()\n" +
                        "        => new Dictionary<string, MatchCondition<xApiStatement>>\n" +
                        "        {\n" +
                        "            { \"clicked\", new MatchCondition<xApiStatement>(1, stmt => stmt.MatchKeys(\"clicked\", \"mouse\")) },\n" +
                        "            { \"moved\", new MatchCondition<xApiStatement>(10, stmt => stmt.MatchKeys(\"moved\", \"mouse\")) }\n" +
                        "        };\n" +
                        "    protected override void OnMatchAllConditions(Dictionary<string, IEnumerable<xApiStatement>> matchingStatements)\n" +
                        "    {\n" +
                        "        // Get clicked statement\n" +
                        "        var clickedStatement = matchingStatements[\"clicked\"].First();\n" +
                        "        // Get first and last move statement\n" +
                        "        var movedMatch = matchingStatements[\"moved\"];\n" +
                        "        var firstMoveStatement = movedMatch.First();\n" +
                        "        var lastMoveStatement = movedMatch.Last();\n" +
                        "        // Compose new statement\n" +
                        "        var stmt = actor.Does(xapi.generic.verbs.achieved)\n" +
                        "            .Activity(xapi.generic.activities.goal)\n" +
                        "            .WithExtension(xapi.generic.extensions.activity.name(\"dragged\"));\n" +
                        "        SendStatement(stmt);" +
                        "    }\n" +
                        "}"}
                </CodeBox>

            </div>
        },
        {
            title: "Hooks",
            children: <div>

                <fm.Figure caption="Hooks Step" label="step-hooks" maxWidth="100%"/>

                <P><InlineCodeBox>Hooks</InlineCodeBox> are a mechanism which allows you to manipulate existing statements
                    composed by all <InlineCodeBox>Composers</InlineCodeBox>.</P>

                <P>One sensible use case for Hooks is whenever you wish to extend all statements by context information.</P>

                <CodeBox language="csharp">
                    {"[AddComponentMenu(\"OmiLAXR / 5) Hooks / Scenario Context Hook (xAPI)\")]\n" +
                        "public class ScenarioContextHook : xApiHook\n" +
                        "{\n" +
                        "    protected override xApiStatement AfterCompose(xApiStatement statement)\n" +
                        "    {\n" +
                        "        ...\n" +
                        "        if (FpsMonitor.Instance && FpsMonitor.Instance.enabled)\n" +
                        "        {\n" +
                        "            // Todo: add when fps is in Registry\n" +
                        "            statement.WithContext(xapi.systemControl.extensions.context.fps(FpsMonitor.Instance.fps));\n" +
                        "        }\n" +
                        "        \n" +
                        "        ...\n" +
                        "        return statement;\n" +
                        "    }\n" +
                        "}"}
                </CodeBox>


                <P>Further, we match for specific statements. For example, when ever a "clicked" verb statement is detected we change the verb
                    to "interacted".</P>

                <CodeBox language="csharp">
                    {"[AddComponentMenu(\"OmiLAXR / 5) Hooks / Example Hook (YOUR_MODULE_NAME)\")]\n" +
                        "public sealed class ExampleHook : xApiStatementHook\n" +
                        "{\n" +
                        "    protected override xApiStatement AfterCompose(xApiStatement statement)\n" +
                        "    {\n" +
                        "        // change all clicked verbs by interacted\n" +
                        "        if (statement.MatchKeys(\"clicked\", \"uiElement\"))\n" +
                        "        {\n" +
                        "            DebugLog.xAPI.Print($\"Matches keys 'clicked' and 'uiElement': {statement}\");\n" +
                        "            statement.Verb(xapi.virtualReality.verbs.interacted)\n" +
                        "                .ChangedBy(\"Sergej G.\", \"goerzen@informatik.rwth-aachen.de\");\n" +
                        "            DebugLog.xAPI.Print($\"Exchanged 'clicked' by 'interacted': {statement}\");\n" +
                        "        }" +
                        "\n..." +
                        "}"}
                </CodeBox>

            </div>
        },
        {
            title: "Endpoints",
            children: <div>

                <fm.Figure caption="Endpoints Step" label="step-endpoints" maxWidth="100%"/>

                <P><InlineCodeBox>Endpoints</InlineCodeBox> are responsible to translate the data to a needed format
                    (e.g. JSON) and provide it to a wished endpoint. This can be, for example, a simple MongoDB, a REST API
                    or Learning Record Store. As we are working with xAPI in our example we are transforming the xAPI
                    statement to a TinCan standardized object (using <a href="https://github.com/RusticiSoftware/TinCan.NET">TinCan.NET</a>)
                    and send it to a Learning Record Store. The TinCan.NET library is already delivered by installing
                    the <InlineCodeBox>OmiLAXR.xAPI</InlineCodeBox> module.</P>

                <P>As long you don't need a new endpoint type, you can reuse existing components.</P>

                <CodeBox language="csharp">
                    {"[AddComponentMenu(\"OmiLAXR / 6) Endpoints / Learning Record Store (LRS for xAPI)\")]\n" +
                        "public class LearningRecordStore : Endpoint\n" +
                        "{\n" +
                        "    ...\n" +
                        "\n" +
                        "    protected override TransferCode HandleSending(IStatement statement)\n" +
                        "    {\n" +
                        "       \n" +
                        "        var stmt = statement as xApiStatement;\n" +
                        "        // Transfer single statement to LRS\n" +
                        "        var resp = _remoteLRS.SaveStatement(stmt.ToTinCanStatement(statementIdUri));\n" +
                        "\n" +
                        "        if (resp.success) \n" +
                        "            return TransferCode.Success;\n" +
                        "        \n" +
                        "        // Print error message to know more about on debug\n" +
                        "        DebugLog.xAPI.Error($\"Error Message: {resp.errMsg}, Http Error: {resp.httpException}\");\n" +
                        "        return TransferCode.Error;\n" +
                        "    }\n" +
                        "}"}
                </CodeBox>

            </div>
        }
    ];

    return (
        <ThemeProvider>
            <div className="h-full w-screen place-items-center py-20">
                <div className="container mx-auto items-center relative">
                    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">OmiLAXR
                        Pipeline</h1>
                    <p style={{color: 'red'}}
                       className="mb-6 text-lg font-normal lg:text-xl">
                        Looking for setup? Click <a href="/get-started" className="underline">here</a>.
                    </p>

                    <p className="mb-6 mt-6 text-lg font-normal lg:text-xl">
                        The OmiLAXR Pipeline gives you the possibility to create modular tracking mechanisms in form of
                        a pipeline.
                    </p>

                    {/*<OmiLAXRPipeline/>*/}
                    <img src="./pipeline/OmiLAXR_Pipeline.drawio.svg" style={{background: "white"}} alt="OmiLAXR Pipeline" />

                    <p className="mb-6 mt-6 text-lg font-normal lg:text-xl">
                        The pipeline is lead by four questions:
                    </p>
                    <ol className="mb-6 mt-6 text-lg font-normal lg:text-xl">
                        <li>1. <strong>What</strong> targets should be tracked? (Listeners and Filters)</li>
                        <li>2. <strong>When</strong> should tracking be triggered? (Tracking Behaviours)</li>
                        <li>3. <strong>How</strong> should data be encoded? (Composers and Hooks)</li>
                        <li>4. <strong>Where</strong> should the data be stored? (Endpoints)</li>
                    </ol>

                    <p className="mb-6 mt-6 text-lg font-normal lg:text-xl">
                        In the following you will get detailed information about the pipelines components.
                    </p>

                    {contentOf(items)}
                </div>
            </div>
        </ThemeProvider>
    );
};