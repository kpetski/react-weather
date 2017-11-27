import React, { Component } from 'react';

class WeatherTable extends Component {
    render() {
        return (
            <div>
                <h1 className="text-primary text-center">{this.props.data.city.name} Weather Forecast</h1>
                <br/>
                <table className="table margin-small">
                <thead>
                    <tr>
                        <th width="200">Time</th>
                        <th>High</th>
                        <th>Low</th>
                        <th>Humidity</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.data.list.map((weather, i) => {
                        return (
                        <tr key={i}>
                            <td>{(weather.dt_txt)}</td>
                            <td>{weather.main.temp_max}°F</td>
                            <td>{weather.main.temp_min}°F</td>
                            <td>{weather.main.humidity}</td>
                            <td><img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="desc icon"/>
                            {weather.weather[0].description}</td>
                        </tr>)
                    })}
                </tbody>
                </table>
            </div>
        );
    }
}

export default WeatherTable;
