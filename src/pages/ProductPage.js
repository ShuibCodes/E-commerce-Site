 /* eslint-disable */

import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/shopContext';
import { Text, Div, Button, Row, Col, Container, Dropdown, Anchor , Tag} from 'atomize';
function ProductPage() {
	const [showDropdown, setShowDropdown] = useState(false);
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

		const colors = [
		<div>	{product.options[0].values[0].value}</div>,
		<div>	{product.options[0].values[1].value}</div>

			
		]

	const menuList = (
		<Div>
		  {colors.map((name, index) => (
			<Anchor d="block" p={{ y: "0.25rem" }}>
			  {name}
			</Anchor>
		  ))}
		</Div>
	  );
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


					<Dropdown
						m={{ r: "1rem", b: "1rem" , t: "1.5rem"}}
						isOpen={showDropdown}
						onClick={() => setShowDropdown(!showDropdown)}
						menu={menuList}
					>
						{product.options[0].name}
					</Dropdown>
					<Text tag="p" m={{r:"1rem"}} textSize="paragraph" textColor="black900" textWeight="400">
						{product.options[1].name}
					</Text>
					{
						product.options[1].values.map((e) => {
							return(
								<Tag m={{ r: "1.1rem", b: "1rem" , t: "0.5rem"}}  cursor="pointer" >{e.value}</Tag>		
							)
						})
					}
					<Button
						rounded="0"
						shadow="3"
						bg="black500"
						m={{ y: '2rem' }}
						onClick={() => {
							addItemToCheckout(product.variants[0].id, 1);
							openCart();
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
