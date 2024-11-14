import React from "react";
import { Form, Row } from 'react-bootstrap';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchChatListAPI } from "../APIServices/service";
import { InputField } from "./InputField";
import { CiSearch } from "react-icons/ci";

export const LiveChatSearch = ({ className, getSearch, searchData = [], clickHandler ,value}) => {

    return (
        <>
            <Form className="Search_form">
                <InputField startIcon={<CiSearch />} value={value} placeholder={'Search...'} id={'search'} onChange={(e) => getSearch(e.target.value)} className={className} />
                {searchData?.length > 0 &&
                <Row className="love-serch" style={{ marginLeft: "2px" }}>
                    <ul style={{ listStyleType: "none" }}>
                        {searchData?.map((e, index) => (
                            <li style={{ marginTop: "3px", padding: '0px',marginLeft:"25px" }} key={index}>
                                <span type="button" onClick={() => clickHandler(e)} style={{ background: "none", color: "#495057", padding: '2px' }}>{e.full_name}</span>
                            </li>
                        ))
                        }
                    </ul>
                </Row>
                }
            </Form>
        </>
    );
};
