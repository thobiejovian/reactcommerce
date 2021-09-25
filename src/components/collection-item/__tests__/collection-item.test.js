import React from 'react';
import { shallow } from 'enzyme';

import { CollectionItem } from '../collection-item.component';

describe('CollectionItem component', () => {
    let wrapper;
    let mockAddItem;
    const imageUrl = 'www.testImage.com';
    const mockName = 'black hat';
    const mockPrice = 10;

    beforeEach(() => {
        mockAddItem = jest.fn();

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

    it('should render CollectionItem component', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should call addItem when AddButton clicked', () => {
        wrapper.find('CustomButton').simulate('click');
        expect(mockAddItem).toHaveBeenCalled();
    });

    it('should render imageUrl as a BackgroundImage', () => {
        expect(wrapper.find('.image')).toHaveLength(1);
    });

    it('should render name prop in NameContainer', () => {
        expect(wrapper.find('.name').text()).toBe(mockName);
    });

    it('should render price prop in PriceContainer', () => {
        const price = parseInt(wrapper.find('.price').text());
        expect(price).toBe(mockPrice);
    });
});