import React, { useState, useEffect, useLayoutEffect } from "react"
import { useLocation } from 'react-router'
import { useDispatch, useSelector } from "react-redux"
import {
    PaymentElement, CardElement, CardNumberElement, CardExpiryElement,
    PaymentRequestButtonElement,
    CardCvcElement,
    Elements, useStripe,
    useElements
} from '@stripe/react-stripe-js';
import { useNavigate } from "react-router-dom"
import { Collapse, Select, DatePicker, Space, message, Spin } from 'antd';
import { isObjEmpty, removeEmojis } from "./utils"
import { addCardDetailsInitiate, updateCardDetailsState } from "../redux/actions/card"
import { getMemoizedcardData } from "../redux/selectors/card"

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            color: '#32325d',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
                color: '#aab7c4'
            }
        },
        // empty: {
        //     backgroundColor: 'red'
        // },
        invalid: {
            color: '#32325d',
            iconColor: '#fa755a',
            BorderColor: 'red'
        },
    },
};

const CVC_ELEMENT = {
    style: {
        base: {
            color: '#32325d',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
                color: '#aab7c4'
            }
        },
        // empty: {
        //     backgroundColor: 'red'
        // },
        invalid: {
            color: '#32325d',
            iconColor: '#fa755a',
            BorderColor: 'red'
        },
    },
};


const CheckoutForm = (props) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { state } = useLocation()

    const cardData = useSelector(getMemoizedcardData);
    const {
        addCardLoader,
        addCardSuccess,
        addCardData,
        removeCardDetailsLoader,
        removeCardDetailsSuccess
    } = cardData

    let errorsObj = {
        name: '',
        cardNumber: '',
        cardExpiry: '',
        cardCvc: ''
    }
    const [userName, setUserName] = useState('')
    const [errors, setErrors] = useState(errorsObj);

    const handleInputChange = (value) => {
        let data = value

        if (value.target.value[0] === " ") {
            data.target.value = data.target.value.trim()
            return setUserName(removeEmojis(data.target.value.trimLeft()))
        } else if (value.target.value == "") {
            setErrors(prevState => ({
                ...prevState,
                name: 'Please enter name.',
            }))
        } else if (value.target.value && value.target.value.length < 6) {
            setErrors(prevState => ({
                ...prevState,
                name: 'Name length should be atleast 6 characters long.',
            }))
        } else {
            setErrors(prevState => ({
                ...prevState,
                name: '',
            }))
        }

        return setUserName(removeEmojis(value.target.value.trimLeft()))

    }

    const handleCardChange = (event) => {
        console.log("this is event = ", event)
        if (event.error) {
            if (event.elementType == "cardNumber") {
                setErrors(prevState => ({
                    ...prevState,
                    cardNumber: event.error.message,
                }))
            } else if (event.elementType == "cardExpiry") {
                setErrors(prevState => ({
                    ...prevState,
                    cardExpiry: event.error.message,
                }))
            } else if (event.elementType == "cardCvc") {
                setErrors(prevState => ({
                    ...prevState,
                    cardCvc: event.error.message,
                }))
            }
        } else if (event && !event.complete) {
            console.log("this is event third = ", event)
        } else {
            console.log("this is event 2 = ", event)
            if (event.elementType == "cardNumber" && event.complete) {
                // console.log("card number = ", event)
                setErrors(prevState => ({
                    ...prevState,
                    cardNumber: '',
                }))
            } else if (event.elementType == "cardCvc" && event.complete) {
                setErrors(prevState => ({
                    ...prevState,
                    cardCvc: '',
                }))
            } else if (event.elementType == "cardExpiry" && event.complete) {
                setErrors(prevState => ({
                    ...prevState,
                    cardExpiry: '',
                }))
            }

        }
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("this ", event, "elements = ", elements)

        if (!userName) {
            return setErrors((prevState) => ({
                ...prevState,
                name: 'Please enter name.'
            }))
        }

        if (isObjEmpty(errorsObj)) {
            console.log("erros = = ", errorsObj)
            // await handleCardChange()

            if (!stripe || !elements) {
                // Stripe.js has not yet loaded.
                // Make sure to disable form submission until Stripe.js has loaded.
                return;
            }
            console.log(event.target)
            // For single Input
            // const card = elements.getElement(CardElement);

            // For Multiple Inputs
            const card = elements.getElement(CardNumberElement);



            if (card) {


                dispatch(updateCardDetailsState(true, 'addCardLoader'))
                console.log("the card = ", card)
                const result = await stripe.createToken(card)
                console.log("the result = ", result)
                props.onLoad(true)
                if (result.error) {
                    dispatch(updateCardDetailsState(false, 'addCardLoader'))
                    let message = result.error.message
                    // Inform the user if there was an error.
                    console.log("this is submit error = ", result)
                    if (result?.error?.param === 'number') {
                        return setErrors(prevState => ({
                            ...prevState,
                            cardNumber: result?.error?.message,
                        }))
                    }

                    // setErrors(message);
                    props.onLoad(false)
                } else {
                    // setErrors(null);
                    // Send the token to your server.
                    let data = {
                        token: result.token.id,
                        card: result.token.card,
                        name: userName
                    }
                    dispatch(addCardDetailsInitiate(data, props.detailType, props.currentData, navigate, state?.prevRoute ? state.prevRoute : null ))
                }

            } else {
                message.config({
                    maxCount: 1, duration: 0.9
                })
                message.error("error occured")
            }
        }
    }

    return (
        <div className="content-view">
            <form id='my-form' className="form" onSubmit={handleSubmit} >

                <div className="debit_card">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="text-input-filed">
                                <div className="first-div-item">
                                    <label>Name</label>
                                    <div className="spacert" style={{ width: '100%' }}>
                                        <input
                                            type="text"
                                            className="form-control text-filed "
                                            placeholder="Name on card"
                                            value={userName}
                                            maxLength={40}
                                            onChange={(e) => handleInputChange(e)}
                                            onKeyDown={(e) => {
                                                if (e.key === " " && e.target.value.length < 1) {
                                                    e.preventDefault();
                                                }
                                            }}
                                        />
                                        {(errors && errors.name) ? (
                                            <div class='color-error'>{errors.name}</div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="text-input-filed">
                                <div className="first-div-item">
                                    <label>Card Number</label>
                                    <div className="spacert" style={{ width: '100%' }}>
                                        {console.log("input errors = = = = ", errors)}
                                        <CardNumberElement
                                            options={CARD_ELEMENT_OPTIONS}
                                            id="card-element"
                                            placeholder="1213132"
                                            className='StripeElement'
                                            onChange={(e) => handleCardChange(e)}
                                            onReady={(status) => props.onLoad(false)}
                                        />
                                        {(errors && errors.cardNumber) ? (
                                            <div class='color-error'>{errors.cardNumber}</div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="text-input-filed">
                                <div className="first-div-item">
                                    <label>Expiry Date</label>
                                    <div className="spacert" style={{ width: '100%' }}>
                                        <CardExpiryElement
                                            options={CARD_ELEMENT_OPTIONS}
                                            id="card-element"
                                            className='StripeElement'
                                            onChange={(e) => handleCardChange(e)}

                                        />
                                        {(errors && errors.cardExpiry) ? (
                                            <div class='color-error'>{errors.cardExpiry}</div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="text-input-filed">
                                <div className="first-div-item">
                                    <label>CVV</label>
                                    <div className="spacert" style={{ width: '100%' }}>
                                        <CardCvcElement
                                            options={CVC_ELEMENT}
                                            id="card-element"
                                            className='StripeElement'
                                            onChange={(e) => handleCardChange(e)}
                                        />
                                        {(errors && errors.cardCvc) ? (
                                            <div class='color-error'>{errors.cardCvc}</div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
                <div className="text-center button-center">
                    <button
                        id="submit"
                        disabled={!stripe || addCardLoader}
                        type="submit"
                        class="button text"
                    >
                        {!addCardLoader ? "Add" : (<Spin />)}
                    </button>
                </div>
            </form >
        </div >
    )
}

export default CheckoutForm
