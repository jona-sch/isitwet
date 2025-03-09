import React, { useState, useEffect, useContext } from 'react';
import { Button, ButtonGroup, Container, Table, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom'

import LeafletMapComponent from '../map/LeafletMapComponent';

import '../css/Home.css'

const LocationList = () => {
    const isAuthenticated = true;

    const [locations, setLocations] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('/api/v1/locations')
            .then(response => response.json())
            .then(data => {
                setLocations(data);
                setIsLoading(false);
            });
    }, []); // Empty dependency array means this runs once after the component mounts

    const handleChange = (event) => {
        const value = event.target.value;
        setSearchName(value);
    };

    const handleSearch = (event) => {
        event.preventDefault();
        fetch(`/api/v1/locations/query?nameSlice=${searchName}`, {
            method: 'GET'
        }).then(response => response.json())
          .then(data => {
              setLocations(data);
          });
    };

    const remove = async (id) => {
        await fetch(`/api/v1/locations/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            setLocations(locations.filter(location => location.id !== id));
        });
    };

    const addLocation = (newLocation) => {
        setLocations([...locations, newLocation]);
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    const locationsList = locations.map(location => (
        <tr key={location.id}>
            <td>{location.name}</td>
            <td>{location.longitude}</td>
            <td>{location.latitude}</td>
            <td>
                <ButtonGroup>
                    <Button size="sm" color="primary" tag={Link} to={`/locations/${location.id}`}>Edit</Button>
                    <Button size="sm" color="primary" tag={Link} to={`/weather/${location.id}`}>Weather</Button>
                    <Button size="sm" color="danger" onClick={() => remove(location.id)}>Delete</Button>
                </ButtonGroup>
            </td>
        </tr>
    ));

    return (
        <div>
            {isAuthenticated ?
            <div>
            <Container className="css-padding">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 className="mb-0">Locations</h3>
                    <Button color="success" tag={Link} to="/locations/new">Add Location</Button>
                </div>

                <Container fluid style={{ height: "50rem" }}>
                    <Row className="h-75">
                        <Col md={5} sm={12} className="component-col">
                            <Form onSubmit={handleSearch}>
                                <FormGroup>
                                    <Label for="nameSearch">Search by name</Label>
                                    <Input
                                        type="text"
                                        name="nameSearch"
                                        id="nameSearch"
                                        value={searchName || ''}
                                        onChange={handleChange}
                                    />
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
            </div> : <div><p>Please log in.</p></div> }
        </div>
    );
};

export default LocationList;
