import { createSlice } from "@reduxjs/toolkit";


export const orderTrackingSlices = createSlice({
    name : 'orderTracker',
    initialState:{
        orderId: null,
        status: 'null',
    },
    reducers:{
        setPendingStatus: (state) => {
            state.status = "pending";
            console.log('Order status updated to:', state.status);
        },
        setCompleteStatus: (state) => {
            state.status = "complete";
        },
        setCancelledStatus: (state) => {
            state.status = "cancelled";
        },
        resetOrderStatus: (state) => {
            state.status = 'null';
            state.orderId = null;
        },
        setOrderId: (state, action) => {
            state.orderId = action.payload;
        },
        getOrderId: (state, action) => {
            return state.orderId;
        }

    }
})

export const { setCancelledStatus, setCompleteStatus ,setPendingStatus, resetOrderStatus, setOrderId, getOrderId } = orderTrackingSlices.actions;

export default orderTrackingSlices.reducer;