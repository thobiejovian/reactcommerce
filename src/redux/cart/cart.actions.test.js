import CartActionTypes from './cart.types';
import {
    toggleCartHidden,
    addItem,
    reduceItem,
    removeItemFromCart
} from './cart.actions';

describe('toggleCartHidden action', () => {
    it('should create the toggleHidden action', () => {
        expect(toggleCartHidden().type).toEqual(CartActionTypes.TOGGLE_CART_HIDDEN);
    });
});

describe('addItem action', () => {
    it('should create the addItem action', () => {
        const mockItem = {
            id: 1
        };

        const action = addItem(mockItem);

        expect(action.type).toEqual(CartActionTypes.ADD_ITEM);
        expect(action.payload).toEqual(mockItem);
    });
});

describe('removeItem action', () => {
    it('should create the removeItem action', () => {
        const mockItem = {
            id: 1
        };

        const action = reduceItem(mockItem);

        expect(action.type).toEqual(CartActionTypes.REDUCE_ITEM);
        expect(action.payload).toEqual(mockItem);
    });
});

describe('clearItemFromCart action', () => {
    it('should create the clearItemFromCart action', () => {
        const mockItem = {
            id: 1
        };

        const action = removeItemFromCart(mockItem);

        expect(action.type).toEqual(CartActionTypes.REMOVE_ITEM_FROM_CART);
        expect(action.payload).toEqual(mockItem);
    });
});
