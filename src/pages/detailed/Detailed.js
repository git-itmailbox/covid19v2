import React, { useEffect, useState } from 'react'
import covidApi from '../../api/covidApi'
import Chart from './Chart'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Grid from '@material-ui/core/Grid'
import { CHART_TYPE_LINE, ALL_TYPES } from './chartTypes'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

function Detailed() {
  const classes = useStyles()
  const [countries, setCountries] = useState([])
  const [countryCode, setCountryCode] = useState('ukraine')
  const [countryData, setCountryData] = useState(null)
  const [chartType, setChartType] = useState(CHART_TYPE_LINE)

  useEffect(() => {
    covidApi
      .get('/countries')
      .then((res) => res.data.sort(sortByCountry))
      .then((data) => setCountries(data))
  }, [])

  useEffect(() => {
    covidApi
      .get('/total/country/' + countryCode)
      .then((res) => setCountryData(prepareData(res.data)))
  }, [countryCode])

  function sortByCountry(countryA, countryB) {
    return countryA.Country > countryB.Country
      ? 1
      : countryB.Country > countryA.Country
      ? -1
      : 0
  }

  function handleChangeCountry(e) {
    setCountryCode(e.target.value)
  }

  function handleChangeTypeChart(e) {
    setChartType(e.target.value)
  }

  return (
    <div>
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id="country-select-label">Country</InputLabel>
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
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id="country-select-label">Chart type</InputLabel>
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
          </FormControl>
        </Grid>
      </Grid>
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
