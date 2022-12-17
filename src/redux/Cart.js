import * as ActionTypes from './ActionTypes';

export const Cart = (state = {
        isLoading: false,
        errMess: null,
        cart: [{
            "id": 1732,
            "name": "Stripe crew knit",
            "link": "https://jufy.shaktisaurav.com/product/stripe-crew-knit/",
            "regularPrice": 420,
            "price": 420,
            "storeName": "FokatBaba",
            "image": "https://jufy.shaktisaurav.com/wp-content/uploads/2021/02/1-38.jpg",
            "qty": 1
        }],
        total : 80,
        currency: '₹'
    }, action) => {
    switch(action.type) {
        
        case ActionTypes.ADD_TO_CART:
            const item = state.cart.find(
                product => product.id === action.payload.id,
            );
            if (item) {
                return {
                  ...state, isLoading: false,
                  cart: state.cart.map(item => item.id === action.payload.id
                    ? {
                      ...item,
                      qty: item.qty + 1,
                    }
                    : item
                  ),
                  total: +state.total + +action.payload.price
                };
            }
            var product = {
                id : action.payload.id,
                name : action.payload.name,
                link : action.payload.permalink,
                regularPrice: +action.payload.regular_price,
                price: +action.payload.price,
                storeName: action.payload.store.store_name,
                image: action.payload.images[0].src,
                qty: 1,
            }
            return {
                ...state, isLoading: false,
                cart: [...state.cart, product],
                total: +state.total + +product.price
            };
        case ActionTypes.CART_LOADING:
            return {...state, isLoading:true, errMess:null};
        
        case ActionTypes.CART_FAILED:
            return {...state, isLoading:false, errMess:action.payload};
            
        case ActionTypes.CLEAR_CART:
            return {...state, isLoading:false, cart:[], total: 0}
        default:
            return state;
    }
}