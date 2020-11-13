import React, { useState } from 'react'
import { Container, Jumbotron, Row, Col } from 'react-bootstrap'
import { useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBarJoinUs from '../NavBars/NavBarJoinUs'
import NavBarO from '../NavBars/NavBarRo'
import LoadingPage from "../LoadingPage"


const CategoryPage = () => {
    const history = useHistory();
    const loading = useSelector((state) => state.product.loading);

    const category = ["Dribbling", "Shooting", "Screens", "Situations", "Isolation", "Finishing", "HoopCourt", "Story"]
    const [ani, setAni] = useState(true)
    setTimeout(() => setAni(false), 1000)
    if (loading || ani) return (<LoadingPage />)
    return (
        <Container fluid className="no_padding">
            <NavBarO />
            <NavBarJoinUs />

            <Jumbotron className="text-center jumbo_blog_category">
                <h1 className="big_text_jumbo">Category</h1>
            </Jumbotron>
            <Container>
                <div className="no_decor_italics">
                    <Link to={`/`} >Home </Link>
                    {`>>>`}
                    <Link to={`/category`}> Category</Link>
                </div>
                <Row className="category">
                    {category.map((tag) => {
                        return (
                            <Col onClick={() => history.push(`/category/${tag}`)} lg={3}>
                                <div className={`card  text-white ${tag}`}>
                                    <div className="card-img-overlay category_overlay">
                                        <h5 className="card-title">{tag}</h5>
                                    </div>
                                </div>
                            </Col >
                        )
                    })}
                </Row>
            </Container>
        </Container>
    )
}

export default CategoryPage
