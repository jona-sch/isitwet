import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';


class LocationEdit extends Component {

    emptyItem = {
        longitude: '',
        latitude: '',
        name: ''
    };

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const location = await (await fetch(`/api/v1/locations/${this.props.match.params.id}`)).json();
            this.setState({item: location});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;
    
        const response = await fetch('/api/v1/locations' + (item.id ? '/' + item.id : ''), {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        if (!response.ok) {
            alert('Error saving location: ' + await response.text());
            console.error('Error saving location: ' + response)
        } else {
            this.props.history.push('/locations');
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Edit Location' : 'Add Location'}</h2>;
        const isEnabled = item.name !== '' && item.longitude !== '' && item.latitude !== '';
    
        return <div>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" value={item.name || ''}
                               onChange={this.handleChange} autoComplete="name"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="longitude">Longitude</Label>
                        <Input type="number" name="longitude" id="longitude" value={item.longitude || ''}
                               onChange={this.handleChange} autoComplete="longitude"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="latitude">Latitude</Label>
                        <Input type="number" name="latitude" id="latitude" value={item.latitude || ''}
                               onChange={this.handleChange} autoComplete="latitude"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit" disabled={!isEnabled}>Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/locations">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}
export default withRouter(LocationEdit);