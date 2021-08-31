import { ADD_TO_BAG, SET_PRODUCTS } from "../action-types";

const initialState = {
    users: null,
    products: null,
    bag: []
}

const reducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch(type){
        case SET_PRODUCTS: {
            return {
                ...state,
                products: payload
            }
        }
        case ADD_TO_BAG: {
            const bag = [...state.bag];
            const products = [];
            for (const item of state.products) {
                if (item.id === payload.id) {
                    if (item.count > payload.count) {
                        products.push({...item, count: item.count - payload.count});
                    }
                } else {
                    products.push(item);
                }
            }
            const item = bag.find((product) => product.id === payload.id);
            if (item) {
                item.count += payload.count;
            } else {
                bag.push(payload);
            }
           
            return {
                ...state,
                bag,
                products
            }
        }
        default: {
            return state;
        }
    }
}

export default reducer;