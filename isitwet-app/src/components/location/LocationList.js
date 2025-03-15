import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link, NavLink } from 'react-router-dom'

import LeafletMapComponent from '../map/LeafletMapComponent';

import { PageLayout } from '../utils/PageLayout';
import { PageLoader } from '../utils/PageLoader';

const LocationList = () => {
    // const isAuthenticated = true;

    const [locations, setLocations] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();
    const [token, setToken] = useState("");
  
    useEffect(() => {
        const fetchToken = async () => {
            try {
                const accessToken = await getAccessTokenSilently({
                    scope: "read:current_user"
                });
                setToken(accessToken);
                fetch('/api/v1/locations', {
                    method: 'GET',
                    headers: {
                      Authorization: `Bearer ${accessToken}`,
                    }
                }).then(response => response.json())
                    .then(data => {
                        setLocations(data);
                        setIsLoading(false);
                    });
            } catch (error) {
                console.error("Error fetching token:", error);
            }
        };
      
        if (isAuthenticated) {
            fetchToken();
        }
        console.log("abc: " + token);
    }, [getAccessTokenSilently, isAuthenticated, token]);

    const handleChange = (event) => {
        const value = event.target.value;
        setSearchName(value);
    };

    const handleSearch = (event) => {
        event.preventDefault();
        fetch(`/api/v1/locations/query?nameSlice=${searchName}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${token}`
            }
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
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        }).then(() => {
            setLocations(locations.filter(location => location.id !== id));
        });
    };

    const addLocation = (newLocation) => {
        setLocations([...locations, newLocation]);
    };

    // if (isLoading) {
    //     return <div className="page-layout">
    //         <PageLoader />
    //     </div>;
    // }

    const locationsList = locations.map(location => (
        <tr key={location.id} className="table-row">
            <td style={{ paddingLeft: "1rem", textAlign: "left" }}>{location.name}</td>
            <td>{location.longitude}</td>
            <td>{location.latitude}</td>
            <td style={{ paddingLeft: "1rem", textAlign: "right" }}>
                <NavLink tag={Link} to={`/locations/${location.id}`}><a
                    id="back_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button__action"
                >
                    Edit
                </a></NavLink>
                <NavLink tag={Link} to={`/weather/${location.id}`}><a
                    id="back_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button__action"
                >
                    Weather
                </a></NavLink>
                <a
                    id="back_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button__action"
                    onClick={() => remove(location.id)}
                >
                    Delete
                </a>
            </td>
        </tr>
    ));

    return (
        <PageLayout>
        <div>
            {isAuthenticated ?
            <div>
                <header className="page-header">
                    <h1>Locations</h1>
                    <span fxFlex></span>
                    <NavLink tag={Link} to="/locations/new"><a
                        id="back_link"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button__add_location"
                    >
                        Add location
                    </a></NavLink>
                </header>

                <form onSubmit={handleSearch} className="page-header">
                    <div className="form__group field">
                        <input
                            type="text"
                            name="nameSearch"
                            id="nameSearch"
                            value={searchName || ''}
                            onChange={handleChange}
                            className="form__field"
                            placeholder="Name"
                        />
                        <label for="name" className="form__label">Search by name</label>
                    </div>
                    <button color="primary" type="submit" className="button__search">Search</button>
                </form>

                { locations.length > 0 ?
                    <div style={{ maxHeight: "45rem", overflowY: "auto" }}>
                        <table className="table" hover cellSpacing="0" cellPadding="0">
                            <thead className="table-header__locations">
                                <tr className="table-row">
                                    <th width="28%" style={{ paddingLeft: "1rem", textAlign: "left" }}>Name</th>
                                    <th width="28%">Longitude</th>
                                    <th width="28%">Latitude</th>
                                    <th width="16%"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {locationsList}
                            </tbody>
                        </table>
                    </div>: <p>No locations.</p>
                }
                <div style={{ height: "40rem", width: "100%" }}>
                <LeafletMapComponent
                    locations={locations}
                    addLocation={addLocation}
                    accessToken={token}
                />
                </div>
            </div> : <div><p>Please log in.</p></div> }
        </div>
        </PageLayout>
    );
};

export default LocationList;
