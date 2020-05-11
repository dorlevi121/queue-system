import React, { useState } from 'react';
import chartStyle from './chart-home.module.scss';
import { Line } from 'react-chartjs-2';

const ChartHome = () => {

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: { // lines on the chart
            yAxes: [{
                gridLines: {
                    color: "rgba(255, 255, 255, .1)",
                    zeroLineColor: 'transparent'
                },
                ticks: {
                    fontColor: "#fafafa",
                    stepSize: 10,
                    beginAtZero: true
                }
            }],
            xAxes: [{
                gridLines: {
                    display: false,
                    zeroLineColor: 'transparent'
                },
                ticks: {
                    fontColor: "#fafafa",
                    //fontSize: 14,
                    //stepSize: 1,
                    //beginAtZero: true
                }
            }]
        },
        legend: { // title of data
            display: false
        },
        tooltips: { // text on hover point
            mode: 'index',
            intersect: false,
            custom: function (tooltip: any) {
                if (!tooltip) return;
                // disable displaying the color box;
                tooltip.displayColors = false;
            }
        },
        hover: { // Show box text on hover all chart
            mode: 'index',
            intersect: false
        }
    };

    const data = (canvas: any) => {
        const ctx = canvas.getContext("2d")
        var gradient = ctx.createLinearGradient(0, -50, 0, 100);
        gradient.addColorStop(0, "#7467ef");
        gradient.addColorStop(1, "rgba(255,255,255,0.1)");
        return {
            labels: ['ינואר', 'פבואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'],
            datasets: [
                {
                    label: 'מספר לקוחות',
                    data: [50, 10, 50, 20, 10, 20, 50, 20, 50, 10, 50, 20],
                    backgroundColor: gradient,
                    borderColor: "#fafafa",
                    borderWidth: 1.5,
                    hoverBorderColor: "#ff9e43",
                    scaleStepWidth: 1,
                }
            ]
        }
    }

    return (
        <div className={chartStyle.Chart}>
            <Line
                options={options}
                data={data}
                height={300}
            />
        </div>
    )
}

export default ChartHome;