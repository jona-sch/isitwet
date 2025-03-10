import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { PageLayout } from '../utils/PageLayout';


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
    
        return (
            <PageLayout>
                <div>
                    {title}
                    <form onSubmit={this.handleSubmit}>
                        <div className="form__group field">
                            <input type="text" name="name" id="name" value={item.name || ''} className="form__field"
                                    onChange={this.handleChange} autoComplete="name" placeholder="Name"/>
                            <label for="name" className="form__label">Name</label>
                        </div>
                        <div className="form__group field">
                            <input type="number" name="longitude" id="longitude" value={item.longitude || ''} className="form__field"
                                    onChange={this.handleChange} autoComplete="longitude" placeholder="Longitude"/>
                            <label for="longitude" className="form__label">Longitude</label>
                        </div>
                        <div className="form__group field">
                            <input type="number" name="latitude" id="latitude" value={item.latitude || ''} className="form__field"
                                    onChange={this.handleChange} autoComplete="latitude" placeholder="Latitude"/>
                            <label for="latitude" className="form__label">Latitude</label>
                        </div>
                        <div>
                            <button className="button__save-location" type="submit" disabled={!isEnabled}>Save</button>{' '}
                            <NavLink tag={Link} to="/locations"><button className="button__save-location">Cancel</button></NavLink>
                        </div>
                    </form>
                </div>
            </PageLayout>);
    }
}
export default withRouter(LocationEdit);