
import { useEffect } from 'react';

export const initialState = {
    basket: [],
    user: JSON.parse(localStorage.getItem("user")),
    address: {},
  };

  
  export const getBasketTotal = (basket) =>
    basket.reduce((amount, item) => item.price + amount, 0);
  
  const reducer = (state, action) => {
    console.log("action >>>>", action);
  
    switch (action.type) {
      case "ADD_TO_BASKET":
        return {
          ...state,
          basket: [...state.basket, action.item],
        };
      case "REMOVE_FROM_BASKET":
        const index = state.basket.findIndex(
          (basketItem) => basketItem.id === action.id
        );
  
        let newBasket = [...state.basket];
  
        if (index >= 0) {
          newBasket.splice(index, 1);
        } else {
          console.warn(`
            can't remove product whose id is ${index}
            `);
        }
  
        return {
          ...state,
          basket: newBasket,
        };
  
      case "SET_ADDRESS":
        return {
          ...state,
          address: { ...action.item },
        };
  
      case "SET_USER":
        return {
          ...state,
          user: action.user,
          
        };
        
  
      case "EMPTY_BASKET":
        return {
          ...state,
          basket: [],
        };
      default:
        return state;
    }
  };


  export const useUserInitialization = (dispatch) => {
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                dispatch({
                    type: "SET_USER",
                    user: parsedUser,
                });
            } catch (error) {
                console.error("Error parsing user from localStorage:", error);
                // Handle parsing error (e.g., clear invalid localStorage data)
                localStorage.removeItem("user");
            }
        }
    }, [dispatch]);

    // Function to update user and localStorage
    const setUserAndLocalStorage = (user) => {
        dispatch({
            type: "SET_USER",
            user: user,
        });
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user"); // Clear localStorage on logout
        }
    };

    return setUserAndLocalStorage;
};
  
  export default reducer;
  