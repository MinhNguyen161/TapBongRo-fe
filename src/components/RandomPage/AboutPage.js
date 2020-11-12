import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Jumbotron } from 'react-bootstrap'
import NavBarRo from "../NavBars/NavBarRo"
import NavBarJoinUs from "../NavBars/NavBarJoinUs"
import { Link } from 'react-router-dom'
import LoadingPage from '../LoadingPage'

const AboutPage = () => {

    const [ani, setAni] = useState(true)
    setTimeout(() => setAni(false), 1000)
    if (ani) return (<LoadingPage />)
    return (
        <Container fluid className="no_padding">

            <NavBarRo />
            <NavBarJoinUs />

            <Jumbotron className="text-center jumbo_blog_about">
                <div className="no_decor_italics">
                    <Link to={`/`} >Home </Link>
                    <Link >{`>>>`} </Link>
                    <Link to={`/blogs`}> About</Link>
                </div>
                <h1 className="big_text_jumbo">About</h1>
            </Jumbotron>
            <h1 className="text-center"> Trainer/Head Coach</h1>
            <Row flex>
                <Col md={6} className="about_img">
                    <div>
                        <img src="./images/ava.png" alt="logo" className="ava" />
                    </div>
                </Col>
                <Col md={6} className="about_content">
                    <h2>
                        Nguyen Hong Cuong
                    </h2>
                    <p>
                        A member of the 1993 and 1994 U.S. National Foil
                        teams as well as the 2014 and 2016 U.S. Veteran World Foil
                        Teams, Coach Peter Grandbois brings over thirty years of fencing
                        and coaching experience to the club. Grandbois has previously coached
                        both varsity and club programs at such places as the University of Colorado,
                        the University of Chicago, Adlai Stevenson High School, and Halberstadt
                        Fencers Club in San Francisco. Grandbois started the club in 2011 with
                        the goal of turning that club into a competitive team. That dream was
                        realized in 2016 when the Denison Fencing Team joined the Midwest
                        Fencing Conference.
                    </p>
                    <p>
                        You can contact Coach Grandbois by email: grandboisp@denison.edu

                        English Department Homepage

                        Personal Homepage
                        </p>
                </Col>
            </Row>
        </Container>
    )
}

export default AboutPage
