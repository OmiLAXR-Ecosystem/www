import React, { useState } from "react";
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

export default function Tabs<T>({ tabs, defaultActiveTab }: TabsProps<T>) {
    const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0]?.id);

    return (
        <div style={{width: "100%", maxWidth: "1100px", margin: "0 auto"}}>
            <div className="tabs">
                {tabs.map((tab) => (
                    <button
                        key={tab.id.toString()}
                        className={`tab ${activeTab === tab.id ? "active" : ""}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="tab-contents">
                {tabs.map((tab) => (
                    <div
                        key={tab.id.toString()}
                        className="tab-content"
                        style={{ display: activeTab === tab.id ? "block" : "none" }}
                    >
                        {tab.content}
                    </div>
                ))}
            </div>
        </div>
    );
}
