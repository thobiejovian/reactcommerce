import React from 'react';
import { shallow, mount } from 'enzyme';
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";
import {store} from "../../../redux/store";

import { CartDropdown }  from '../cart-dropdown.component';
import CartItem from '../../cart-item/cart-item.component';
import { toggleCartHidden } from '../../../redux/cart/cart.actions';

import cartItemsMocks from "../../../../mocks/cartItemsMocks.json";
describe('CartDropdown component', () => {
    let wrapper;
    let mockHistory;
    let mockDispatch;
    const mockCartItems = cartItemsMocks;

    beforeEach(() => {
        mockHistory = {
            push: jest.fn()
        };

        mockDispatch = jest.fn();

        const mockProps = {
            cartItems: mockCartItems,
            history: mockHistory,
            dispatch: mockDispatch
        };

        wrapper = mount(
            <Provider store={store}>
                <Router>
                    <CartDropdown {...mockProps} />
                </Router>
            </Provider>);
    });

    it('should render CartDropdown component without error', () => {
        expect(wrapper.debug()).toMatchSnapshot();
    });

    it('should call history.push when button is clicked', () => {
        wrapper.find('CustomButton').simulate('click');
        expect(mockHistory.push).toHaveBeenCalled();
    });

    it('should render an equal number of CartItem components as the cartItems prop', () => {
        expect(wrapper.find('CartItem').length).toEqual(mockCartItems.length);
    });

    it('should render empty message if cartItems is empty', () => {
        const mockProps = {
            cartItems: [],
            history: mockHistory,
            dispatch: mockDispatch
        };
        const newWrapper = mount(
            <Provider store={store}>
                <Router>
                    <CartDropdown {...mockProps} />
                </Router>
            </Provider>);
        expect(newWrapper.exists('.empty-message')).toBe(true);
        expect(newWrapper.debug()).toMatchSnapshot();
    });
});