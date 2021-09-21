import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/shopContext';
import { Text, Div, Button, Row, Col, Container } from 'atomize';
function ProductPage() {
	let { id } = useParams();
	const { fetchProductWithId, addItemToCheckout, product, openCart } = useContext(ShopContext);

	useEffect(() => {
		fetchProductWithId(id);

		// fetchData()
		return () => {
			// setProduct(null)
		};
	}, [fetchProductWithId, id]);
	if (!product.title) return <div>loading</div>;
	return (
		<Container p="2rem">
			<Row>
				<Col>
					<Div bgImg={product.images[2].src} bgSize="cover" bgPos="center center" h="40rem" />
				</Col>
				<Col>
					<Text tag="h1" textColor="black500" textWeight="200" m={{ y: '2rem' }}>
						{product.title}
					</Text>
					<Text tag="h3" m={{ y: '2rem' }} textWeight="200">
						${product.variants[0].price}
					</Text>
					<Text tag="p" textSize="paragraph" textColor="gray900" textWeight="200">
						{product.description}
					</Text>
                    <Text tag="p" textSize="paragraph" textColor="black" textWeight="400">
						{product.options[0].name}
					</Text>
                    <Text tag="p" textSize="paragraph" textColor="black" textWeight="800">
						{product.options[0].values[0].value}
                        Or
					</Text>
					<Button
						rounded="0"
						shadow="3"
						bg="black500"
						m={{ y: '2rem' }}
						onClick={() => {
                        addItemToCheckout(product.variants[0].id, 1)
                        openCart()
                        
                        }}
					>
						Add To Cart
					</Button>
				</Col>
			</Row>
		</Container>
	);
}

export default ProductPage;
