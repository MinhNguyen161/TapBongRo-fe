import React, { useEffect, useState } from 'react'
import NavBarRo from "../components/NavBars/NavBarRo"
import NavBarJoinUs from "../components/NavBars/NavBarJoinUs"
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Container, Jumbotron, Row, Col, Table, Button } from 'react-bootstrap'
import { cartActions } from "../redux/actions/cart.actions"
import LoadingPage from '../components/LoadingPage';
import { productActions } from '../redux/actions';


const FavPage = () => {
    const dispatch = useDispatch();

    const loading = useSelector((state) => state.product.loading);
    const isAuthorized = useSelector((state) => state.auth.isAuthorized)
    const currentUser = useSelector((state) => state.auth.user)
    const favs = useSelector((state) => state.product.favs)
    const history = useHistory();
    console.log("favsList", favs)
    useEffect(() => {
        dispatch(productActions.getFavs())
    }, [dispatch, currentUser?._id,]);
    const removeItem = (product, index) => {
        dispatch(productActions.addRemoveFromFav(product.itemId?._id))
        //ANCHOR luc remove muo nno tu refresh
        history.push('/favorites')
    }
    const Product = ({ product, index }) => {
        return (
            <tr>
                <th scope="row" className="border-0">
                    <div className="p-2">
                        <img src="https://res.cloudinary.com/mhmd/image/upload/v1556670479/product-1_zrifhn.jpg" alt="" width="70" className="img-fluid rounded shadow-sm" />
                        <div className="ml-3 d-inline-block align-middle">
                            <h6 className="mb-0"> <span onClick={() => history.push(`/merch/${product.itemId._id}`)} className="text-dark d-inline-block align-middle">{product.itemId.name}</span></h6>
                        </div>
                    </div>
                </th>
                <td className="border-0 align-middle text-uppercase"><strong>{product.itemId.product_info.color}</strong></td>
                {/* ANCHOR add more stuff here */}
                <td className="border-0 align-middle text-uppercase"><strong> {product.itemId.clothing_type} </strong></td>

                <td className="border-0 align-middle"><strong>${product.itemId.price}</strong></td>
                <td className="border-0 align-middle"><Button className="remove_button" onClick={() => removeItem(product, index)}><img src="./images/bin.png" alt="logo" className="logo_user" /></Button></td>
            </tr>

        )
    }
    const [ani, setAni] = useState(true)
    setTimeout(() => setAni(false), 1000)
    if (loading || ani) return (<LoadingPage />)
    return (
        <Container fluid className="no_padding">
            <NavBarRo />
            <NavBarJoinUs />
            <Jumbotron className="text-center jumbo_blog_favo">
                <h1 className="big_text_jumbo">Favorites</h1>
            </Jumbotron>
            <Container>
                <div className="no_decor_italics">
                    <Link to={`/`} >Home </Link>
                    {`>>>`}
                    <Link to={`/favorites`}> Favorites</Link>
                </div>
                <h1> Favorites Item</h1>
                <div className="table_content"> {isAuthorized ? (
                    <div>
                        {favs && favs.products?.length ? (
                            <Table hover responsive>
                                <thead>
                                    <tr>
                                        <th scope="col" className="border-0 bg-light">
                                            <div className="p-2 px-3 text-uppercase">Product</div>
                                        </th>
                                        <th scope="col" className="border-0 bg-light">
                                            <div className="py-2 text-uppercase">Type</div>
                                        </th>
                                        <th scope="col" className="border-0 bg-light">
                                            <div className="py-2 text-uppercase">Color</div>
                                        </th>
                                        <th scope="col" className="border-0 bg-light">
                                            <div className="py-2 text-uppercase">Price</div>
                                        </th>
                                        <th scope="col" className="border-0 bg-light">
                                            <div className="py-2 text-uppercase">Remove</div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {favs.products.map((product, index) => {

                                        return (
                                            <Product product={product} index={index} />
                                        )
                                    })}
                                </tbody>
                            </Table>
                        ) : (<div> You do not have anything </div>)}
                    </div>

                ) : (
                        <div className="text-center"> To see your favorites list, please <Link to="/login"> Login </Link>  </div>

                    )} </div>



            </Container>




        </Container >
    )
}

export default FavPage

