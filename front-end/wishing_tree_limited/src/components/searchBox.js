import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";

const SearchBox = ({ history }) => {
    const [keyword, setKeyword] = useState("");

    const submitHandler = (e) => {
        e.preventDefaut();
        if (keyword.trim()) {
            history.push(`/search/${keyword}`);
        } else {
            // push to home page or send an alert that the user is not allowed to enter an empty string
            return;
        }
    };

    const handleOnChange = (e) => {
        setKeyword(e.target.value);
        console.log(keyword);
    };

    return (
        <>
            <Form onSubmit={submitHandler}>
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="Search"
                        onChange={handleOnChange}
                    />
                    <Button className="p-3" type="button">
                        <i className="fas fa-search" />
                    </Button>
                </InputGroup>
            </Form>
        </>
    );
};

export default SearchBox;

//
