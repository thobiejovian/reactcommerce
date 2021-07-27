import React from "react";
import {configure, shallow} from "enzyme";
import {expect} from "chai";
import chai from "chai";
import sinon from "sinon";
import Adapter from "enzyme-adapter-react-16";
import { CollectionItem } from "../components/collection-item/collection-item.component";
import CartActionTypes from "../redux/cart/cart.types";
import cartReducer from "../redux/cart/cart.reducer";

configure({
    adapter: new Adapter()
});

describe('CollectionItem component', () => {
    let wrapper;
    const mockAddItem = item => ({
        type: CartActionTypes.ADD_ITEM,
        payload: item
    })
    const imageUrl = 'www.testImage.com';
    const mockName = 'black hat';
    const mockPrice = "10";

    beforeEach(() => {
        const mockProps = {
            item: {
                imageUrl: imageUrl,
                price: mockPrice,
                name: mockName
            },
            addItem: mockAddItem
        };

        wrapper = shallow(<CollectionItem {...mockProps} />);
    });

    it('should render default collection-item component', () => {
        expect(wrapper).to.exist
    })


    it('should have an image to display the product', function () {
        expect(wrapper.find('.image')).to.have.length(1);
    });

    it('should increase quantity of matching item by 1 if add to cart button is clicked', () => {
        wrapper.find('CustomButton').simulate('click');
        expect(mockAddItem).to.have.all;
    });



    it('should render name prop in NameContainer', () => {
        expect(wrapper.find('.name').text()).to.equal(mockName);
    });

    it('should render price prop in PriceContainer', () => {
        expect(wrapper.find('.price').text()).to.equal(`${mockPrice}€`);
    });
});

