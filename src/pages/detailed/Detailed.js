import React, { useEffect, useState } from 'react'
import covidApi from '../../api/covidApi'
import Chart from './Chart'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { CHART_TYPE_BAR, CHART_TYPE_LINE, ALL_TYPES } from './chartTypes'

function Detailed() {
  const [countries, setCountries] = useState([])
  const [countryCode, setCountryCode] = useState('ukraine')
  const [countryData, setCountryData] = useState(null)
  const [chartType, setChartType] = useState(CHART_TYPE_LINE)

  useEffect(() => {
    covidApi.get('/countries').then((res) => setCountries(res.data))
  }, [])

  useEffect(() => {
    covidApi
      .get('/total/country/' + countryCode)
      .then((res) => setCountryData(prepareData(res.data)))
  }, [countryCode])

  function handleChangeCountry(e) {
    setCountryCode(e.target.value)
  }

  function handleChangeTypeChart(e) {
    setChartType(e.target.value)
  }

  return (
    <div>
      <Select
        labelId="country-select-label"
        id="country-select"
        value={countryCode}
        onChange={handleChangeCountry}
      >
        {countries.map((country) => (
          <MenuItem value={country.Slug} key={country.Slug}>
            {country.Country}
          </MenuItem>
        ))}
      </Select>
      <Select
        labelId="chart-type-select-label"
        id="chart-type-select"
        value={chartType}
        autoWidth
        onChange={handleChangeTypeChart}
      >
        {ALL_TYPES.map((type) => (
          <MenuItem value={type} key={type}>
            {type}
          </MenuItem>
        ))}
      </Select>
      {countryData ? <Chart data={countryData} type={chartType} /> : null}
    </div>
  )
}

export default Detailed

function prepareData(data) {
  const chartData = {
    labels: [],
    active: [],
    deaths: [],
    recovered: [],
  }

  data.forEach((element) => {
    chartData.labels.push(element.Date.replace(/T.*/, ''))
    chartData.active.push(element.Active)
    chartData.deaths.push(element.Deaths)
    chartData.recovered.push(element.Recovered)
  })

  return chartData
}
