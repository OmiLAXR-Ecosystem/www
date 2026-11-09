import React from "react";
import "./Tabs.scss";

export interface Tab<T> {
    id: T,
    label: string,
    content: string | React.ReactNode | React.ReactElement<any> | JSX.Element;
}

export interface TabsProps<T> {
    tabs: Tab<T>[];
    defaultActiveTab?: T;
}

// Rendered as static HTML; switching tabs is done by src/scripts/interactions.ts (data-tabs).
export default function Tabs<T>({ tabs, defaultActiveTab }: TabsProps<T>) {
    const activeTab = defaultActiveTab ?? tabs[0]?.id;

    return (
        <div data-tabs style={{width: "100%", maxWidth: "var(--tabs-max-width, 1100px)", margin: "0 auto"}}>
            <div className="tabs" role="tablist">
                {tabs.map((tab, index) => (
                    <button
                        key={tab.id.toString()}
                        type="button"
                        role="tab"
                        data-tab={index}
                        aria-selected={activeTab === tab.id}
                        className={`tab ${activeTab === tab.id ? "active" : ""}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="tab-contents">
                {tabs.map((tab, index) => (
                    <div
                        key={tab.id.toString()}
                        role="tabpanel"
                        data-tab-panel={index}
                        className="tab-content"
                        hidden={activeTab !== tab.id}
                    >
                        {tab.content}
                    </div>
                ))}
            </div>
        </div>
    );
}
