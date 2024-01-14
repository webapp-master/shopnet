import React, {useState,useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {Row, Col, Container} from "react-bootstrap";
import Product from '../Product';
import { listProducts } from '../../actions/productAction';
import Loader from '../Loader';
import Message from '../Message';

function HomeScreen() {
    const dispatch = useDispatch();
    const productList = useSelector((state)=>state.productList);
    const {error,loading,products} =productList
    useEffect(()=>{
        dispatch(listProducts());
    },[dispatch])

    return (

        <Container fluid>

                <div>
                    <h1 className="text-center"
                    style={{
                        backgroundColor: "#d7d1c6",
                        marginTop: "25px",
                        borderRadius: "390px",
                        boxShadow: "0  2px 8px rgba(0, 0, 0, 0.5)",
                      }}
                    >Latest Products</h1>

                    {loading ?(
                        <Loader />
                    ):error ?(
                    <Message variant='danger'>{error}</Message>
                    ):
                    
                    <Row>
                    {products.map((product)=>(
                        <Col key={product.id} sm={12} md={6} lg={4} xl={3}>

                            {/* <h3>{product.name}</h3> */}
                            <Product  product={product}/>
                        </Col>
                    ))} 
                    </Row>
                    
                    
                    }
                    
                </div>

        </Container>

       
            
       
    )
}

export default HomeScreen
