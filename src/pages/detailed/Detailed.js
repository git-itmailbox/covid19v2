import React, { useEffect, useState } from 'react'
import covidApi from '../../api/covidApi'
import Chart from './Chart'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

function Detailed() {
  const [countries, setCountries] = useState([])
  const [countryCode, setCountryCode] = useState('ukraine')
  const [countryData, setCountryData] = useState(null)

  useEffect(() => {
    covidApi.get('/countries').then((res) => setCountries(res.data))
  }, [])

  useEffect(() => {
    covidApi
      .get('/total/country/' + countryCode)
      .then((res) => setCountryData(prepareData(res.data)))
  }, [countryCode])

  function handleChange(e) {
    setCountryCode(e.target.value)
  }

  return (
    <div>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={countryCode}
        onChange={handleChange}
      >
        {countries.map((country) => (
          <MenuItem value={country.Slug} key={country.Slug}>
            {country.Country}
          </MenuItem>
        ))}
      </Select>
      {countryData ? <Chart data={countryData} /> : null}
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
