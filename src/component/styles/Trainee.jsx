import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const GenerateRow = ({ trainee }) => {
  async function deleteTraineeConfirm(id) {
    let result = await Swal.fire({
      title: "Are you sure you want to delete?",
      text: "Trainee Will be Deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    });
    if (result.isConfirmed) {
      delTrainee(id);
      Swal.fire({
        title: "Deleted",
        text: "Trainee is Deleted",
        icon: "success",
      });
    }
  }

  const navigate = useNavigate();
  function delTrainee(id) {
    axios.delete(`http://localhost:5000/trainees/${id}`);
    navigate('/');
  }
  // console.log(trainee);
  // const {trainee} = trainee;

  return (
    <tr>
      <td>{trainee.id}</td>
      <td>{trainee.name}</td>
      <td>{trainee.degree}</td>
      <td className="edit-cell">
        <Link to={`/trainees/update-trainees/${trainee.id}`} className="edit-btn">
          Edit
        </Link>
      </td>
      <td className="del-cell">
        <button
          className="del-btn"
          onClick={() => {
            deleteTraineeConfirm(trainee.id);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default GenerateRow;
