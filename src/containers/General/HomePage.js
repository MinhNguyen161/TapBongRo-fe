import React from 'react'
import { Container } from 'react-bootstrap'
import NavBarRo from "../../components/NavBars/NavBarRo"
import NavBarJoinUs from "../../components/NavBars/NavBarJoinUs"

// import background from "../../public/images/bg.gif"
// import { AppRegistry, StyleSheet, Text, View, TextInput } from "react-native";

// import Video from "react-native-video";

const HomePage = () => {// fix homePage later
    return (
        <Container fluid className="home_page"  >
            <NavBarRo />
            <NavBarJoinUs />
            <div className="img_bg">

            </div>
            <div className="icon-bar">
                <div className="div-icon left-icon">
                    <a className="icon-link insta" href="https://www.instagram.com/tapbongro/">
                        <img className="icon" src="./images/youtube.png" />
                    </a>
                </div>
                <div className="div-icon right-icon">
                    <a className="icon-link" href="https://www.youtube.com/channel/UCSzRrE93bfPwgglAPGri2ng">
                        <img className="icon" src="./images/instagram.png" />
                    </a>
                </div>
            </div>


        </Container>
    )
}

export default HomePage
