import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../../actions/product";
import Loader from "../../components/loader";
import Message from "../../components/message";
import Rating from '../../components/rating'
import SizeButtons from "./sizeButtons";
import ColorButtons from "./colorButtons";
import OtherProductInfo from "./otherProductInfo";
import ImageCarousel from "../../components/imageCarousel";
import PaymentMethods from "../../components/paymentMethods";
import ModalPopup from "../../components/modal";
import {
    Row,
    Col,
    ListGroup,
    Card,
    Button,
    Form,
    Carousel,
} from "react-bootstrap";
import { sizeTypeToInfo } from "../../Utils/size";
import { Image } from "cloudinary-react";
import { p } from "../../Utils/translateLibrary/productDetails";
// import { PRODUCT_CREATE_REVIEW_RESET } from '../../actions/types'
// import { logout } from "../../actions/user";


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
    const [selectedSize, setSelectedSize] = useState("None");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [colorIndex, setColorIndex] = useState(0);
    const [imageIndex, setImageIndex] = useState(0);
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [color, setColor] = useState("None");

    const [qty, setQty] = useState(1);

    // const [rating, setRating] = useState(0)
    // const [comment, setComment] = useState('')
    // const [allReviews, setAllReviews] = useState([]);
    // const [hasOrderedItem, setHasOrderedItem] = useState(false); // bool to check if the user has ordered this product
	// const [showReviewForm, setShowReviewForm] = useState(false); 
  

    const dispatch = useDispatch();

   
    // const userLogin = useSelector((state) => state.userLogin)
    // const { userInfo } = userLogin

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    // const userDetails = useSelector((state) => state.userDetails);
	// const { error: userLoginError } = userDetails;


    const settings = useSelector((state) => state.settings);
    const { language, currency } = settings;


    // const productReviewCreate = useSelector((state) => state.productReviewCreate)
    //   const {
    //      success: successProductReview,
    //      loading: loadingProductReview,
    //       error: errorProductReview,
    // } = productReviewCreate

    // const orderListUser = useSelector((state) => state.orderListUser);
	// const { orders } = orderListUser;


    useEffect(() => {
        // if (successProductReview) {
        //     setRating(0)
        //     setComment('')
        //     dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        // }    
            dispatch(listProductDetails(match.params.id))

    }, [dispatch, match]);

    const addToCartHandler = () => {
        history.push(
            `/cart/${match.params.id}?qty=${qty}&size=${selectedSize}&=${color}`
        );
    };
    // const submitHandler = (e) => {
    //     e.preventDefault()
    //     dispatch(
    //       createProductReview(match.params.id, {
    //         rating,
    //         comment,
    //       })
    //     )
    //   }
    //   const writeDate = (timestamp) => {
    //     const time = timestamp.substring(0, 10)
    //     const [yr, mo, day] = [ parseInt(time.substring(0, 4)),
    //                             parseInt(time.substring(5,7)),
    //                             parseInt(time.substring(8, 10)) ]
    //     const options = { month: 'long', day: 'numeric', year: 'numeric' }
    //     const date = new Date(yr, mo-1, day)
    //     const localeString = date.toLocaleDateString('en-US', options)
    //     return localeString
    // }

    const setSizeAndSizeIndex = (s) => {
        setSelectedSize(s.size);
        setSelectedIndex(s.index);
    };

    const setColorButton = (c) => {
        setColorIndex(c.index);
        setColor(c.color);
    };

    const handleSelcetImage = (index) => {
        setImageIndex(index);
        setCarouselIndex(index);
    };

    return (
        <>
            <Link
                className="btn my-3"
                to={match.params.menu ? `/${match.params.menu}` : "/"}
            >
                {p.goBack[language]}
            </Link>
            {product ? (
                <>
                    <Row className="justify-content-md-center">
                        <Col md={8} lg={5}>
                            <Row>
                                <Carousel
                                    activeIndex={imageIndex}
                                    onSelect={handleSelcetImage}
                                    variant="dark"
                                >
                                    {product.image.map((im, i) => {
                                        return (
                                            <Carousel.Item
                                                key={i}
                                                style={{ height: "500px" }}
                                            >
                                                <Image
                                                    className="d-block w-100"
                                                    cloudName="dycgvrxas"
                                                    publicId={im}
                                                    style={{
                                                        objectFit: "cover",
                                                    }}
                                                />
                                            </Carousel.Item>
                                        );
                                    })}
                                </Carousel>

                                <ImageCarousel
                                    images={product.image}
                                    colorIndexOnClick={handleSelcetImage}
                                    carouselIndex={carouselIndex}
                                />
                            </Row>
                        </Col>
                        <Col md={4} lg={5}>
                            <Card>
                                <ListGroup
                                    variant="flush"
                                    className="borderless"
                                >
                                    <ListGroup.Item variant="fluid">
                                        <h2>{product.productName[language]}</h2>
                                    </ListGroup.Item>
                                     <ListGroup.Item>
                                       <Rating
                                          value={product.rating}
                                          text={`${product.numReviews} reviews`}
                                          />
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
                                        {product.feature[language]}
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>{p.price[language]}:</Col>
                                            <Col>
                                                <Row>
                                                    {product.discount[
                                                        currency
                                                    ] > 0 ? (
                                                        <Col md="auto">
                                                            <strong className="d-flex justify-content-start">
                                                                <span className="strikediag withpadding text-danger ml-2">
                                                                    {currency ===
                                                                    "jpn"
                                                                        ? "$"
                                                                        : "€"}
                                                                    {
                                                                        // {currency ===
                                                                        //     "jpn"
                                                                        //         ? "¥"
                                                                        //         : "$"}
                                                                        //     {
                                                                        product
                                                                            ?.price[
                                                                            currency
                                                                        ]
                                                                    }
                                                                </span>
                                                            </strong>
                                                        </Col>
                                                    ) : (
                                                        <Col md="auto">
                                                            <strong className="d-flex ml-2 justify-content-start">
                                                                {currency ===
                                                                "jpn"
                                                                    ? "$"
                                                                    : "€"}

"jpn"
                                                                    {/* ? "¥"
                                                                    : "$"} */}
                                                                {
                                                                    product
                                                                        ?.price[
                                                                        currency
                                                                    ]
                                                                }
                                                            </strong>
                                                        </Col>
                                                    )}

                                                    {product?.discount[
                                                        currency
                                                    ] > 0 ? (
                                                        <Col className="d-flex text-success ml-2 justify-content-start">
                                                            <strong>
                                                                {currency ===
                                                                "jpn"
                                                                    ? " $"
                                                                    : " €"}
                                                                {
                                                                    product
                                                                        ?.discount[
                                                                        currency
                                                                    ]
                                                                }{" "}
                                                            </strong>
                                                        </Col>
                                                    ) : null}
                                                </Row>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>{p.status[language]}:</Col>
                                            <Col>
                                                {product.size[selectedIndex]
                                                    .colors[colorIndex] !==
                                                    undefined &&
                                                product.size[selectedIndex]
                                                    .colors[colorIndex].count >
                                                    0
                                                    ? "In Stock"
                                                    : "Out of Stock"}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {product.size[selectedIndex].colors[
                                        colorIndex
                                    ] !== undefined &&
                                        product.size[selectedIndex].colors[
                                            colorIndex
                                        ].count > 0 && (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>
                                                        {p.quantity[language]}
                                                    </Col>
                                                    <Col>
                                                        <Form.Select
                                                            value={qty}
                                                            onChange={(e) => {
                                                                setQty(
                                                                    e.target
                                                                        .value
                                                                );
                                                            }}
                                                        >
                                                            {[
                                                                ...Array(
                                                                    product
                                                                        .size[
                                                                        selectedIndex
                                                                    ].colors[
                                                                        colorIndex
                                                                    ].count
                                                                ).keys(),
                                                            ].map((x) => (
                                                                <option
                                                                    key={x + 1}
                                                                    value={
                                                                        x + 1
                                                                    }
                                                                >
                                                                    {x + 1}
                                                                </option>
                                                            ))}
                                                        </Form.Select>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )}
                                    <ListGroup.Item>

                                        <Row>
                                            <Col md={7}>
                                                {p.size[language]}:
                                            </Col>
                                            <Col md={5}>
                                                {sizeTypeToInfo(selectedSize)}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col md={7}>
                                                {p.color[language]}:
                                            </Col>
                                            <Col md={5}>{color}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="d-grid gap-2">
                                        <span className="d-grid gap-2">
                                            <Button
                                                onClick={addToCartHandler}
                                                className="btn"
                                                type="button"
                                                disabled={
                                                    product.size[selectedIndex]
                                                        .colors[colorIndex] ===
                                                        undefined ||
                                                    product.size[selectedIndex]
                                                        .colors[colorIndex]
                                                        .count <= 0 ||
                                                    color === "None" ||
                                                    selectedSize === "None"
                                                }
                                            >
                                                {p.addToCart[language]}
                                            </Button>
                                        </span>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col className="d-flex justify-content-center">
                                                <ModalPopup
                                                    btnTitle={
                                                        p.sizeGuide[language]
                                                    }
                                                />
                                            </Col>
                                            <Col className="d-flex justify-content-center">
                                                <ModalPopup
                                                    btnTitle={
                                                        p.deliverNReturn[
                                                            language
                                                        ]
                                                    }
                                                />
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        {p.payment[language]}
                                        <PaymentMethods />
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    {/* <Row>
                        <Col md={6}>
                            <h4 className="mt-4 ml-2"><ins>Reviews</ins></h4>

                            { (product.reviews.length === 0) && 
                                ( <Message variant='light'>No Reviews</Message> )
                            }

                            <ListGroup variant="flush">
                                { product.reviews.map((review) => (
                                    <ListGroup.Item key={review._id}>
                                        <strong>{ review.name }</strong>
                                        <Rating value={ review.rating }
                                                color="#B55B00"
                                                text={ writeDate(review.createdAt) }
                                        />
                                        
                                        <p className="px-1 mt-3">{ review.comment }</p>
                                    </ListGroup.Item>
                                ))}

                                <h4 className="mt-4 ml-2">Write a Review</h4>
                                
                                { loadingProductReview && <Loader /> }
                                { successProductReview && <Message variant="success">Review Submitted</Message> }
                                { errorProductReview && <Message variant="danger">{ errorProductReview }</Message> }

                                    <ListGroup.Item>
                                        
                                            /* <Form onSubmit={ submitHandler }>
                                                <Form.Group className="d-flex">
                                                    <Form.Label className="mr-3 mt-2">Rating:</Form.Label>
                                                    <Form.Control
                                                        as="select"
                                                        value={ rating }
                                                        className="w-50"
                                                        size="text"
                                                        onChange={(e) => setRating(e.target.value)}
                                                    >
                                                        <option value=''>Select...</option>
                                                        <option value='1'>1 - Poor</option>
                                                        <option value='2'>2 - Fair</option>
                                                        <option value='3'>3 - Good</option>
                                                        <option value='4'>4 - Very Good</option>
                                                        <option value='5'>5 - Excellent</option>
                                                    </Form.Control>
                                                </Form.Group>

                                                <Form.Group controlId="comment">
                                                    <Form.Label className="mr-3 mt-2">Review:</Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={4}
                                                        value={ comment }
                                                        onChange={(e) => setComment(e.target.value)}
                                                    ></Form.Control>
                                                </Form.Group>

                                                <Button
                                                    disabled={ loadingProductReview }
                                                    type="submit"
                                                    variant="primary"
                                                >
                                                    Submit
                                                </Button>
                                            </Form>
                                         
                                            <Message variant='dark'>
                                                Please <Link to="/login" >log in</Link> to write a review.
                                            </Message>
                                        
                                    </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>  */}
                    
                    
                    {!loading && (
                        <Row className="mt-4">
                            <OtherProductInfo
                                gender={product?.gender}
                                price={product?.price[currency]}
                                pid={product?._id}
                            />
                        </Row>

                    )}
                </>
            ) : loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : null}
        </>
    );
};

export default ProductScreen;
