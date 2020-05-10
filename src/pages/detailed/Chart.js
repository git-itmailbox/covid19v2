import React from 'react'
import { Line, Bar, HorizontalBar, Polar } from 'react-chartjs-2'
import {
  CHART_TYPE_LINE,
  CHART_TYPE_BAR,
  CHART_TYPE_POLAR,
  CHART_TYPE_HORIZONTAL_BAR,
} from './chartTypes'

function Chart({ data: { labels, active, deaths, recovered }, type }) {
  const data = {
    labels,
    datasets: [
      {
        label: 'Active',
        backgroundColor: 'rgba(0,0,255,0.2)',
        borderColor: 'rgba(0,0,255,0.1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(0,0,255,0.4)',
        hoverBorderColor: 'rgba(0,0,255,1)',
        data: active,
      },
      {
        label: 'Deaths',
        backgroundColor: 'rgba(255,0,0,0.2)',
        borderColor: 'rgba(255,0,0,0.1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,0,0,0.4)',
        hoverBorderColor: 'rgba(255,0,0,1)',
        data: deaths,
      },
      {
        label: 'Recovered',
        backgroundColor: 'rgba(0,255,0,0.2)',
        borderColor: 'rgba(0,255,0,0.1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(0,255,0,0.4)',
        hoverBorderColor: 'rgba(0,255,0,1)',
        data: recovered,
      },
    ],
  }

  function getChartByType(type) {
    switch (type) {
      case CHART_TYPE_BAR:
        return <Bar data={data} />
      case CHART_TYPE_HORIZONTAL_BAR:
        return <HorizontalBar data={data} />
      case CHART_TYPE_POLAR:
        return <Polar data={data} />
      case CHART_TYPE_LINE:
      default:
        return <Line data={data} />
    }
  }

  return (
    <div>
      <h2>Line Example</h2>
      {getChartByType(type)}
    </div>
  )
}

export default Chart
