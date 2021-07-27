import React from "react";
import {configure, shallow} from "enzyme";
import {expect} from "chai";
import Adapter from "enzyme-adapter-react-16";

import CartActionTypes from '../redux/cart/cart.types';
import cartReducer from '../redux/cart/cart.reducer';

configure({
    adapter: new Adapter()
});


const initialState = {
    hidden: true,
    cartItems: []
};

describe('cartReducer', () => {
    it('should return initial state', () => {
        expect(cartReducer(undefined, {})).to.eql(initialState);
    });

    it('should toggle hidden with toggleHidden action', () => {
        expect(
            cartReducer(initialState, { type: CartActionTypes.TOGGLE_CART_HIDDEN })
                .hidden
        ).to.be.false;
    });
    it('should increase quantity of matching item by 1 if addItem action fired with same item as payload', () => {
        const mockItem = {
            id: 1,
            quantity: 2
        };

        const mockPrevState = {
            hidden: true,
            cartItems: [mockItem, { id: 2, quantity: 1 }]
        };

        expect(
            cartReducer(mockPrevState, {
                type: CartActionTypes.ADD_ITEM,
                payload: mockItem
            }).cartItems[0].quantity
        ).to.equal(3);
    });
    //
    it('should decrease quantity of matching item by 1 if removeItem action fired with same item as payload', () => {
        const mockItem = {
            id: 1,
            quantity: 3
        };

        const mockPrevState = {
            hidden: true,
            cartItems: [mockItem, {id: 2, quantity: 1}]
        };

        expect(
            cartReducer(mockPrevState, {
                type: CartActionTypes.REDUCE_ITEM,
                payload: mockItem
            }).cartItems[0].quantity
        ).to.equal(2);
    });
});