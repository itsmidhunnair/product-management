import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddProducts = () => {
  const {
    register,
    handleSubmit,
    setValue
  } = useForm();

  const navigate = useNavigate();
  const {productid} = useParams();
  const [prodData, setData] = useState([]);

  const [img, setimg] = useState("");

  let data;

  const getData = async () => {
    data =  await axios.get(`http://localhost:5000/products/${productid}`);
    setData(data.data);
    setValue("id",data.data.id);
    setValue("img",data.data.img);
    setValue("name",data.data.name);
    setValue("Brand",data.data.Brand);
    setValue("price",data.data.price);
  }

  // console.log(prodData);

  useEffect(() => {
    if (productid) {
      getData();
    }
  },[])

  async function updateImg(e){
    setimg(e.target.value);
  }

  async function onsubmit({img, name, Brand, price}){
    if (productid) {
      await axios.put(`http://localhost:5000/products/${productid}`,{img,name,Brand,price})
      Swal.fire({
        title: "Updated",
        text: "Product Delails Updated",
        icon: "success",
      });
      navigate('/products');
    }
    else{
      await axios.post('http://localhost:5000/products',{img, name, Brand, price});
      Swal.fire({
        title: "Added",
        text: "Product Added",
        icon: "success",
      });
      navigate('/products');
      // console.log(data);
    }
  }

  return (
    <>
      <div className='container'>
        <h2>{productid? "Update Product":"Add Products"}</h2>
          <form onSubmit={handleSubmit(onsubmit)} className='form-container'>
            <label htmlFor="id"></label>
            {productid ?
            <div className='dflex space-between align-center'>
              <div>
                <h3>Edit Details for Product Id: <span className="chip-container">{prodData.id}</span></h3>
              </div>
              <div>
                <img src={prodData.img} alt={prodData.Brand} width="200px"/>
              </div>
            </div>:
            <div>
              <div className='dflex space-between align-center'>
                <div>
                  <label htmlFor="id" className="inputLabel">Id</label>
                  <input
                    type="number"
                    className="inputTag"
                    {...register("id", {
                      required: "This is required.",
                    })}
                    placeholder="Enter Product Id"
                  />
                </div>
                <div>
                <img src={img} alt="product_img" width="100px"/>
              </div>
              </div>
            </div>}
            <label htmlFor="imgLink" className="inputLabel">Enter Image URL</label>
            <input
                type="text"
                className="inputTag"
                {...register("img", {
                  required: "This is required.",
                })}
                placeholder="http://random-domain.tld/img.jpg"
                onChange={(e)=>updateImg(e)}
              />
            <label htmlFor="name" className="inputLabel">Enter Product Name</label>
            <input
                type="text"
                className="inputTag"
                {...register("name", {
                  required: "This is required.",
                })}
                placeholder="Name"
              />
            <label htmlFor="Brand" className="inputLabel">Enter Product Brand</label>
            <input
                type="text"
                className="inputTag"
                {...register("Brand", {
                  required: "This is required.",
                })}
                placeholder="Brand"
              />
            <label htmlFor="price" className="inputLabel">Enter Product Price</label>
            <div>
              <span>₹</span>
            <input
                type="number"
                className="inputTag"
                {...register("price", {
                  required: "This is required.",
                })}
                placeholder="000"
              />
            </div>
              <button className="submitBtn">{productid?"Update":"Add"} Product</button>
          </form>
      </div>
    </>
  )
}

export default AddProducts