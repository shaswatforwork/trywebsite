import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function Checkout() {

    const [cartItems, setCartItems] = React.useState([]);
    const [totalAmount, setTotalAmount] = React.useState(0);
    const navigation = useNavigate()

    function fetchCartItems() {
        if(!localStorage.getItem('userId')){
            navigation('/login')
        }else{
        axios.get(`https://backend2-2te4.onrender.com/getCart/${localStorage.getItem('userId')}`, {  
        }).then((res) => {
            if (res.data.status === 'ok') {
                console.log('Cart items fetched successfully:', res.data.cart);
                setCartItems(res.data.cart);
                setTotalAmount(res.data.cart.reduce((total, item) => total + (item.price * 1), 0));
                localStorage.setItem('cartLength', res.data.cart.length);
                console.log(cartItems);
            } else {
                console.log('Error fetching cart items:', res.data.error);
            }
        }).catch((error) => {
            console.error('Error during fetching cart items:', error);
            alert('An error occurred while fetching cart items. Please try again.');
        });
    }

}

function newOrder() {
    const orderData = {
        name: localStorage.getItem('user') || 'Guest',
        items: cartItems,
        address: {
            firstName: "John",
            lastName: "Doe",
            street: "123 Main St",
            city: "New York",
            state: "NY",
            zipcode: "10001",
            country: "USA"
        },
        price: totalAmount + 0.02 * totalAmount,
        author: localStorage.getItem('userId'),
        date: new Date(),
    };
    navigation('/address', { state: { order: orderData } });
    setCartItems([]);
    setTotalAmount(0);
    // axios.post('http://localhost:8080/newOrder', orderData).then((res)=>{
    //   if(res.data.status === 'ok'){
    //     alert('Order placed successfully');
    //     // Clear cart after order placement
    //     setCartItems([]);
    //     setTotalAmount(0);
    //     localStorage.setItem('cartLength', 0);
    //     navigation('/orders');
    //     }else{
    //     console.log('Order placement failed:', res.data.error);
    //     alert('Order placement failed');
    //     }
    // }).catch((error) => {
    //   console.error('Error during order placement:', error);
    //     alert('An error occurred during order placement. Please try again.');
    // });
}


    function handleRemoveFromCart(itemId) {
        axios.delete(`http://localhost:8080/removeCart/${itemId}`, {})
            .then((res) => {
                if (res.data.status === 'ok') {
                    window.location.reload();
                setCartItems(cartItems.filter(item => item._id !== itemId));
                localStorage.setItem('cartLength', cartItems.length );
                } else {
                    alert('Failed to remove item from cart');
                }
            })
            .catch((error) => {
                console.error('Error during removing from cart:', error);
                alert('An error occurred while removing item from cart. Please try again.');
            });
    }


useEffect(() => {
    fetchCartItems();
}, []);

    if(cartItems.length === 0){
        return(
            <div className="flex flex-col items-center justify-center h-screen">
                <h2 className="text-2xl font-semibold mb-4">Your Cart is Empty</h2>
                <p className="text-gray-600">Looks like you haven't added anything to your cart yet.</p>
                <Link to={'/'}>
                <button className="cursor-pointer mt-6 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition">
                    Start Shopping
                </button></Link>
            </div>
        )
    }


    return (
        <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
            <div className='flex-1 max-w-4xl'>
                <h1 className="text-3xl font-medium mb-6">
                    Shopping Cart <span className="text-sm text-indigo-500">{cartItems.length} Items</span>
                </h1>

                <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                    <p className="text-left">Product Details</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center">Action</p>
                </div>

                {cartItems.map((product, index) => (
                    <div key={index} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">
                        <div className="flex items-center md:gap-6 gap-3">
                            <div className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden">
                                <img className="max-w-full h-full object-cover" src={product.url} alt={product.name} />
                            </div>
                            <div>
                                <p className="hidden md:block font-semibold">{product.name}</p>
                                <div className="font-normal text-gray-500/70">
                                    <div className='flex items-center'>
                                        {/* <p>Qty:</p>
                                        <select className='outline-none'>
                                            {Array(5).fill('').map((_, index) => (
                                                <option key={index} value={index + 1}>{index + 1}</option>
                                            ))}
                                        </select> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-center">₹{product.price }</p>
                        <button className="cursor-pointer mx-auto" onClick={() => handleRemoveFromCart(product._id)}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0" stroke="#FF532E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>)
                )}
                <Link to={'/'}>
                <button className="group cursor-pointer flex items-center mt-8 gap-2 text-indigo-500 font-medium">
                    <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1" stroke="#615fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Continue Shopping
                </button></Link>

            </div>

            <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
                <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
                <hr className="border-gray-300 my-5" />

                <div className="mb-6">
                    {/* <p className="text-sm font-medium uppercase">Delivery Address</p>
                    <div className="relative flex justify-between items-start mt-2">
                        <p className="text-gray-500">No address found</p> */}
                        {/* <button onClick={() => setShowAddress(!showAddress)} className="text-indigo-500 hover:underline cursor-pointer">
                            Change
                        </button> */}
                        {/* {showAddress && (
                            <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                                <p onClick={() => setShowAddress(false)} className="text-gray-500 p-2 hover:bg-gray-100">
                                    New York, USA
                                </p>
                                <p onClick={() => setShowAddress(false)} className="text-indigo-500 text-center cursor-pointer p-2 hover:bg-indigo-500/10">
                                    Add address
                                </p>
                            </div>
                        )} */}
                    {/* </div> */}

                    <p className="text-sm font-medium uppercase mt-6">Payment Method : Online</p>

                
                </div>

                <hr className="border-gray-300" />

                <div className="text-gray-500 mt-4 space-y-2">
                    <p className="flex justify-between">
                        <span>Price</span><span>{totalAmount}</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Shipping Fee</span><span className="text-green-600">Free</span>
                    </p>
                    <p className="flex justify-between">
                        <span>PG Charges (2%)</span><span>{0.02* totalAmount}</span>
                    </p>
                    <p className="flex justify-between text-lg font-medium mt-3">
                        <span>Total Amount:</span><span>{totalAmount + 0.02 * totalAmount}</span>
                    </p>
                </div>

                <button className="w-full py-3 mt-6 cursor-pointer bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition" onClick={() => newOrder()}>
                    Place Order
                </button>
            </div>
        </div>
    )
}