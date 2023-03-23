import axios from 'axios';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Product = ({data}) => {
    console.log(data);

    const navigate = useNavigate();

const delConfirm = async (id) =>{
    let result = await Swal.fire({
        title: 'Are you sure you want to delete?',
        text: "Product will be Removed!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Delete it!",
    })
    if(result.isConfirmed){
        deleteProduct(id);
        Swal.fire({
            title: "Deleted",
            text: "Product is removed",
            icon: "success"
        })
    }
}

async function deleteProduct(id){
    // console.log(id);
    await axios.delete(`http://localhost:5000/products/${id}`);
    navigate('/');
}
  return (
        <tr>
            <td>{data.id}</td>
            <td><img src={data.img} width="100px" alt={`${data.brand}_shoes`} loading="lazy"></img></td>
            <td>{data.name}</td>
            <td>{data.Brand}</td>
            <td><span>₹</span>{data.price}</td>
            <td className='edit-cell'><Link className='edit-btn' to={`/products/update-product/${data.id}`}>Edit</Link></td>
            <td className='del-cell'><button className='del-btn' onClick={()=>delConfirm(data.id)}>Delete</button></td>
        </tr>
  )
}

export default Product