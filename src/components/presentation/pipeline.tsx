import ThemeProvider from "../theme-provider";
import React from "react";
import {contentOf, type InstructionCardProps} from "./instructionCard";
import CodeBox, {InlineCodeBox} from "../CodeBox";
import {FigureManager} from "react-figure-ref/lib/FigureManager.js";
import {OmiLAXRPipeline} from "../Pipeline";
import Package from "../Package";
import Tabs from "../Tabs";
import "./pipeline.scss";

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

                <P>The overall process involves multiple actor pipelines that communicate with available data providers
                    via asynchronous events. A virtual scene is asynchronously transferred to a database.</P>

                <P>Both categories interact through asynchronous events, allowing the use of multiple pipelines and, if
                    necessary, multiple data providers.</P>

                <P>The key idea is to maintain separate pipelines for different actors. By
                    default, <Package>OmiLAXR</Package> provides a <InlineCodeBox>Learner Pipeline</InlineCodeBox> and
                    a <InlineCodeBox>System Pipeline</InlineCodeBox>. The <InlineCodeBox>Learner
                        Pipeline</InlineCodeBox> processes actions and objects related specifically to learner
                    interactions (e.g., teleport events), while the <InlineCodeBox>System
                        Pipeline</InlineCodeBox> handles system-related interactions (e.g., game start). This separation
                    makes it possible to extend existing pipelines with new components or to build entirely new
                    pipelines depending on the use case.</P>

                <P>The "Data Provider" stage operates independently of any specific data standard. In our examples, we
                    use xAPI. To send data to the learning record store, the <Package>OmiLAXR.xAPI</Package> module
                    provides a set of Data Provider components for working with xAPI. Therefore, in the following
                    instructions, we will also be working with xAPI.</P>

                <P>The components are strictly organized in the game object
                    hierarchy. <Package>OmiLAXR</Package> provides the core system and ready-to-use components for the
                    blue part of the pipeline, while <Package>OmiLAXR.xAPI</Package> provides ready-to-use components
                    for the green part. Both also include prefabs with predefined component sets (see <fm.FigureRef
                        label="hierarchy"/>).</P>

                <fm.Figure
                    caption="OmiLAXR Pipeline organized in Unity"
                    label="hierarchy"
                    width="100%"
                    maxWidth="900px"
                />

                <P>As an example, in <fm.FigureRef label="learner_pipeline"/> you can see the Learner Pipeline. The
                    actor is defined by a custom component, and you can see a <InlineCodeBox>Learner
                        Pipeline</InlineCodeBox> component attached.</P>

                <fm.Figure
                    caption="Learner Pipeline as example in Unity"
                    label="learner_pipeline"
                    width="100%"
                    maxWidth="900px"
                />

                <P>In our example, we use an explicit <InlineCodeBox>Learner Pipeline</InlineCodeBox>. Alternatively, to
                    create a custom pipeline, it is sufficient to use
                    the <InlineCodeBox>Pipeline</InlineCodeBox> component directly. Although a separate component is not
                    strictly required for a custom pipeline, we strongly recommend creating one. Below is an example of
                    what such a custom pipeline component might look like.</P>

                <Tabs tabs={[{
                    id: "learner",
                    label: "Learner Pipeline",
                    content: <CodeBox language="csharp">
                        {"[AddComponentMenu(\"OmiLAXR / 0) Pipelines / Learner Pipeline\")]\n" +
                            "public class LearnerPipeline : Pipeline\n" +
                            "{\n" +
                            "   // do nothing \n" +
                            "}"}
                    </CodeBox>
                }, {
                    id: "system",
                    label: "System Pipeline",
                    content: <CodeBox language="csharp">
                        {"[AddComponentMenu(\"OmiLAXR / 0) Pipelines / System Pipeline\")]\n" +
                            "public class SystemPipeline : Pipeline\n" +
                            "{\n" +
                            "   // do nothing \n" +
                            "}"}
                    </CodeBox>
                }, {
                    id: "custom",
                    label: "Your custom pipeline",
                    content: <CodeBox language="csharp">
                        {"[AddComponentMenu(\"OmiLAXR / 0) Pipelines / Custom Pipeline\")]\n" +
                            "public class CustomPipeline : Pipeline\n" +
                            "{\n" +
                            "   // do nothing \n" +
                            "}"}
                    </CodeBox>
                }]}/>


            </div>
        },
        {
            title: "Listener",
            children: <div>

                <fm.Figure caption="Listener Step" label="step-listeners" maxWidth="100%"/>

                <P>In the first step, you can work with specific scene objects by using Listeners to pass them to the
                    pipeline.</P>

                <P>You may define a single Listener for multiple objects or use separate Listeners for different
                    cases.</P>

                <P>In the following example, the Listener searches for GameObjects that have
                    the <InlineCodeBox>SelectableObjectsListener</InlineCodeBox> component. These objects are passed to
                    the required function <InlineCodeBox>Found(objects: Selectables[])</InlineCodeBox>.
                    Note: Since the parameter of <InlineCodeBox>Found(objects: Object[])</InlineCodeBox> is an array of
                    type <InlineCodeBox>Object</InlineCodeBox>, it is also valid to pass components instead of
                    GameObjects.</P>

                <Tabs tabs={[{
                    id: "selectable",
                    label: "<Selectable> Listener Example",
                    content: <CodeBox language="csharp">
                        {"[AddComponentMenu(\"OmiLAXR / 1) Listeners / <Selectable> Listener\")]\n" +
                            "[Description(\"Provides all <Selectable> components to pipeline.\")]\n" +
                            "public sealed class SelectableObjectsListener : Listener\n" +
                            "{\n" +
                            "    public override void StartListening()\n" +
                            "    {\n" +
                            "        var selectables = FindObjectsOfType<Selectable>();\n" +
                            "        Found(selectables);\n" +
                            "    }\n" +
                            "}"}
                    </CodeBox>
                }, {
                    id: "xrbaseinteractable",
                    label: "<XRBaseInteractable> Listener Example",
                    content: <CodeBox language="csharp">
                        {"[AddComponentMenu(\"OmiLAXR / 1) Listeners / <XRBaseInteractable> Objects Listener (UnityXR)\")]\n" +
                            "[Description(\"Provides all <XRBaseInteractable> components to pipeline.\")]\n" +
                            "public sealed class XRBaseInteractableListener : Listener\n" +
                            "{\n" +
                            "    public override void StartListening()\n" +
                            "    {\n" +
                            "        var interactables = FindObjectsOfType<XRBaseInteractable>();\n" +
                            "        Found(interactables);\n" +
                            "    }\n" +
                            "}"}
                    </CodeBox>
                }]}/>

                <P>The pipeline is triggered whenever <InlineCodeBox>Found(objects: Object[])</InlineCodeBox> is called.
                    This also makes it possible to wait asynchronously for objects that appear later during runtime.</P>

                <P>The order of components is not relevant. All listeners are attached to a single GameObject
                    (see <fm.FigureRef label="learner_listeners"/>).</P>

                <H>Save time by using AutoListener</H>

                <P>If you only need to find specific game components as shown in the example above, we provide an easier
                    way to implement this. Below is an equivalent implementation
                    of <InlineCodeBox>SelectableObjectsListener</InlineCodeBox> using <InlineCodeBox>AutoListener</InlineCodeBox>.
                    Technically, <InlineCodeBox>AutoListener</InlineCodeBox> works the same way. The only thing you need
                    to do is provide the desired type.</P>

                <Tabs tabs={[{
                    id: "selectable",
                    label: "<Selectable> Listener Example",
                    content: <CodeBox language="csharp">
                        {"[AddComponentMenu(\"OmiLAXR / 1) Listeners / <Selectable> Listener\")]\n" +
                            "[Description(\"Provides all <Selectable> components to pipeline.\")]\n" +
                            "public sealed class SelectableObjectsListener : AutoListener<Selectable>\n" +
                            "{\n" +
                            "   // do nothing \n" +
                            "}"
                        }
                    </CodeBox>
                }, {
                    id: "xrbaseinteractable",
                    label: "<XRBaseInteractable> Listener Example",
                    content: <CodeBox language="csharp">
                        {"[AddComponentMenu(\"OmiLAXR / 1) Listeners / <XRBaseInteractable> Objects Listener (UnityXR)\")]\n" +
                            "[Description(\"Provides all <XRBaseInteractable> components to pipeline.\")]\n" +
                            "public sealed class XRBaseInteractableListener : AutoListener<XRBaseInteractable>\n" +
                            "{\n" +
                            "   // do nothing \n" +
                            "}"
                        }
                    </CodeBox>
                }]}/>


                <fm.Figure
                    caption="Example of listeners of Learner Pipeline"
                    label="learner_listeners"
                    width="100%"
                    maxWidth="900px"
                />

            </div>
        },
        {
            title: "Filters",
            children: <div>

                <fm.Figure caption="Filters Step" label="step-filters" maxWidth="100%"/>

                <P>The objects from the previous step are passed as input to the filtering stage.</P>

                <P>Filters can selectively isolate certain objects from the full set of input objects.
                    This is useful in scenarios where you need to blacklist specific objects or manage particular ones
                    (such as <InlineCodeBox>InputManager</InlineCodeBox>). Since filters are applied in sequence,
                    their order is important — objects that have already been filtered out will not be passed to
                    subsequent filters.</P>

                <P>The following example demonstrates how to filter specific objects by name using a blacklist.</P>

                <Tabs tabs={[{
                    id: "blacklist",
                    label: "Blacklist Filter Example",
                    content: <CodeBox language="csharp">
                        {"[AddComponentMenu(\"OmiLAXR / 2) Filters / Blacklist Filter\")]\n" +
                            "[Description(\"Filters found objects by a blacklist of tracking names. The names are get with go.GetTrackingName().\")]\n" +
                            "public class BlacklistFilter : Filter\n" +
                            "{\n" +
                            "    public List<string> blacklist;\n" +
                            "    public override Object[] Pass(Object[] objects)\n" +
                            "    {\n" +
                            "        return objects.Where(go => !blacklist.Contains(go.GetTrackingName())).ToArray();\n" +
                            "    }\n" +
                            "}"}
                    </CodeBox>
                }, {
                    id: "excludefromtracking",
                    label: "<Exclude From Tracking> Filter Example",
                    content: <CodeBox language="csharp">
                        {"[AddComponentMenu(\"OmiLAXR / 2) Filters / <Exclude From Tracking> Filter\")]\n" +
                            "[Description(\"Filters found objects that have the component <Exclude From Tracking>.\")]\n" +
                            "public class ExcludeFromTrackingFilter : Filter\n" +
                            "{\n" +
                            "    public override Object[] Pass(Object[] objects)\n" +
                            "    {\n" +
                            "        return objects.Exclude<ExcludeFromTracking>();\n" +
                            "    }\n" +
                            "}"}
                    </CodeBox>
                }]}/>


            </div>
        },
        {
            title: "Tracking Behaviours",
            children: <div>

                <fm.Figure caption="Tracking Behaviours Step" label="step-tb" width="100%" maxWidth="900px"/>

                <P><InlineCodeBox>Tracking Behaviours</InlineCodeBox> serve two main purposes.
                    First, they can process previously passed objects and perform actions on them.
                    For example, if a list of buttons is provided, <InlineCodeBox>Tracking Behaviours</InlineCodeBox>
                    can attach listeners to their click events.</P>

                <P>In addition, the explicit event class <InlineCodeBox>TrackingBehaviourEvent</InlineCodeBox> ensures
                    a <strong>clean binding and unbinding</strong> of listener events whenever the pipeline is started,
                    paused, or
                    restarted. If you want to use other event types, you will need to unbind the events manually by
                    using <InlineCodeBox>Dispose(Object[] objects)</InlineCodeBox>.</P>

                <h5 style={{fontSize: "20px", marginTop: "1em"}}>Base Classes</h5>

                <P>There are three ways to implement <InlineCodeBox>Tracking Behaviours</InlineCodeBox>:</P>

                <ul style={{listStyleType: "disc", marginLeft: "20px"}}>
                    <li><InlineCodeBox>TrackingBehaviour&lt;T&gt;</InlineCodeBox>: Recommended in most cases. You need
                        to implement <InlineCodeBox>AfterFilteredObjects(T[] objects)</InlineCodeBox>.
                    </li>
                    <li><InlineCodeBox>TrackingBehaviour</InlineCodeBox>: Equivalent
                        to <InlineCodeBox>TrackingBehaviour&lt;Object&gt;</InlineCodeBox>,
                        but you implement <InlineCodeBox>AfterFilteredObjects(Object[] objects)</InlineCodeBox>.
                        Recommended
                        if you need to handle different types of objects in one class.
                    </li>
                    <li><InlineCodeBox>ObjectlessTrackingBehaviour</InlineCodeBox>: Choose this base class if you only
                        want to use other methods
                        like <InlineCodeBox>Start()</InlineCodeBox> and <InlineCodeBox>Update()</InlineCodeBox>, or the
                        events below, and don't need to work with piped objects. It is based
                        on <InlineCodeBox>TrackingBehaviour&lt;Object&gt;</InlineCodeBox>
                        and leaves the <InlineCodeBox>AfterFilteredObjects</InlineCodeBox> method empty.
                    </li>
                </ul>

                <P>The following examples demonstrate various <InlineCodeBox>Tracking Behaviours</InlineCodeBox>.</P>

                <Tabs tabs={[{
                    id: "tb1",
                    label: "UiTrackingBehaviour (TrackingBehaviour<T> Example)",
                    content: <CodeBox language="csharp">
                        {"[AddComponentMenu(\"OmiLAXR / 3) Tracking Behaviours / UI Tracking Behaviour\")]\n" +
                            "[Description(\"Tracks interaction with <Button>, <Slider>, <Dropdown>, <TMP_Dropdown>, <Toggle>, <InputField>, <TMP_InputField> and <Scrollbar> components.\")]\n" +
                            "public class UiTrackingBehaviour : TrackingBehaviour<Selectable>\n" +
                            "{\n" +
                            "    [Gesture(\"UI\"), Action(\"Click\")]\n" +
                            "    public TrackingBehaviourEvent<Button> OnClickedButton = new TrackingBehaviourEvent<Button>();\n" +
                            "    ..." +
                            "    \n" +
                            "    protected override void AfterFilteredObjects(Selectable[] selectables)\n" +
                            "    {\n" +
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
                            "            else if (type == typeof(Slider))\n" +
                            "            {\n" +
                            "                var slider = (Slider)selectable;\n" +
                            "                OnChangedSlider.Bind(slider.onValueChanged,\n" +
                            "                    value => { OnChangedSlider.Invoke(this, slider, value); });\n" +
                            "            }" +
                            "            ..." +
                            "        }\n" +
                            "    }\n" +
                            "}"}
                    </CodeBox>
                }, {
                    id: "XrInteractable",
                    label: "XRBaseInteractable Tracking Behaviour (InteractableTrackingBehaviour Example)",
                    content: <CodeBox language="csharp">
                        {"[AddComponentMenu(\"OmiLAXR / 3) Tracking Behaviours / XRBaseInteractable Tracking Behaviour (UnityXR)\"), \n" +
                            "Description(\"A <InteractableTrackingBehaviour> for tracking XR controllers by using <XRBaseInteractable> components.\")]\n" +
                            "public class XRBaseInteractableTrackingBehaviour : InteractableTrackingBehaviour\n" +
                            "{\n" +
                            "    private UnityAction<HoverEnterEventArgs> _hoverEnterAction;\n" +
                            "    private UnityAction<HoverExitEventArgs> _hoverExitAction;\n" +
                            "\n" +
                            "    private void SelectEnter(SelectEnterEventArgs e)\n" +
                            "    {\n" +
                            "        OnGrabbed.Invoke(this, new InteractableEventArgs(e.interactableObject.transform.gameObject));\n" +
                            "    }\n" +
                            "\n" +
                            "    private void SelectExit(SelectExitEventArgs e)\n" +
                            "    {\n" +
                            "        OnInteracted.Invoke(this, new InteractableEventArgs(e.interactableObject.transform.gameObject));\n" +
                            "    }\n" +
                            "\n" +
                            "    protected override void AfterFilteredObjects(Object[] objects)\n" +
                            "    {\n" +
                            "        var interactables = Select<XRBaseInteractable>(objects);\n" +
                            "        foreach (var interactable in interactables)\n" +
                            "        {\n" +
                            "            interactable.hoverEntered.AddListener(_hoverEnterAction = e =>\n" +
                            "            {\n" +
                            "                OnTouched.Invoke(this, new InteractableEventArgs(e.interactableObject.transform.gameObject));\n" +
                            "            });\n" +
                            "            interactable.hoverExited.AddListener(_hoverExitAction = e =>\n" +
                            "            {\n" +
                            "               OnReleased.Invoke(this, new InteractableEventArgs(e.interactableObject.transform.gameObject));\n" +
                            "            });\n" +
                            "            interactable.selectEntered.AddListener(SelectEnter);\n" +
                            "            interactable.selectExited.AddListener(SelectExit);\n" +
                            "        }\n" +
                            "    }\n" +
                            "\n" +
                            "    protected override void Dispose(Object[] objects)\n" +
                            "    {\n" +
                            "        base.Dispose(objects);\n" +
                            "        var interactables = Select<XRBaseInteractable>(objects);\n" +
                            "        foreach (var interactable in interactables)\n" +
                            "        {\n" +
                            "            interactable.hoverEntered.RemoveListener(_hoverEnterAction);\n" +
                            "            interactable.hoverExited.RemoveListener(_hoverExitAction);\n" +
                            "            interactable.selectEntered.RemoveListener(SelectEnter);\n" +
                            "            interactable.selectExited.RemoveListener(SelectExit);\n" +
                            "        }\n" +
                            "    }\n" +
                            "}"}
                    </CodeBox>
                }]}/>


                <h5 style={{fontSize: "20px", marginTop: "1em"}}>Pipeline Events</h5>

                <P><InlineCodeBox>Tracking Behaviours</InlineCodeBox> also support several events you can react to:</P>

                <ul style={{listStyleType: "disc", marginLeft: "20px"}}>
                    <li><InlineCodeBox>OnStartedPipeline</InlineCodeBox>: Triggered when the pipeline starts.</li>
                    <li><InlineCodeBox>OnStoppedPipeline</InlineCodeBox>: Triggered when the pipeline stops.</li>
                    <li><InlineCodeBox>AfterFoundObjects</InlineCodeBox>: Triggered before any filters are applied.</li>
                    <li><InlineCodeBox>AfterFilteredObjects</InlineCodeBox>: A mandatory method you must implement
                        (unless you're using <InlineCodeBox>ObjectlessTrackingBehaviour</InlineCodeBox>).
                    </li>
                </ul>

                <Tabs tabs={[{
                    id: "sessiontracker",
                    label: "SessionTrackingBehaviour (Pipeline Events Example)",
                    content: <CodeBox language="csharp">
                        {"[AddComponentMenu(\"OmiLAXR / 3) Tracking Behaviours / Session Tracking Behaviour\")]\n" +
                            "[Description(\"Tracks the start and end of a session.\")]\n" +
                            "public class SessionTrackingBehaviour : ObjectlessTrackingBehaviour\n" +
                            "{\n" +
                            "    public readonly TrackingBehaviourEvent<DateTime> OnSessionStarted = new TrackingBehaviourEvent<DateTime>();\n" +
                            "    public readonly TrackingBehaviourEvent<DateTime> OnSessionStopped = new TrackingBehaviourEvent<DateTime>();\n" +
                            "    protected override void OnStartedPipeline(Pipeline pipeline)\n" +
                            "    {\n" +
                            "        OnSessionStarted.Invoke(this, DateTime.Now);\n" +
                            "    }\n" +
                            "\n" +
                            "    protected override void OnStoppedPipeline(Pipeline pipeline)\n" +
                            "    {\n" +
                            "        OnSessionStopped.Invoke(this, DateTime.Now);\n" +
                            "    }\n" +
                            "}"}
                    </CodeBox>
                }]}/>

                <P>The core concept is to react to any kind of action (such as button clicks or interactions) and emit
                    public events for further processing. These events serve as an interface for composers.</P>

                <h5 style={{fontSize: "20px"}}>(Special Use Cases Only) Standardized Tracking Behaviour</h5>

                <P>We are working on standardizing certain <InlineCodeBox>Tracking Behaviours</InlineCodeBox>. For
                    example, in the case
                    of <InlineCodeBox>Interactables</InlineCodeBox> or <InlineCodeBox>EyeTracking</InlineCodeBox>, the
                    same events must be triggered across all XR frameworks. The only difference lies in the Unity
                    components that must be handled and the conditions under which the events occur. This allows us to
                    predefine xAPI statements for those events.</P>

                <P>Here are our currently standardized Tracking Behaviours. All you need to do is extend these classes
                    and trigger the corresponding events. Since there are already
                    standardized <InlineCodeBox>Composers</InlineCodeBox> available in <Package>OmiLAXR.xAPI</Package>,
                    you don’t need to implement your own.</P>
                <Tabs tabs={[{
                    id: "InteractableTrackingBehaviour",
                    label: "InteractableTrackingBehaviour Base Class",
                    content: <CodeBox language="csharp">{
                        "public abstract class InteractableTrackingBehaviour : TrackingBehaviour\n" +
                        "{\n" +
                        "    [Gesture(\"XRController\"), Action(\"Interacted\")]\n" +
                        "    public TrackingBehaviourEvent<InteractableEventArgs> OnInteracted = new TrackingBehaviourEvent<InteractableEventArgs>();\n" +
                        "    \n" +
                        "    [Gesture(\"XRController\"), Action(\"Touched\")]\n" +
                        "    public TrackingBehaviourEvent<InteractableEventArgs> OnTouched = new TrackingBehaviourEvent<InteractableEventArgs>();\n" +
                        "    \n" +
                        "    [Gesture(\"XRController\"), Action(\"Released\")]\n" +
                        "    public TrackingBehaviourEvent<InteractableEventArgs> OnReleased = new TrackingBehaviourEvent<InteractableEventArgs>();\n" +
                        "\n" +
                        "    [Gesture(\"XRController\"), Action(\"Grabbed\")]\n" +
                        "    public TrackingBehaviourEvent<InteractableEventArgs> OnGrabbed = new TrackingBehaviourEvent<InteractableEventArgs>();\n" +
                        "}"
                    }</CodeBox>
                }, {
                    id: "eyetracking",
                    label: "EyeTracking Tracking Behaviour Base Class (v2.1.0 WIP)",
                    content: <CodeBox language="csharp">{
                        "public abstract class EyeTrackingBehaviour : ObjectlessTrackingBehaviour\n" +
                        "{\n" +
                        "    /// <summary>\n" +
                        "    /// Notable change in pupil size occurs. Track cognitive load or emotional response.\n" +
                        "    /// </summary>\n" +
                        "    public abstract PupilDilationData? GetPupilDilationData();\n" +
                        "    \n" +
                        "    public abstract double? GetViewingAngle();\n" +
                        "    \n" +
                        "    /// <summary>\n" +
                        "    /// The eye moves on to focus on a particular point (fixation). Log attention on specific Areas of Interest (AOIs), durations, and transitions.\n" +
                        "    /// </summary>\n" +
                        "    [Gesture(\"Eyes\"), Action(\"Fixate\")]\n" +
                        "    public readonly TrackingBehaviourEvent<FixationData> OnFixated = new TrackingBehaviourEvent<FixationData>();\n" +
                        "    /// <summary>\n" +
                        "    /// Rapid movement occurs between two fixations. Track gaze shifts and identify scanning patterns.\n" +
                        "    /// </summary>\n" +
                        "    [Gesture(\"Eyes\"), Action(\"Saccade\")]\n" +
                        "    public readonly TrackingBehaviourEvent<SaccadeData> OnSaccaded = new TrackingBehaviourEvent<SaccadeData>();\n" +
                        "    /// <summary>\n" +
                        "    /// Small involuntary movement happens during fixation. Study attention or response to stimuli within a fixation.\n" +
                        "    /// </summary>\n" +
                        "    [Gesture(\"Eyes\"), Action(\"Micro Saccade\")]\n" +
                        "    public readonly TrackingBehaviourEvent<MicroSaccadeData> OnMicroSaccaded = new TrackingBehaviourEvent<MicroSaccadeData>();\n" +
                        "    /// <summary>\n" +
                        "    /// Gaze data is temporarily lost due to a blink. Monitor engagement, fatigue, or workload.\n" +
                        "    /// </summary>\n" +
                        "    [Gesture(\"Eyes\"), Action(\"Blink\")]\n" +
                        "    public readonly TrackingBehaviourEvent<BlinkData> OnBlinked = new TrackingBehaviourEvent<BlinkData>();\n" +
                        "    /// <summary>\n" +
                        "    /// Notable change in pupil size occurs. Track cognitive load or emotional response.\n" +
                        "    /// </summary>\n" +
                        "    [Gesture(\"Eyes\"), Action(\"Pupil Dilation\")]\n" +
                        "    public readonly TrackingBehaviourEvent<PupilDilationData> OnPupilDilation = new TrackingBehaviourEvent<PupilDilationData>();\n" +
                        "}\n"
                    }</CodeBox>
                }]}/>

                <h5 style={{fontSize: "20px", marginTop: "1em"}}>(Example) Using the standardized Tracking
                    Behaviour</h5>

                <Tabs tabs={[{
                    id: "XrInteractable",
                    label: "XRBaseInteractable Tracking Behaviour (InteractableTrackingBehaviour Example)",
                    content: <CodeBox language="csharp">
                        {"[AddComponentMenu(\"OmiLAXR / 3) Tracking Behaviours / XRBaseInteractable Tracking Behaviour (UnityXR)\"), \n" +
                            "Description(\"A <InteractableTrackingBehaviour> for tracking XR controllers by using <XRBaseInteractable> components.\")]\n" +
                            "public class XRBaseInteractableTrackingBehaviour : InteractableTrackingBehaviour\n" +
                            "{\n" +
                            "    private UnityAction<HoverEnterEventArgs> _hoverEnterAction;\n" +
                            "    private UnityAction<HoverExitEventArgs> _hoverExitAction;\n" +
                            "\n" +
                            "    private void SelectEnter(SelectEnterEventArgs e)\n" +
                            "    {\n" +
                            "        OnGrabbed.Invoke(this, new InteractableEventArgs(e.interactableObject.transform.gameObject));\n" +
                            "    }\n" +
                            "\n" +
                            "    private void SelectExit(SelectExitEventArgs e)\n" +
                            "    {\n" +
                            "        OnInteracted.Invoke(this, new InteractableEventArgs(e.interactableObject.transform.gameObject));\n" +
                            "    }\n" +
                            "\n" +
                            "    protected override void AfterFilteredObjects(Object[] objects)\n" +
                            "    {\n" +
                            "        var interactables = Select<XRBaseInteractable>(objects);\n" +
                            "        foreach (var interactable in interactables)\n" +
                            "        {\n" +
                            "            interactable.hoverEntered.AddListener(_hoverEnterAction = e =>\n" +
                            "            {\n" +
                            "                OnTouched.Invoke(this, new InteractableEventArgs(e.interactableObject.transform.gameObject));\n" +
                            "            });\n" +
                            "            interactable.hoverExited.AddListener(_hoverExitAction = e =>\n" +
                            "            {\n" +
                            "               OnReleased.Invoke(this, new InteractableEventArgs(e.interactableObject.transform.gameObject));\n" +
                            "            });\n" +
                            "            interactable.selectEntered.AddListener(SelectEnter);\n" +
                            "            interactable.selectExited.AddListener(SelectExit);\n" +
                            "        }\n" +
                            "    }\n" +
                            "\n" +
                            "    protected override void Dispose(Object[] objects)\n" +
                            "    {\n" +
                            "        base.Dispose(objects);\n" +
                            "        var interactables = Select<XRBaseInteractable>(objects);\n" +
                            "        foreach (var interactable in interactables)\n" +
                            "        {\n" +
                            "            interactable.hoverEntered.RemoveListener(_hoverEnterAction);\n" +
                            "            interactable.hoverExited.RemoveListener(_hoverExitAction);\n" +
                            "            interactable.selectEntered.RemoveListener(SelectEnter);\n" +
                            "            interactable.selectExited.RemoveListener(SelectExit);\n" +
                            "        }\n" +
                            "    }\n" +
                            "}"}
                    </CodeBox>
                }]}/>

            </div>
        },
        {
            title: "Composers",
            children: <div>

                <fm.Figure caption="Composers Step" label="step-composers" maxWidth="100%"/>

                <P><InlineCodeBox>Composers</InlineCodeBox> are the components responsible for translating the events
                    from <InlineCodeBox>Tracking Behaviours</InlineCodeBox> into data rows — in our case, xAPI
                    statements. To work with xAPI data, you need to
                    extend <InlineCodeBox>xApiComposer&lt;T&gt;</InlineCodeBox>,
                    where <InlineCodeBox>&lt;T&gt;</InlineCodeBox> is a specific <InlineCodeBox>Tracking
                        Behaviour</InlineCodeBox>.</P>

                <P>In our example, the composer listens for the <InlineCodeBox>OnClickedButton</InlineCodeBox> event
                    triggered by <InlineCodeBox>UiTrackingBehaviour</InlineCodeBox>.</P>

                <P>An xAPI statement is composed using the xAPI
                    syntax: <InlineCodeBox>actor.Does(verb).Activity(activity)</InlineCodeBox>.
                    Additional information (such as context, result, and activity extensions) can be added using
                    the <InlineCodeBox>.WithContext(resultExtension)</InlineCodeBox>,
                    <InlineCodeBox>.WithContext(contextExtension)</InlineCodeBox>,
                    and <InlineCodeBox>.WithExtension(activityExtension)</InlineCodeBox> methods.</P>

                <P>The actor is automatically determined based on the actor pipeline that triggered the
                    corresponding <InlineCodeBox>Tracking Behaviour</InlineCodeBox>.</P>

                <P>The xAPI registry can be accessed via the <InlineCodeBox>xapi</InlineCodeBox> field.</P>

                <P>For compatibility, the older syntax is still supported —
                    using <InlineCodeBox>xAPIv1.CreateStatement(statement)</InlineCodeBox> (instead
                    of <InlineCodeBox>actor</InlineCodeBox>)
                    and <InlineCodeBox>xAPI_Definitions</InlineCodeBox> (instead of <InlineCodeBox>xapi</InlineCodeBox>).</P>

                <P>Additionally, we allow the specification of a responsible person to help ensure data quality. This is
                    handled through the required method <InlineCodeBox>GetAuthor()</InlineCodeBox>, which automatically
                    adds author information to the xAPI statement.</P>

                <Tabs tabs={[
                    {
                        id: "Ui",
                        label: "UI Statement Composer (xAPI)",
                        content: <CodeBox language="csharp">
                            {"[AddComponentMenu(\"OmiLAXR / 4) Composers / UI Statement Composer (xAPI)\")]\n" +
                                "[Description(\"Creates statements:\\n- actor clicked uiElement with uiElementType('button'), vrObjectName(String), uiElementValue(text)\" +\n" +
                                "                 \"\\n- actor changed uiElement with uiElementType('slider'), vrObjectName(String), uiElementValue(String), uiElementMinValue(Float), uiElementMaxValue(Float)\" +\n" +
                                "... )]" +
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
                                "        tb.OnChangedSlider.AddHandler((_, slider, newValue) =>\n" +
                                "        {\n" +
                                "            var maxValue = slider.maxValue;\n" +
                                "            var minValue = slider.minValue;\n" +
                                "            var sliderName = slider.GetTrackingName();\n" +
                                "            var stmt = actor.Does(xapi.generic.verbs.changed)\n" +
                                "                .WithExtension(xapi.virtualReality.extensions.activity\n" +
                                "                    .uiElementType(\"slider\")\n" +
                                "                    .vrObjectName(sliderName)\n" +
                                "                    .uiElementValue(newValue)\n" +
                                "                    .uiElementMinValue(minValue)\n" +
                                "                    .uiElementMaxValue(maxValue))\n" +
                                "                .Activity(xapi.virtualReality.activities.uiElement);\n" +
                                "            SendStatement(stmt);\n" +
                                "        });" +
                                "        ...\n" +
                                "    }\n" +
                                "}"}
                        </CodeBox>
                    },
                    {
                        id: "interactable",
                        label: "Interactable Composer (Standardized Example)",
                        content: <CodeBox language="csharp">
                            {"[AddComponentMenu(\"OmiLAXR / 4) Composers / Interactable Composer\"),\n" +
                                "Description(\"Creates statements:\\n- actor interacted/grabbed/touched/released vrObject with vrObjectName(String)\")]\n" +
                                "public class InteractableComposer : xApiComposer<InteractableTrackingBehaviour>\n" +
                                "{\n" +
                                "    public override Author GetAuthor()\n" +
                                "        => new Author(\"Sergej Görzen\", \"goerzen@cs.rwth-aachen.de\");\n" +
                                "\n" +
                                "    protected override void Compose(InteractableTrackingBehaviour tb)\n" +
                                "    {\n" +
                                "        tb.OnInteracted.AddHandler((_, e) =>\n" +
                                "        {\n" +
                                "            var go = e.Target;\n" +
                                "            var stmt = actor.Does(xapi.virtualReality.verbs.interacted)\n" +
                                "                .Activity(xapi.virtualReality.activities.vrObject)\n" +
                                "                .WithExtension(xapi.virtualReality.extensions.activity.vrObjectName(go.GetTrackingName()));\n" +
                                "            SendStatement(stmt);\n" +
                                "        });\n" +
                                "        tb.OnGrabbed.AddHandler((sender, e) =>\n" +
                                "        {\n" +
                                "            var go = e.Target;\n" +
                                "            var stmt = actor.Does(xapi.virtualReality.verbs.grabbed)\n" +
                                "                .Activity(xapi.virtualReality.activities.vrObject)\n" +
                                "                .WithExtension(xapi.virtualReality.extensions.activity.vrObjectName(go.GetTrackingName()));\n" +
                                "            SendStatement(stmt);\n" +
                                "        });\n" +
                                "        tb.OnTouched.AddHandler((sender, e) =>\n" +
                                "        {\n" +
                                "            var go = e.Target;\n" +
                                "            var stmt = actor.Does(xapi.virtualReality.verbs.touched)\n" +
                                "                .Activity(xapi.virtualReality.activities.vrObject)\n" +
                                "                .WithExtension(xapi.virtualReality.extensions.activity.vrObjectName(go.GetTrackingName()));\n" +
                                "            SendStatement(stmt);\n" +
                                "        });\n" +
                                "        tb.OnReleased.AddHandler((sender, e) =>\n" +
                                "        {\n" +
                                "            var go = e.Target;\n" +
                                "            var stmt = actor.Does(xapi.virtualReality.verbs.released)\n" +
                                "                .Activity(xapi.virtualReality.activities.vrObject)\n" +
                                "                .WithExtension(xapi.virtualReality.extensions.activity.vrObjectName(go.GetTrackingName()));\n" +
                                "            SendStatement(stmt);\n" +
                                "        });\n" +
                                "    }\n" +
                                "}"}
                        </CodeBox>
                    }
                ]}/>

                <P>If another data standard is preferred instead of xAPI, then a new data composer class needs to be
                    implemented, analogous to <InlineCodeBox>XApiComposer</InlineCodeBox>.</P>

                <h5 style={{fontSize: "20px"}}>(Optional) Higher or Semantic Composers</h5>

                <P>Our pipeline allows the creation of higher-level <InlineCodeBox>Composers</InlineCodeBox> just before
                    the data is passed to hooks. These composers are useful, for example, when you want to generate
                    additional statements based on previously composed ones. They are triggered whenever a defined set
                    of conditions is met.</P>

                <P>In our example, a new statement is created when a mouse click occurs once and a move event occurs
                    five times. To evaluate the statements, several <InlineCodeBox>Match</InlineCodeBox> functions are
                    available.</P>

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

                <P><InlineCodeBox>Hooks</InlineCodeBox> are a mechanism that allows you to manipulate existing
                    statements composed by all <InlineCodeBox>Composers</InlineCodeBox>.</P>

                <P>One common use case for Hooks is to extend all statements with additional context information.</P>

                <P>Hooks can also be used to modify specific statements. For example, whenever a statement with the verb
                    "clicked" is detected, the verb can be changed to "interacted".</P>

                <Tabs tabs={[
                    {
                        id: "scenario",
                        label: "Scenario Context Hook",
                        content: <CodeBox language="csharp">
                            {"[AddComponentMenu(\"OmiLAXR / 5) Hooks / Scenario Context Hook (xAPI)\")]\n" +
                                "[Description(\"Adds language by <ScenarioLanguage>, platform by <PlatformInformation>, fps by <FpsMonitor>, registration by <Registration> and active scene, game and game version to the context of all statements.\")]\n" +
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
                    },
                    {
                        id: "ppmHook",
                        label: "PPM Hook",
                        content: <CodeBox language="csharp">
                            {"[AddComponentMenu(\"OmiLAXR / 5) Hooks / Peripheral Physiological Measures (PPM) Hook (xAPI)\")]\n" +
                                "[Description(\"Adds peripheral physiological measures values to each statement.\")]\n" +
                                "public class PpmHook : xApiHook\n" +
                                "{\n" +
                                "    protected override xApiStatement AfterCompose(xApiStatement statement)\n" +
                                "    {\n" +
                                "        var heartRateProvider = GetProvider<HeartRateProvider>(statement);\n" +
                                "        \n" +
                                "        if (heartRateProvider && heartRateProvider.enabled)\n" +
                                "        {\n" +
                                "            statement.WithResult(xapi.ppm.extensions.result.heartRate(heartRateProvider.GetHeartRate()));\n" +
                                "        }\n" +
                                "\n" +
                                "        return statement;\n" +
                                "    }\n" +
                                "}"}
                        </CodeBox>
                    },
                    {
                        id: "manipualtion",
                        label: "Manipulation Hook Example",
                        content: <CodeBox language="csharp">
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
                    }
                ]}/>

            </div>
        },
        {
            title: "Endpoints",
            children: <div>

                <fm.Figure caption="Endpoints Step" label="step-endpoints" maxWidth="100%"/>

                <P><InlineCodeBox>Endpoints</InlineCodeBox> are responsible for translating data into the required
                    format (e.g., JSON) and delivering it to the desired endpoint. This endpoint could be, for example,
                    a simple MongoDB instance, a REST API, or a Learning Record Store.
                    Since we are using xAPI in our example, the xAPI statement is transformed into a TinCan-compliant
                    object (using <a href="https://github.com/RusticiSoftware/TinCan.NET">TinCan.NET</a>) and then sent
                    to a Learning Record Store. The TinCan.NET library is included with
                    the <Package>OmiLAXR.xAPI</Package> module.</P>

                <P>As long as you don’t need a custom endpoint type, you can reuse the existing components.</P>

                <Tabs tabs={[
                    {
                        id: "lrs",
                        label: "LRS Endpoint Example",
                        content: <CodeBox language="csharp">
                            {"[AddComponentMenu(\"OmiLAXR / 6) Endpoints / Learning Record Store (LRS for xAPI)\")]\n" +
                                "[Description(\"Sends all received statements a Learning Record Store asynchronously.\")]\n" +
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
                    },
                    {
                        id: "local",
                        label: "Local Endpoint Example",
                        content: <CodeBox language="csharp">
                            {"[AddComponentMenu(\"OmiLAXR / 6) Endpoints / Local Endpoint\")]\n" +
                                "[Description(\"Stores statements on local path.\")]\n" +
                                "public class LocalEndpoint : Endpoint\n" +
                                "{\n" +
                                "    ...\n" +
                                "    protected override TransferCode HandleSending(IStatement statement)\n" +
                                "    {\n" +
                                "        try\n" +
                                "        {\n" +
                                "            _streamWriter.WriteLine(statement.ToDataStandardString());\n" +
                                "        }\n" +
                                "        catch (IOException ex)\n" +
                                "        {\n" +
                                "            Debug.LogException(ex);\n" +
                                "            return TransferCode.Error;\n" +
                                "        }\n" +
                                "        return TransferCode.Success;\n" +
                                "    }\n" +
                                "}"}
                        </CodeBox>
                    },
                    {
                        id: "log",
                        label: "Statement Printer Example",
                        content: <CodeBox language="csharp">
                            {"[AddComponentMenu(\"OmiLAXR / 6) Endpoints / Statement Printer\")]\n" +
                                "[Description(\"Prints all received statements to Unity Editor console. May be used for testing purposes.\")]\n" +
                                "public class StatementPrinter : Endpoint\n" +
                                "{\n" +
                                "    protected override TransferCode HandleSending(IStatement statement)\n" +
                                "    {\n" +
                                "        DebugLog.OmiLAXR.Print(\"Sent statement: \" + statement);\n" +
                                "        return TransferCode.Success;\n" +
                                "    }\n" +
                                "}"}
                        </CodeBox>
                    }
                ]}/>

            </div>
        }
    ];

    return (
        <ThemeProvider>
            <div className="pipeline-page h-full w-full place-items-center px-4 py-20 sm:px-6 lg:px-8">
                <div className="pipeline-page-content mx-auto w-full items-center relative">
                    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">
                        OmiLAXR Pipeline
                    </h1>

                    <p style={{color: 'red'}} className="mb-6 text-lg font-normal lg:text-xl">
                        Looking for the setup guide? Click <a href="/get-started" className="underline">here</a>.
                    </p>

                    <p className="mb-6 mt-6 text-lg font-normal lg:text-xl">
                        The OmiLAXR Pipeline enables you to create modular tracking mechanisms structured as a pipeline.
                    </p>

                    {/* <OmiLAXRPipeline/> */}
                    <img
                        src="./OmiLAXR_Pipeline.drawio.svg"
                        style={{background: "white"}}
                        alt="OmiLAXR Pipeline"
                        className="pipeline-hero-image"
                    />

                    <p className="mb-6 mt-6 text-lg font-normal lg:text-xl">
                        The pipeline is guided by four key questions:
                    </p>

                    <ol style={{listStyle: "decimal", paddingLeft: "20px"}}
                        className="mb-6 mt-6 text-lg font-normal lg:text-xl">
                        <li><strong>What</strong> targets should be tracked? (Listeners and Filters)</li>
                        <li><strong>When</strong> should tracking be triggered? (Tracking Behaviours)</li>
                        <li><strong>How</strong> should data be encoded? (Composers and Hooks)</li>
                        <li><strong>Where</strong> should the data be stored? (Endpoints)</li>
                    </ol>

                    <p className="mb-6 mt-6 text-lg font-normal lg:text-xl">
                        Below, you’ll find detailed information about the pipeline components. Each code segment uses
                        attributes that help structure and document it — we recommend using them.
                    </p>

                    <ol style={{listStyle: "decimal", paddingLeft: "20px"}} className="mb-6 mt-6">
                        <li><InlineCodeBox>[AddComponentMenu("Path / In / Inspector")]</InlineCodeBox>: Organizes
                            components
                            in the Unity Inspector according to a specified path.
                        </li>
                        <li><InlineCodeBox>[Description("Description of a component.")]</InlineCodeBox>: Adds a textual
                            description to the component in the Unity Inspector.
                        </li>
                        <li><InlineCodeBox>[ReadOnly]</InlineCodeBox>: Makes a field read-only in the Unity Inspector.
                        </li>
                        <li>
                            <InlineCodeBox>[Gesture("Name of Gesture")]</InlineCodeBox> and <InlineCodeBox>[Action("Name
                            of Gesture")]</InlineCodeBox>:
                            Metadata used by other modules (e.g., <InlineCodeBox>OmiLAXR.ReCoPa (WIP)</InlineCodeBox>)
                            to enable or disable events.
                        </li>
                    </ol>

                    {contentOf(items)}
                </div>
            </div>
        </ThemeProvider>
    );
};
