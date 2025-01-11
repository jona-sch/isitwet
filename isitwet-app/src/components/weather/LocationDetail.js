import React, { Component } from 'react';
import { Container } from 'reactstrap';


class LocationDetail extends Component {
    
    render() {

        return (
            <div>
                <Container fluid>
                    <ul>
                        <li key="name">Name: {this.props.locationItem.name}</li>
                        <li key="position">Position: lat={this.props.locationItem.latitude}° lng={this.props.locationItem.longitude}°</li>
                        <li key="elevation">Elevation: {this.props.weatherItem.altitude}m</li>
                        <li key="description">Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                            It has survived not only five centuries, but also the leap into electronic typesetting,
                            remaining essentially unchanged. It was popularised.</li>
                    </ul>
                </Container>
            </div>
        );
    }
}

export default LocationDetail;