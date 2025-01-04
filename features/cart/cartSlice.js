import { createSlice } from "@reduxjs/toolkit";



export const cartSlice= createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        totalPrice: 0
    },
    reducers: {
        addToCart: (state, action) => {
            // Generate a unique key for the item
            const uniqueKey = JSON.stringify(
                Object.keys(action.payload)
                    .filter((key) => key !== "quantity") // Exclude quantity from key generation
                    .sort() // Ensure consistent ordering of keys
                    .reduce((acc, key) => {
                        acc[key] = action.payload[key];
                        return acc;
                    }, {})
            );

            // Find if an item with the same unique key exists in the cart
            const cartItem = state.cart.find((item) => item.uniqueKey === uniqueKey);

            if (cartItem) {
                // Increment quantity if the item exists
                cartItem.quantity++;
            } else {
                // Add the new item to the cart with its unique key
                state.cart.push({ ...action.payload, uniqueKey, quantity: 1 });
            }

            // Update the total price
            state.totalPrice = state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
        },

        removeFromCart: (state, action) => {
            // Remove the item based on its unique key
            const ItemsInCart = state.cart.filter((item) => item.uniqueKey !== action.payload.uniqueKey);
            state.cart = ItemsInCart;

            // Update the total price
            state.totalPrice = state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
        },

        incrementQuantity: (state, action) => {
            // Increment quantity based on the unique key
            const cartItem = state.cart.find((item) => item.uniqueKey === action.payload.uniqueKey);
            if (cartItem) {
                cartItem.quantity++;
            }

            // Update the total price
            state.totalPrice = state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
        },

        decrementQuantity: (state, action) => {
            // Decrement quantity or remove item based on the unique key
            const cartItem = state.cart.find((item) => item.uniqueKey === action.payload.uniqueKey);
            if (cartItem) {
                if (cartItem.quantity === 1) {
                    // Remove the item if quantity is 1
                    const ItemsInCart = state.cart.filter((item) => item.uniqueKey !== cartItem.uniqueKey);
                    state.cart = ItemsInCart;
                } else {
                    // Decrement the quantity otherwise
                    cartItem.quantity--;
                }
            }

            // Update the total price
            state.totalPrice = state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
        },
        
        emptyCart: (state) => {
            state.cart = [];
            state.totalPrice = 0;
        },
    }
})


export const {emptyCart,addToCart,removeFromCart,incrementQuantity,decrementQuantity}= cartSlice.actions;

export default cartSlice.reducer;