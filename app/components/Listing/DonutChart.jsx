import React from "react";
import "./DonutChart.css";

export const DonutChart = props => {
    const percent = Math.round((props.votes / props.goal) * 100);

    return (
        <div className="root">
            <svg viewBox="0 0 32 32" className="chart">
                <circle
                    className="donut-hole"
                    r="16"
                    cx="16"
                    cy="16"
                    fill="none"
                />
                <circle
                    className="donut-ring"
                    r="16"
                    cx="16"
                    cy="16"
                    fill="none"
                    stroke="lightgray"
                    strokeWidth="8"
                />
                <circle
                    className="donut-segment"
                    r="16"
                    cx="16"
                    cy="16"
                    fill="none"
                    stroke="green"
                    strokeWidth="8"
                    style={{strokeDasharray: `${percent} 100`}}
                    strokeDashoffset="0"
                />
            </svg>
            <div className="inside">
                <div className="percent">{percent + "%"}</div>
            </div>
        </div>
    );
};
