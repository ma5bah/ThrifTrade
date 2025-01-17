import { Button, Card, Carousel, Col, Container, Row } from 'react-bootstrap'
import Countdown from 'react-countdown'
import { Link } from 'react-router-dom'

import { useEffect, useState } from 'react'
import apiClient from '../apiClient.js'
import { Product } from '../types/Product.js'

export default function Auction() {
  const [products,setProducts] = useState([])
  useEffect(() => {
    apiClient.get(`/api/auction/get_auction_products`).then((res) => {
      const productItems=res.data;//.map((data: any )=>data['product'])
      // setProductsData(res.data)
      // res.data.map((data: any )=>console.log(  data['deadline']));
      // console.log(productItems)
      setProducts(productItems);
    }
    )

  },[])
  return (
    <div>
      <Carousel className="carousel2">
        <Carousel.Item interval={1000}>
          <div className="item">
            <img
              id="t1"
              className="d-block w-100"
              src="../../images/auction3.jpg"
              alt="First slide"
            />
          </div>
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1000}>
          <div className="item">
            <img
              id="t1"
              className="d-block w-100"
              src="../../images/auction4.jpg"
              alt="First slide"
            />
          </div>

          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <div className="item">
            <img
              id="t1"
              className="d-block w-100"
              src="../../images/auction5.jpg"
              alt="First slide"
            />
          </div>

          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Container className="mt-3">
        <h3 mt-3>Bid On These Featured Auctions!</h3>
        <Row>
          {products&&products.map((product) => (
            <Col key={product['product']['slug']} sm={6} md={4} lg={3}>
              <Card>
                {/* <Link to={`/product/${product.slug}`}> */}
                <img
                  src={product['product']['image']}
                  className="card-img-top"
                  alt={product['product']['name']}
                />
                {/* </Link> */}
                <Card.Body>
                  <Card.Title className="product-name">
                    {product['product']['name']}
                  </Card.Title>

                  <Card.Text>
                    <div className="Bid-color">
                      Current Bid : ${product['product']['price']}{' '}
                    </div>
                  </Card.Text>
                  <Card.Text>
                    <div className="Bid-color-time">
                      Time Left : <Countdown date={product['deadline']} />
                    </div>
                  </Card.Text>

                  <Link to={`/auction/${product['product']['slug']}`}>
                    <Button className="auction-button-color">
                      Submit A Bid
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}
