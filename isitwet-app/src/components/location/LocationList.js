import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom'
import LeafletMapComponent from '../map/LeafletMapComponent';


class LocationList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            locations: [],
            searchName: '',
            isLoading: true
        };
        this.remove = this.remove.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleChange(event) {
        console.log(event);
        const target = event.target;
        const value = target.value;
        this.setState({searchName: value});
    }

    componentDidMount() {
        fetch('/api/v1/locations')
            .then(response => response.json())
            .then(data => this.setState({
                locations: data,
                isLoading: false
            }));
    }

    handleSearch(event) {
        event.preventDefault()
        const {locations, searchName} = this.state;
        fetch(`/api/v1/locations/query?nameSlice=${searchName}`, {
            method: 'GET'
        }).then(response => response.json())
          .then(data => {this.setState({locations: data})});
    }

    async remove(id) {
        await fetch(`/api/v1/locations/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedLocations = [...this.state.locations].filter(i => i.id !== id);
            this.setState({locations: updatedLocations});
        });
    }
    
    render() {
        const {locations, searchName, isLoading} = this.state;
    
        if (isLoading) {
            return <p>Loading...</p>;
        }

        const addLocation = (newLocation) => {
            let updatedLocations = [...locations, newLocation];
            this.setState({locations: updatedLocations});
        };
    
        const locationsList = locations.map(location => {
            return <tr key={location.id}>
                <td>{location.name}</td>
                <td>{location.longitude}</td>
                <td>{location.latitude}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/locations/" + location.id}>Edit</Button>
                        <Button size="sm" color="primary" tag={Link} to={"/weather/" + location.id}>Weather</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(location.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });
    
        return (
            <div>
                <Container fluid>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h3 className="mb-0">Locations</h3>
                        <Button color="success" tag={Link} to="/locations/new">Add Location</Button>
                    </div>

                    <Container fluid style={{height: "50rem"}}>
                        <Row className="h-75">
                            <Col md={5} sm={12} className="component-col">
                                <Form onSubmit={this.handleSearch}>
                                    <FormGroup>
                                        <Label for="nameSearch">Search by name</Label>
                                        <Input type="text" name="nameSearch" id="nameSearch" value={searchName || ''}
                                            onChange={this.handleChange}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Button color="primary" type="submit">Search</Button>
                                    </FormGroup>
                                </Form>

                                <div style={{ maxHeight: "30rem", overflowY: "auto" }}>
                                    <Table className="mt-4" hover>
                                        <thead>
                                        <tr>
                                            <th width="28%">Name</th>
                                            <th width="28%">Longitude</th>
                                            <th width="28%">Latitude</th>
                                            <th width="16%">Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {locationsList}
                                        </tbody>
                                    </Table>
                                </div>
                            </Col>
                            <Col md={7} sm={12} className="component-col">
                                <LeafletMapComponent
                                    locations={locations}
                                    addLocation={addLocation}
                                />
                            </Col>
                        </Row>
                    </Container>
                </Container>
            </div>
        );
    }
}

export default LocationList;