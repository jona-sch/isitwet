import React from 'react'
import { ResponsiveContainer, ReferenceArea, Line, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ComposedChart } from 'recharts';


export default function DetailedWeatherChart({ weatherItem, displayRain, displaySnow }) {
    const [activeSeries, setActiveSeries] = React.useState([]);
    const [opacity, setOpacity] = React.useState({
      'Temperature': 1,
      'Relative humidity': 1,
      'Rain': 1,
      'Snowfall': 1
    });

    /**
     * Format weather data correctly for Recharts.
     * From: {times:[...], temperatures: [...]}
     * To: [{times: t1, temperatues: 0.4}, {times: t2, temperatues: 1.2}, ...]
     */
    let weatherData = [];
    for (let i = 0; i < weatherItem.hourly.times.length; i++) {
        weatherData.push({
            times: weatherItem.hourly.times[i],
            "Temperature": weatherItem.hourly.temperatures[i],
            "Relative humidity": weatherItem.hourly.relativeHumidity[i],
            "Rain": weatherItem.hourly.rain[i],
            "Snowfall": weatherItem.hourly.snow[i],
        });
    }

    /**
     * Use active series var to enable display of subset of metrics.
     */
    const handleLegendClick = (dataKey) => {
      if (activeSeries.includes(dataKey)) {
        setActiveSeries(activeSeries.filter(el => el !== dataKey));
      } else {
        setActiveSeries(prev => [...prev, dataKey]);
      }
    };
  
    /**
     * Handle opacity of lines when legend is hovered.
     */
    const handleMouseEnter = (o) => {
        const { dataKey } = o;
        setOpacity((op) => {
            const newOpacity = {};
            for (const key in op) {
                newOpacity[key] = key === dataKey ? 1 : 0.35;
            }
            return newOpacity;
        });
    };
    const handleMouseLeave = (o) => {
        setOpacity((op) => {
            const newOpacity = {};
            for (const key in op) {
                newOpacity[key] = 1;
            }
            return newOpacity;
        });
    };

    return (
        <div className="col-md-12">
            <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={weatherData} margin={{ top: 15, right: 0, bottom: 15, left: 0 }}>
                    <Tooltip />
                    <XAxis dataKey="times" interval={11}/>
                    <YAxis yAxisId="1" displayName="Temperature (°C)" label={{value: "°C", position: "insideTop"}}/>
                    <YAxis yAxisId="2" displayName="Humidity (%)" type="number" domain={[0, 100]} label={{value: "%", position: "insideTop"}}/>
                    <YAxis yAxisId="3" displayName="Rain (mm)" label={{value: "mm/cm", position: "insideTop"}}/>
                    <CartesianGrid stroke="#17A8F5" strokeDasharray="5 5" strokeOpacity={0.3} interval={12}/>
                    <Legend
                        height={30} iconType="circle"
                        onClick={props => handleLegendClick(props.dataKey)}
                        onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
                    />
                    <Line
                        hide={activeSeries.includes('Temperature')}
                        strokeOpacity={opacity['Temperature']}
                        yAxisId="1" type="monotone"
                        dataKey="Temperature" stroke="#FB8833"
                        unit="°C"
                    />
                    <Line
                        hide={activeSeries.includes('Relative humidity')}
                        strokeOpacity={opacity['Relative humidity']}
                        yAxisId="2" type="monotone"
                        dataKey="Relative humidity" stroke="#17A8F5"
                        unit="%"
                    />
                    {displayRain ?
                        <Bar
                            hide={activeSeries.includes('Rain')}
                            strokeOpacity={opacity['Rain']}
                            fillOpacity={opacity['Rain']}
                            yAxisId="3" type="monotone"
                            dataKey="Rain" stroke="#17A8F5" fill="#17A8F5"
                            unit="mm"
                        />
                        : <></>
                    }
                    {displaySnow ?
                        <Bar
                            hide={activeSeries.includes('Snowfall')}
                            strokeOpacity={opacity['Snowfall']}
                            fillOpacity={opacity['Snowfall']}
                            yAxisId="3" type="monotone"
                            dataKey="Snowfall" stroke="#555555" fill="#555555"
                            unit="cm"
                        />
                        : <></>
                    }
                    <ReferenceArea
                        yAxisId="2"
                        x1={weatherData[48].times} x2={weatherData[72].times}
                        y1={0} y2={100}
                        strokeOpacity={0.5} fill="blue" stroke="none" opacity={0.2}
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    )
}
