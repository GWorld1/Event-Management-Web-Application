/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { food_list, menu_list } from "../assets/assets";
import axios from "axios";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const url = "http://localhost:3000"
    const [event_list, setEventList] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("")
    const [loggedIn,setloggedIn] = useState(false)

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const fetchEventList = async () => {
        const response = await axios.get(url + "/api/events/");
        const data = response.data;
        console.log(data);
        setEventList(data)
    }

    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: token });
        setCartItems(response.data.cartData);
    }

    const logout =  async () =>{
        await axios.get('http://localhost:3000/api/auth/logout')
    }
    useEffect(() => {
        async function loadData() {
            await fetchEventList();
            // if (localStorage.getItem("token")) {
                
            //     //await loadCartData({ token: localStorage.getItem("token") })
            // }
        }
        async function validateToken(){
             console.log(localStorage.getItem('token'))
             setToken(localStorage.getItem('token'))
             await axios.post('http://localhost:3000/api/auth/token',{token:token})
            .then((res)=>{
                console.log(res.data);
                const {valid} = res.data
                setloggedIn(valid)
            }).catch((err)=>{
                console.error(err)
            })
           
        }
        loadData();
        validateToken();
       
    }, [token])


    const contextValue = {
        url,
        event_list,
        menu_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken,
        loadCartData,
        setCartItems,
        loggedIn,
        setloggedIn,
        logout
    };


    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}


export default StoreContextProvider;