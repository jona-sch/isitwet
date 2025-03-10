import React, { Component } from 'react';


class LocationDetail extends Component {
    
    render() {

        return (
            <p className="banner__description">
                Position: lat={this.props.locationItem.latitude}° lng={this.props.locationItem.longitude}°<br></br>
                Elevation: {this.props.weatherItem.altitude}m<br></br>
            </p>
        );
    }
}

export default LocationDetail;