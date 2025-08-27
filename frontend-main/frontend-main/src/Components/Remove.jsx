import axios from 'axios';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';




export default function Remove() {

    const navigation = useNavigate();
    const [response, setResponse] = useState([]);

    async function handleRemoveProduct(productId) {
        try {
            await axios.delete(`https://backend2-2te4.onrender.com/removeProduct/${productId}`);
            alert('Product removed successfully');
            window.location.reload();
        } catch (error) {
            console.error('Error removing product:', error);
            alert('Failed to remove product. Please try again.');
        }
    }
    async function fetchProducts() {
        const res = await axios.get('https://backend2-2te4.onrender.com/products');
        setResponse(res.data);
        console.log(res.data);
    }
    useEffect(() => {
        fetchProducts()
    }, []);
    
    
    return (
        <div>
        <h1 className="text-3xl font-medium text-slate-800 text-center mb-2 font-poppins">New Arrivals</h1>
        <section className="flex flex-wrap items-center justify-center mt-10 gap-8">
            {response.map((product, idx) => (
                <a className='group w-72 cursor-pointer' key={idx}>
                    <img
                        className='rounded-lg w-full group-hover:shadow-xl hover:-translate-y-0.5 duration-300 transition-all h-72 object-cover object-top'
                        src={product.url}
                        alt="https://images.unsplash.com/photo-1598554747436-c9293d6a588f?q=80&w=500&auto=format&fit=crop"
                    />
                    <p className='text-sm mt-2'>{product.name}</p>
                    <p className='text-xl'>{product.price}</p>
                    <button onClick={() => handleRemoveProduct(product._id)} className='mt-2 bg-red-500 text-white px-4 py-2 rounded'>Remove</button>
                </a>
            ))}
        </section>
        </div>
    );
};