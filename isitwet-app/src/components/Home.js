import React, { Component } from 'react';
import './../App.css';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'reactstrap';

import creationImg from './images/creation.png';
import viewDetailsImg from './images/view_details.png';
import weatherImg from './images/weather.png';

import './css/Home.css'

class Home extends Component {
    render() {
        return (
            <div>
                <Container className="css-padding">
                    <Row>
                        <Col md={5} sm={12} className="component-col">
                            <br></br>
                            <p>
                            <b>What is IsItWet ? It's the easiest way to check if your project will be dry today !</b>
                            </p>

                            <p>
                            Imagine this: you wake up, birds are chirping outside and the sun is high in the sky.
                            <br></br>
                            What better day to go try your latest climbing project and make some links, or maybe even send ?
                            <br></br>
                            ... but wait, didn't it rain yesterday ? Or was it the day before ?
                            <br></br>
                            Now that you think about it, last time you went, the whole wall was still wet from rain during the night.
                            </p>

                            <p>
                            Here comes IsItWet, where in one click you can check conditions for the day, but also (an most
                            importantly), conditions for the two previous days. No more driving (or better yet cycling) up
                            to a desperately wet wall !<br></br>
                            Just select the location, if needed create it, and plan your day accordingly.
                            </p>

                            <p>
                            You'll have an overview of the last two days, today and also tomorrow, so you can even plan to have
                            a rest day if it's looking more promising.<br></br>
                            In addition to the overview, if you're a data nerd,
                            you also have a detailed graph of the most important metrics: temperature, relative humidity and rain/snow fall.
                            More metrics to come !
                            </p>

                            <p>
                            Let's go check out possible locations and create your own:<br></br>
                            <Button color="link"><Link to="/locations">Locations</Link></Button>
                            </p>
                        </Col>
                        <Col md={7} sm={12} className="component-col">
                            <p>
                            1. Create your location:<br></br>
                            <img src={creationImg} alt="Location creation" width="80%"></img>
                            </p>
                            <p>
                            2. Select it:<br></br>
                            <img src={viewDetailsImg} alt="Location selection" width="80%"></img>
                            </p>
                            <p>
                            3. Check out the weather:<br></br>
                            <img src={weatherImg} alt="Location weather" width="80%"></img>
                            </p>
                            <p>
                            4. Go climb ! Or change your plans !
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
export default Home;