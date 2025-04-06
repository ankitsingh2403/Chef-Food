import {configureStore} from "@reduxjs/toolkit"
import cartReducer from "./cartSlice"; 


const store = configureStore({
    reducer: {
        cart: cartReducer,
    }

});

export default store;

/** 
 *   Create Store
//    - configureStore() - RTK 
*   Provide my store to app
*    -<Provider store ={store}>  -- import from react-redux

*  Slice
*   -createSlice({
        name: "",
        intialState:,
        reducers: {
         additems : (state,action) => {state=action.payload}
        }
})  --RTK
  export const {addItem,removeItem} = cartSlice.actions;
  export default cartSlice.reducer;


  * Put that slice into the store
  {
    reducer:{
        cart:cartSlice,
        user:userSlice,
    }
  }

*/
