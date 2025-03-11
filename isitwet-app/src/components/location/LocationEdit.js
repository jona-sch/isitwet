import React, { useState, useEffect } from 'react';
import { Link, NavLink, useParams, useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import { PageLayout } from '../utils/PageLayout';


const LocationEdit = () => {
    const emptyItem = {
        longitude: '',
        latitude: '',
        name: '',
    };

    const [item, setItem] = useState(emptyItem);
    const { id } = useParams(); // Access route parameters
    const history = useHistory(); // Use useHistory instead of useNavigate
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();
    const [token, setToken] = useState("");
  
    useEffect(() => {
        const fetchToken = async () => {
            try {
                const accessToken = await getAccessTokenSilently({
                    scope: "read:current_user"
                });
                setToken(accessToken);
                const fetchLocation = async () => {
                    if (id !== 'new') {
                        try {
                            const response = await fetch(`/api/v1/locations/${id}`, {
                                method: 'GET',
                                headers: {
                                  Authorization: `Bearer ${accessToken}`,
                                }
                            });
                            const location = await response.json();
                            setItem(location);
                        } catch (error) {
                            console.error("Error fetching location:", error);
                        }
                    }
                };
                fetchLocation();
            } catch (error) {
                console.error("Error fetching token:", error);
            }
        };
      
        if (isAuthenticated) {
            fetchToken();
        }
    }, [getAccessTokenSilently, isAuthenticated, id, token]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setItem((prevItem) => ({ ...prevItem, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('/api/v1/locations' + (item.id ? '/' + item.id : ''), {
                method: item.id ? 'PUT' : 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(item),
            });

            if (!response.ok) {
                alert('Error saving location: ' + await response.text());
                console.error('Error saving location:', response);
            } else {
                history.push('/locations'); // Use history.push
            }
        } catch (error) {
            console.error("Error submitting location:", error);
        }
    };

    const title = <h2>{item.id ? 'Edit Location' : 'Add Location'}</h2>;
    const isEnabled = item.name !== '' && item.longitude !== '' && item.latitude !== '';

    return (
        <PageLayout>
            <div>
                {title}
                <form onSubmit={handleSubmit}>
                    <div className="form__group field">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={item.name || ''}
                            className="form__field"
                            onChange={handleChange}
                            autoComplete="name"
                            placeholder="Name"
                        />
                        <label htmlFor="name" className="form__label">Name</label>
                    </div>
                    <div className="form__group field">
                        <input
                            type="number"
                            name="longitude"
                            id="longitude"
                            value={item.longitude || ''}
                            className="form__field"
                            onChange={handleChange}
                            autoComplete="longitude"
                            placeholder="Longitude"
                        />
                        <label htmlFor="longitude" className="form__label">Longitude</label>
                    </div>
                    <div className="form__group field">
                        <input
                            type="number"
                            name="latitude"
                            id="latitude"
                            value={item.latitude || ''}
                            className="form__field"
                            onChange={handleChange}
                            autoComplete="latitude"
                            placeholder="Latitude"
                        />
                        <label htmlFor="latitude" className="form__label">Latitude</label>
                    </div>
                    <div>
                        <button className="button__save-location" type="submit" disabled={!isEnabled}>
                            Save
                        </button>{' '}
                        <NavLink tag={Link} to="/locations">
                            <button className="button__save-location">Cancel</button>
                        </NavLink>
                    </div>
                </form>
            </div>
        </PageLayout>
    );
};

export default LocationEdit;
