import React from "react";
import {configure, shallow} from "enzyme";
import {expect} from "chai";
import Adapter from "enzyme-adapter-react-16";
import sinon from "sinon";

import {CartItem} from "../components/cart-item/cart-item.component";
import {CartDropdown} from "../components/cart-dropdown/cart-dropdown.component";
import {toggleCartHidden} from "../redux/cart/cart.actions";

configure({
    adapter: new Adapter()
});


describe('CartDropdown component', () => {
    let wrapper;
    let mockHistory;
    let mockDispatch;
    const spy = sinon.spy();
    const mockCartItems = [{ id: 1 }, { id: 2 }, { id: 3 }];

    beforeEach(() => {
        mockHistory = {
            push: spy
        };

        mockDispatch = spy

        const mockProps = {
            cartItems: mockCartItems,
            history: mockHistory
        };

        wrapper = shallow(<CartDropdown {...mockProps} />);
    });

    it('should render CartDropdown component', () => {
        expect(wrapper).to.exist
    });

    it('should call history.push when button is clicked', () => {
        wrapper.find('CustomButton').simulate('click');
        expect(spy.calledOnce).to.be.true;
    });

    it('should render an equal number of CartItem components as the cartItems prop', () => {
        expect(wrapper.find('CartItem').length).to.equal(mockCartItems.length);
    });

    it('should render EmptyMessageContainer if cartItems is empty', () => {
        const mockProps = {
            cartItems: [],
            history: mockHistory,
            dispatch: mockDispatch
        };

        const newWrapper = shallow(<CartDropdown {...mockProps} />);
        expect(newWrapper.find('.empty-message').length === 1).to.be.ok;
    });
});
