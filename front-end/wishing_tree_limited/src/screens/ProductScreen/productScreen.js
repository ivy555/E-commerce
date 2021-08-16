import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../../actions/product";
import Loader from "../../components/loader";
import Message from "../../components/message";
import SizeButtons from "./sizeButtons";
import ColorButtons from "./colorButtons";
import {
    Row,
    Col,
    Image,
    ListGroup,
    Card,
    Button,
    Form,
} from "react-bootstrap";
import Rating from "../../components/rating";

const styles = {
    btn_circle: {
        width: "30px",
        height: "30px",
        padding: "6px 0px",
        borderRadius: "15px",
        textAlign: "center",
        fontSize: "12px",
        lineHeight: "1.42857",
    },
};

const ProductScreen = ({ history, match }) => {
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [colorIndex, setColorIndex] = useState(0);
    const [color, setColor] = useState("");
    const [qty, setQty] = useState(1);

    const dispatch = useDispatch();
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    const settings = useSelector((state) => state.settings);
    const { language, currency } = settings;

    useEffect(() => {
        dispatch(listProductDetails(match.params.id));
    }, [dispatch, match]);

    const addToCartHandler = () => {
        history.push(
            `/cart/${match.params.id}?qty=${qty}&size=${selectedSize}&=${color}`
        );
    };

    const setSizeAndSizeIndex = (s) => {
        setSelectedSize(s.size);
        setSelectedIndex(s.index);
    };

    const setColorButton = (c) => {
        setColorIndex(c.index);
        setColor(c.color);
    };

    return (
        <>
            <Link className="btn my-3" to="/">
                Go Back
            </Link>
            {product ? (
                <Row>
                    <Col md={6}>
                        <Image
                            src={product.image[0]}
                            alt={product.productName[language]}
                            fluid
                        />
                    </Col>
                    <Col md={3}>
                        {/*flush takes out the border */}
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>{product.productName[language]}</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <SizeButtons
                                    product={product}
                                    styles={styles}
                                    buttonClick={setSizeAndSizeIndex}
                                    selectedSize={selectedSize}
                                />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <ColorButtons
                                    product={product}
                                    styles={styles}
                                    buttonClick={setColorButton}
                                    language={language}
                                    colors={color}
                                    selectedIndex={selectedIndex}
                                />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating
                                    value={product.ratings}
                                    text={`${product.ratings} reviews`}
                                />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price: ${product.price[currency]}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description: {product.feature[language]}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col>
                                            <strong>
                                                ${product.price[currency]}
                                            </strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>
                                            {product.size[selectedIndex]
                                                .color_size.colors[colorIndex]
                                                .count > 0
                                                ? "In Stock"
                                                : "Out of Stock"}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                {product.size[selectedIndex].color_size.colors[
                                    colorIndex
                                ].count > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Quanity</Col>
                                            <Col>
                                                <Form.Control
                                                    as="select"
                                                    value={qty}
                                                    onChange={(e) => {
                                                        setQty(e.target.value);
                                                    }}
                                                >
                                                    {[
                                                        ...Array(
                                                            product.size[
                                                                selectedIndex
                                                            ].color_size.colors[
                                                                colorIndex
                                                            ].count
                                                        ).keys(),
                                                    ].map((x) => (
                                                        <option
                                                            key={x + 1}
                                                            value={x + 1}
                                                        >
                                                            {x + 1}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}
                                <ListGroup.Item className="d-grid gap-2">
                                    <Button
                                        onClick={addToCartHandler}
                                        className="btn"
                                        type="button"
                                        disabled={
                                            product.size[selectedIndex]
                                                .color_size.colors[colorIndex]
                                                .count <= 0 || color === ""
                                        }
                                    >
                                        ADD TO CART
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            ) : loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : null}
        </>
    );
};

export default ProductScreen;
