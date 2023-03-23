import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function AddEditTrainee() {
  const navigate = useNavigate();
  let { traineeid } = useParams();

  var updateTrainee = async () => {
    console.log("atgfh");
    var { data } = await axios.get(
      `http://localhost:5000/trainees/${traineeid}`
    );
    console.log(data);
    setValue("name", data.name);
    setValue("degree", data.degree);
  };

  // console.log(data);

  useEffect(() => {
    if (traineeid) {
      updateTrainee();
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  async function onSubmit({ id, name, degree }) {
    if (traineeid) {
      Swal.fire({
        title: "Updated",
        text: "Trainee Delails Updated",
        icon: "succe ss",
      });
      await axios.put(`http://localhost:5000/trainees/${id}`, {name, degree});
      navigate("/trainees");
    }
    else{
      Swal.fire({
        title: "Added",
        text: "Trainee Added",
        icon: "success",
      });
      await axios.post("http://localhost:5000/trainees", { id, name, degree });
      navigate("/trainees");
    }
  }

  return (
    <div className="container">
      <h2>{traineeid ? "Edit Trainee Detail" : "Add Trainee"}</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        
        {traineeid ? <div>
          <h3>Edit Details for Trainee Id: <span className="chip-container">{traineeid}</span></h3>
        </div>:
        <div>
           <label htmlFor="id" className="inputLabel">Id</label><input
            type="number"
            className="inputTag"
            {...register("id", {
              required: "This is required.",
            })}
            placeholder="Enter Trainee Id"
          />
                
          <ErrorMessage
            errors={errors}
            render={({ message }) => <p className="errorMsg">{message}</p>}
          />
        </div> 
        }
         <label htmlFor="name" className="inputLabel">Name</label><input
          type="text"
          className="inputTag"
          {...register("name", {
            required: "This is required.",
            minLength: {
              value: 2,
              message: "Minimum 2 character is required",
            },
          })}
          placeholder="Enter Trainee Name"
        />
              
        <ErrorMessage
          errors={errors}
          name="name"
          render={({ message }) => <p className="errorMsg">{message}</p>}
        />
              
         <label htmlFor="degree" className="inputLabel">Degree</label><input
          type="text"
          className="inputTag"
          {...register("degree", {
            required: "This is required.",
            minLength: {
              value: 2,
              message: "Minimum 2 character is required",
            },
          })}
          placeholder="Enter Trainee Degree Name"
        />
              
        <ErrorMessage
          errors={errors}
          name="degree"
          render={({ message }) => <p className="errorMsg">{message}</p>}
        />
              
        <button className="submitBtn" type="submit">
          {traineeid? "Update" : "Add"} Trainee
        </button>
            
      </form>
    </div>
  );
}
