import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Orders() {
    const [orders, setOrders] = useState([]);
    const navigation = useNavigate();


    function fetchOrders() {
        if(!localStorage.getItem('userId')){
            navigation('/login')
        }else{
        axios.get(`https://backend2-2te4.onrender.com/getOrders/${localStorage.getItem('userId')}`, {  
        }).then((res) => {
            if (res.data.status === 'ok') {
                console.log('Orders fetched successfully:', res.data.orders);
                setOrders(res.data.orders);
            } else {
                console.log('Error fetching orders:', res.data.error);
            }
        }).catch((error) => {
            console.error('Error during fetching orders:', error);
            alert('An error occurred while fetching orders. Please try again.');
        });
    }
    }

    useEffect(() => {
        fetchOrders();
    }, []);


    const boxIcon = "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/boxIcon.svg"

    if(orders.length === 0){
        return(
            <div className="flex flex-col items-center justify-center h-screen">
                <h2 className="text-2xl font-semibold mb-4">No Orders Found</h2>
                <p className="text-gray-600">You have not placed any orders yet.</p>
            </div>
        )   
    }

    return (
        <div className="md:p-10 p-4 space-y-4">
            <h2 className="text-lg font-medium">Orders List</h2>
            {orders.map((order, index) => (
                <div key={index} className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr] md:items-center gap-5 p-5 max-w-8xl rounded-md border border-gray-300 text-gray-800">
                    <div className="flex gap-5">
                        <img className="w-12 h-12 object-cover opacity-60" src={boxIcon} alt="boxIcon" />
                        <>
                            {order.items.map((item, index) => (
                                <div key={index} className="flex flex-col justify-center">
                                    <p className="font-medium">
                                        {item.name} <span className={`text-indigo-500 ${item.quantity < 2 && "hidden"}`}></span>
                                    </p>
                                </div>
                            ))}
                        </>
                    </div>

                    <div className="text-sm">
                        <p className='font-medium mb-1'>{order.address.firstName} {order.address.lastName}</p>
                        <p>{order.address.street}, {order.address.city}, {order.address.state},{order.address.zipcode}, {order.address.country}({order.address.mobile})</p>
                    </div>

                    <p className="font-medium text-base my-auto text-black/70">₹{order.price}</p>

                    <div className="flex flex-col text-sm">
                        <p>Method: Cash on Delivery</p>
                        <p>Date: {new Date(order.date).toLocaleString()}</p>
                        <p>Payment: Unpaid</p>
                        <p>Status: {order.status}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};