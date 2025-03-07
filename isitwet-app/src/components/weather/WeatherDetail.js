import React, { Component } from 'react';
import { Button, Container, Table, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

import iconMapping from './icons/IconMapping'
import LocationDetail from './LocationDetail'
import ToggleButton from '../utils/ToggleButton';
import DetailedWeatherChart from './DetailedWeatherChart';

import './css/WeatherDetail.css'
import '../css/Home.css'

class WeatherDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            weatherItem: [],
            locationItem: [],
            detailedWeather: false,
            isLoading: true,
            hoveredColumn: -1
        };
        this.switchWeatherView = this.switchWeatherView.bind(this);
        this.changeHoveredColumn = this.changeHoveredColumn.bind(this);
    }

    async componentDidMount() {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const weatherDetail = await (
            await fetch(`/api/v1/weather/${this.props.match.params.id}?timezone=${timezone}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        ).json();
        const location = await (await fetch(`/api/v1/locations/${this.props.match.params.id}`)).json();
        this.setState({
            weatherItem: weatherDetail,
            locationItem: location,
            isLoading: false
        });
    }

    switchWeatherView() {
        this.setState({detailedWeather: !this.state.detailedWeather});
    }

    changeHoveredColumn(columnIndex) {
        this.setState({hoveredColumn: columnIndex});
    }
    
    render() {
        const {weatherItem, locationItem, detailedWeather, isLoading, hoveredColumn} = this.state;
        const rainEmoji = String.fromCodePoint(0x1F4A7);
        const snowEmoji = String.fromCodePoint(0x2744);
        const sunEmoji = String.fromCodePoint(0x2600);
    
        if (isLoading) {
            return <p>Loading...</p>;
        }

        let displaySnow = weatherItem.daily.minTemperatures.some((temp) => {return temp < 2.0})
                            || weatherItem.daily.snow.some((s) => {return s > 0.0;});
        let displayRain = weatherItem.daily.maxTemperatures.some((temp) => {return temp > -2.0})
                            || weatherItem.daily.rainSum.some((r) => {return r > 0.0;});

        const weatherCodesRow = (detailedIndex) => {
            return weatherItem.daily.weatherCodes.map((code, index) => {
                if (index === detailedIndex) {
                    return <>
                        <td
                            onMouseEnter={() => this.changeHoveredColumn(index)}
                            onMouseLeave={() => this.changeHoveredColumn(-1)}
                            className={index===2 ? "table-primary" : ""}
                        >
                            {iconMapping[weatherItem.quarterly.weatherCodes[index*4]]}
                        </td>
                        <td
                            onMouseEnter={() => this.changeHoveredColumn(index)}
                            onMouseLeave={() => this.changeHoveredColumn(-1)}
                            className={index===2 ? "table-primary" : ""}
                        >
                            {iconMapping[weatherItem.quarterly.weatherCodes[index*4+1]]}
                        </td>
                        <td
                            onMouseEnter={() => this.changeHoveredColumn(index)}
                            onMouseLeave={() => this.changeHoveredColumn(-1)}
                            className={index===2 ? "table-primary" : ""}
                        >
                            {iconMapping[weatherItem.quarterly.weatherCodes[index*4+2]]}
                        </td>
                        <td
                            onMouseEnter={() => this.changeHoveredColumn(index)}
                            onMouseLeave={() => this.changeHoveredColumn(-1)}
                            className={index===2 ? "table-primary" : ""}
                        >
                            {iconMapping[weatherItem.quarterly.weatherCodes[index*4+3]]}
                        </td>
                    </>
                }
                return <td
                    onMouseEnter={() => this.changeHoveredColumn(index)}
                    onMouseLeave={() => this.changeHoveredColumn(-1)}
                    className={index===2 ? "table-primary" : ""}
                >
                    {iconMapping[code]}
                </td>
            });
        }
        const maxTemperaturesRow = (detailedIndex) => {
            return weatherItem.daily.maxTemperatures.map((temp, index) => {
                if (index === detailedIndex) {
                    return <>
                        <td
                            onMouseEnter={() => this.changeHoveredColumn(index)}
                            onMouseLeave={() => this.changeHoveredColumn(-1)}
                            className={index===2 ? "table-primary" : ""}
                        >
                            {weatherItem.quarterly.maxTemperatures[index*4]} °C
                        </td>
                        <td
                            onMouseEnter={() => this.changeHoveredColumn(index)}
                            onMouseLeave={() => this.changeHoveredColumn(-1)}
                            className={index===2 ? "table-primary" : ""}
                        >
                            {weatherItem.quarterly.maxTemperatures[index*4+1]} °C
                        </td>
                        <td
                            onMouseEnter={() => this.changeHoveredColumn(index)}
                            onMouseLeave={() => this.changeHoveredColumn(-1)}
                            className={index===2 ? "table-primary" : ""}
                        >
                            {weatherItem.quarterly.maxTemperatures[index*4+2]} °C
                        </td>
                        <td
                            onMouseEnter={() => this.changeHoveredColumn(index)}
                            onMouseLeave={() => this.changeHoveredColumn(-1)}
                            className={index===2 ? "table-primary" : ""}
                        >
                            {weatherItem.quarterly.maxTemperatures[index*4+3]} °C
                        </td>
                    </>
                }
                return <td
                    onMouseEnter={() => this.changeHoveredColumn(index)}
                    onMouseLeave={() => this.changeHoveredColumn(-1)}
                    className={index===2 ? "table-primary" : ""}
                >
                    {temp} °C
                </td>
            });
        }
        const minTemperaturesRow = (detailedIndex) => {
            return weatherItem.daily.minTemperatures.map((temp, index) => {
                if (index === detailedIndex) {
                    return <>
                        <td
                            onMouseEnter={() => this.changeHoveredColumn(index)}
                            onMouseLeave={() => this.changeHoveredColumn(-1)}
                            className={index===2 ? "table-primary" : ""}
                        >
                            {weatherItem.quarterly.minTemperatures[index*4]} °C
                        </td>
                        <td
                            onMouseEnter={() => this.changeHoveredColumn(index)}
                            onMouseLeave={() => this.changeHoveredColumn(-1)}
                            className={index===2 ? "table-primary" : ""}
                        >
                            {weatherItem.quarterly.minTemperatures[index*4+1]} °C
                        </td>
                        <td
                            onMouseEnter={() => this.changeHoveredColumn(index)}
                            onMouseLeave={() => this.changeHoveredColumn(-1)}
                            className={index===2 ? "table-primary" : ""}
                        >
                            {weatherItem.quarterly.minTemperatures[index*4+2]} °C
                        </td>
                        <td
                            onMouseEnter={() => this.changeHoveredColumn(index)}
                            onMouseLeave={() => this.changeHoveredColumn(-1)}
                            className={index===2 ? "table-primary" : ""}
                        >
                            {weatherItem.quarterly.minTemperatures[index*4+3]} °C
                        </td>
                    </>
                }
                return <td
                    onMouseEnter={() => this.changeHoveredColumn(index)}
                    onMouseLeave={() => this.changeHoveredColumn(-1)}
                    className={index===2 ? "table-primary" : ""}
                >
                    {temp} °C
                </td>
            });
        }
        const sunshineDurationRow = (detailedIndex) => {
            return weatherItem.daily.sunshineDuration.map((sun, index) => {
                if (index === detailedIndex) {
                    return <td
                        onMouseEnter={() => this.changeHoveredColumn(index)}
                        onMouseLeave={() => this.changeHoveredColumn(-1)}
                        className={index===2 ? "table-primary" : ""}
                        colspan="4"
                    >
                        {sunEmoji} {sun.toFixed()} hrs
                    </td>
                }
                return <td
                    onMouseEnter={() => this.changeHoveredColumn(index)}
                    onMouseLeave={() => this.changeHoveredColumn(-1)}
                    className={index===2 ? "table-primary" : ""}
                >
                    {sunEmoji} {sun.toFixed()} hrs
                </td>
            });
        }
        const computePrecipitationDisplay = (rain, snow) => {
            let precipitationDisplay = "";
            if (displayRain) {
                precipitationDisplay = rainEmoji + " ";
                rain < 0.001 ? precipitationDisplay += "-": precipitationDisplay += rain.toFixed(1) + " mm";
                if (displaySnow) {
                    precipitationDisplay += " / ";
                }
            }
            if (displaySnow) {
                precipitationDisplay += snowEmoji + " ";
                snow < 0.001 ?
                    precipitationDisplay += "-" :
                    precipitationDisplay += snow.toFixed(1) + " cm";
            }
            return precipitationDisplay;
        }
        const rainSumRow = (detailedIndex) => {
            return weatherItem.daily.rainSum.map((rain, index) => {
                if (index === detailedIndex) {
                    let precipitationDisplay06 = computePrecipitationDisplay(
                        weatherItem.quarterly.rainSum[index*4],
                        weatherItem.quarterly.snow[index*4]
                    );
                    let precipitationDisplay612 = computePrecipitationDisplay(
                        weatherItem.quarterly.rainSum[index*4+1],
                        weatherItem.quarterly.snow[index*4+1]
                    );
                    let precipitationDisplay1218 = computePrecipitationDisplay(
                        weatherItem.quarterly.rainSum[index*4+2],
                        weatherItem.quarterly.snow[index*4+2]
                    );
                    let precipitationDisplay1824 = computePrecipitationDisplay(
                        weatherItem.quarterly.rainSum[index*4+3],
                        weatherItem.quarterly.snow[index*4+3]
                    );
                    return <>
                        <td
                            onMouseEnter={() => this.changeHoveredColumn(index)}
                            onMouseLeave={() => this.changeHoveredColumn(-1)}
                            className={index===2 ? "table-primary" : ""}
                        >
                            {precipitationDisplay06}
                        </td>
                        <td
                            onMouseEnter={() => this.changeHoveredColumn(index)}
                            onMouseLeave={() => this.changeHoveredColumn(-1)}
                            className={index===2 ? "table-primary" : ""}
                        >
                            {precipitationDisplay612}
                        </td>
                        <td
                            onMouseEnter={() => this.changeHoveredColumn(index)}
                            onMouseLeave={() => this.changeHoveredColumn(-1)}
                            className={index===2 ? "table-primary" : ""}
                        >
                            {precipitationDisplay1218}
                        </td>
                        <td
                            onMouseEnter={() => this.changeHoveredColumn(index)}
                            onMouseLeave={() => this.changeHoveredColumn(-1)}
                            className={index===2 ? "table-primary" : ""}
                        >
                            {precipitationDisplay1824}
                        </td>
                    </>
                }
                let precipitationDisplay = computePrecipitationDisplay(
                    rain,
                    weatherItem.daily.snow[index]
                );
                return <td
                    onMouseEnter={() => this.changeHoveredColumn(index)}
                    onMouseLeave={() => this.changeHoveredColumn(-1)}
                    className={index===2 ? "table-primary" : ""}
                >
                    {precipitationDisplay}
                </td>
            });
        }
        const datesRow = (detailedIndex) => {
            return weatherItem.daily.dates.map((date, index) => {
                if (index === detailedIndex) {
                    if (index === 2) {
                        return <th className="table-primary" width="25%" colspan="4">Today<br></br>{date}</th>
                    }
                    return <th width="25%" colspan="4">{date}</th>
                }
                if (index === 2) {
                    return <th className="table-primary" width="25%">Today<br></br>{date}</th>
                }
                return <th width="25%">{date}</th>
            });
        }
        const dayDetailRow = (detailedIndex) => {
            if (detailedIndex === -1) {
                return <></>
            }
            let before = <></>;
            let after = <></>;
            if (detailedIndex === 0) {
                after = <>
                    <th></th>
                    <th></th>
                    <th></th>
                </>
            } else if (detailedIndex === 1) {
                before = <th></th>
                after = <>
                    <th></th>
                    <th></th>
                </>
            } else if (detailedIndex === 2) {
                after = <th></th>
                before = <>
                    <th></th>
                    <th></th>
                </>
            } else if (detailedIndex === 3) {
                before = <>
                    <th></th>
                    <th></th>
                    <th></th>
                </>
            }
            return <tr key="dayDetail" className>
                {before}
                <th>0-6h</th>
                <th>6h-12h</th>
                <th>12h-18h</th>
                <th>18h-24h</th>
                {after}
            </tr>
        }

        return (
            <div>
                <Container className="css-padding">
                    <Row>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h3>{locationItem.name}</h3>
                            <Button className="mb-0" color="success" tag={Link} to="/locations">Back</Button>
                        </div>
                    </Row>
                    <Row>
                        <Col md={3} sm={12} className="component-col">
                            <LocationDetail
                                locationItem={locationItem}
                                weatherItem={weatherItem}
                            />
                        </Col>
                        <Col md={9} sm={12} className="component-col">
                            Show detailed weather
                            <ToggleButton
                                isOn={detailedWeather}
                                handleToggle={this.switchWeatherView}
                            />
                            <div>
                                {!detailedWeather ?
                                    <Table className="mt-4">
                                        <thead>
                                            <tr key="dates">
                                                {datesRow(hoveredColumn)}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dayDetailRow(hoveredColumn)}
                                            <tr key="weatherCodes" className>
                                                {weatherCodesRow(hoveredColumn)}
                                            </tr>
                                            <tr key="maxTemps" className="table-warning">
                                                {maxTemperaturesRow(hoveredColumn)}
                                            </tr>
                                            <tr key="minTemps" className="table-info">
                                                {minTemperaturesRow(hoveredColumn)}
                                            </tr>
                                            <tr key="sunDuration">
                                                {sunshineDurationRow(hoveredColumn)}
                                            </tr>
                                            <tr key="rainSum" className="table-primary">
                                                {rainSumRow(hoveredColumn)}
                                            </tr>
                                        </tbody>
                                    </Table>
                                : <DetailedWeatherChart
                                    weatherItem={weatherItem}
                                    displayRain={displayRain}
                                    displaySnow={displaySnow}
                                /> }
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default WeatherDetail;