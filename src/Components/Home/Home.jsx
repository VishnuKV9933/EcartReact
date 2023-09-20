import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [currentPage,setCurrentPage]=useState(0)
    const [count,setCount]=useState(0)
    const [products,setProducts]=useState([])
    const token = Cookies.get('jwt'); 
    const navigate = useNavigate();

    useEffect(()=>{
      getProducts()
    },[currentPage])

    const logOut=()=>{
      localStorage.removeItem("userId");
      Cookies.remove('jwt');
      navigate('/login')
    }


    const getProducts=()=>{
      try {
        
        axios.get(`http://localhost:8000/api/auth/product/${currentPage}`, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  }).then((res)=>{
    setCount(res.data.totalDocuments)
    setProducts(res.data.products)
    console.log(res.data.products);
  })
      } catch (error) {
        console.log(error);
      }

    }

    const next=()=>{
      try {
        
        const limit=count/5
        if( currentPage < limit-2){
          setCurrentPage(currentPage+1)
        
          getProducts()
        }
      } catch (error) {
       console.log(error); 
      }
     
     
    }

    const previous=()=>{

      try {
        if(0 < currentPage){
          setCurrentPage(currentPage-1)
          getProducts()
        }
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <div className="bg-gray-100 min-h-screen ">
      {/* Header */}
      <header className="bg-blue-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">E-CART</h1>
          <button
          onClick={()=>logOut()}
          className="text-white hover:underline">Logout</button>
        </div>
      </header>

      {/* Product List */}
      <div className="container mx-auto mt-6 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4">
          {products.map((product) => (
            <div className='w-full flex justify-around items-center'>
            <div
              // key={product._id}
              className="bg-white p-4 shadow-md rounded-lg w-full lg:w-2/3"
            >
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-600 text-sm mt-2">
                {product.description}
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-bold">${product.price}</span>
                <span className="text-sm text-red-500">
                  ${product.discountPrice}
                </span>
              </div>
            </div>

            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="container mx-auto mt-6 flex justify-between items-center">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          onClick={()=>previous()}
        
        >
          Previous
        </button>
        <p className="text-gray-600">
          Page {currentPage+1} 
        </p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          onClick={()=>next()}
          
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;