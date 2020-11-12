import useSelection from 'antd/lib/table/hooks/useSelection';
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import PaginationBar from "../components/PaginationBar";
import MerchCard from "../components/Cards/MerchCard"
import SmallMerchCard from "../components/Cards/SmallMerchCard"
import { cartActions } from "../redux/actions";

import { Link, useHistory } from 'react-router-dom'
import { productActions } from '../redux/actions';
import NavBarRo from "../components/NavBars/NavBarRo"
import NavBarJoinUs from "../components/NavBars/NavBarJoinUs"
import { CardColumns, Container, Jumbotron, Row, Col } from "react-bootstrap";
import LoadingPage from '../components/LoadingPage';

const MerchPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [pageNum, setPageNum] = useState(1);
    const loading = useSelector((state) => state.product.loading)
    const products = useSelector((state) => state.product.products)
    const totalPageNum = useSelector((state) => state.product.totalPageNum);
    useEffect(() => {
        dispatch(productActions.getProducts(pageNum));
        console.log("get products")
        dispatch(cartActions.getCart());
    }, [dispatch, pageNum])
    const onClickProducts = (id) => {
        history.push(`/merch/${id}`);
    }
    const [ani, setAni] = useState(true)
    setTimeout(() => setAni(false), 1000)
    if (ani) return (<LoadingPage />)


    return (
        <Container fluid className="no_padding">
            <NavBarRo />
            <NavBarJoinUs />
            <Jumbotron className="text-center jumbo_blog_merch">
                <div className="no_decor_italics">
                    <Link to={`/`} >Home </Link>
                    <Link >{`>>>`} </Link>
                    <Link to={`/blogs`}> Merch</Link>
                </div>
                <h1 className="big_text_jumbo">Merch</h1>
            </Jumbotron>

            <Container fluid className="featured">
                <h1> Featured Item</h1>


                <div className="featured_item">
                    {products.map((merch) => (
                        <div>
                            <MerchCard
                                merch={merch}
                                key={merch._id}
                                handleClick={onClickProducts}
                            />
                        </div>
                    ))}
                </div>
            </Container>
            <Container>
                <Row>
                    <Col lg={3}>
                    </Col>
                    <Col lg={9}>
                        <PaginationBar
                            pageNum={pageNum}
                            setPageNum={setPageNum}
                            totalPageNum={totalPageNum}
                            loading={loading}
                        />
                        <CardColumns>
                            {products.map((merch) => (
                                <SmallMerchCard
                                    merch={merch}
                                    key={merch._id}
                                    handleClick={onClickProducts}
                                />
                            ))}
                        </CardColumns>
                    </Col>
                </Row>

            </Container>


        </Container>
    )
}

export default MerchPage
