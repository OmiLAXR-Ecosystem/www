import ThemeProvider from "../theme-provider";
import React from "react";
import GetStartedCard, {contentOf, type GetStartedCardProps} from "./getStartedCard";
import CodeBox, {InlineCodeBox} from "../CodeBox";
import {FigureManager} from "react-figure-ref";
import Hyperlink from "../Hyperlink";
import {OmiLAXRPipeline} from "../Pipeline";

const scopes = [
    "com.rwth.unity.omilaxr.xapi4unity",
    "com.rwth.unity.omilaxr",
    "com.rwth.unity.omilaxr.xapi",
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
            {label: "components", imageSrc: "/pipeline/OmiLAXR_Pipeline_Blackbox.drawio.svg"},
            {label: "hierarchy", imageSrc: "/pipeline/hierarchy.png"},
            {label: "learner_pipeline", imageSrc: "/pipeline/learner_pipeline.png"},
            {label: "step-listeners", imageSrc: "/pipeline/Listeners.png"},
            {label: "step-filters", imageSrc: "/pipeline/Filters.png"},
            {label: "step-tb", imageSrc: "/pipeline/TrackingBehaviours.png"},
            {label: "step-composers", imageSrc: "/pipeline/Composers.png"},
            {label: "step-hooks", imageSrc: "/pipeline/Hooks.png"},
            {label: "step-endpoints", imageSrc: "/pipeline/Endpoints.png"},
        ]
    });

    const items: GetStartedCardProps[] = [
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
                    learner interactions, while the <InlineCodeBox>System Pipeline</InlineCodeBox> functions in a similar
                    manner for system-related interactions. This makes it possible to extend existing pipelines by new
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

                <P>In the following example code the Listener is looking for explicit GameObjects having the component <InlineCodeBox>ExampleComponent</InlineCodeBox>.
                These objects are passed to the mandatory function <InlineCodeBox>Found(objects: Object[])</InlineCodeBox>.
                    Attention: as the parameter of <InlineCodeBox>Found(objects: Object[])</InlineCodeBox> is an array of
                    type <InlineCodeBox>Object</InlineCodeBox> it is also allowed to pass components instead of game objects.</P>


                <CodeBox language="csharp">
                    {"[AddComponentMenu(\"OmiLAXR / 1) Listeners / Example Listener (YOUR_MODULE_NAME)\")]\n" +
                        "public sealed class ExampleListener : Listener\n" +
                        "    {\n" +
                        "        public override void StartListening()\n" +
                        "        {\n" +
                        "            var exampleComponents = FindObjectsOfType<ExampleComponent>();\n" +
                        "            Found(exampleComponents);\n" +
                        "        }\n" +
                        "    }"}
                </CodeBox>

            </div>
        },
        {
            title: "Filters",
            children: <div>

                <fm.Figure caption="Filters Step" label="step-filters" maxWidth="100%"/>

            </div>
        },
        {
            title: "Tracking Behaviours",
            children: <div>

                <fm.Figure caption="Tracking Behaviours Step" label="step-tb" maxWidth="100%"/>

            </div>
        },
        {
            title: "Composers",
            children: <div>

                <fm.Figure caption="Composers Step" label="step-composers" maxWidth="100%"/>


            </div>
        },
        {
            title: "Hooks",
            children: <div>

                <fm.Figure caption="Hooks Step" label="step-hooks" maxWidth="100%"/>


            </div>
        },
        {
            title: "Endpoints",
            children: <div>

                <fm.Figure caption="Endpoints Step" label="step-endpoints" maxWidth="100%"/>


            </div>
        }
    ];

    return (
        <ThemeProvider>
            <div className="h-full w-screen place-items-center bg-white py-20">
                <div className="container mx-auto items-center relative">
                    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">OmiLAXR
                        Pipeline</h1>
                    <p style={{color: 'red'}}
                       className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                        Looking for setup? Click <a href="/get-started" className="underline">here</a>.
                    </p>

                    <p className="mb-6 mt-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                        The OmiLAXR Pipeline gives you the possibility to create modular tracking mechanisms in form of
                        a pipeline.
                    </p>

                    <OmiLAXRPipeline/>


                    <p className="mb-6 mt-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                        In the following you will get detailed information about the pipelines components.
                    </p>

                    {contentOf(items)}
                </div>
            </div>
        </ThemeProvider>
    );
}

export default GetStartedPresentation;