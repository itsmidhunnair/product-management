import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

export default function AddTrainee() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit({ id, name, degree }) {
    Swal.fire({
      title: "Added",
      text: "Trainee Added",
      icon: "success",
    });
    await axios.post("http://localhost:5000/trainees", { id, name, degree });
    navigate("/trainees");
  }

  return (
    <div className="container">
      <h2>Add Trainee</h2>
          
      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
              
        <input
          type="number"
          className="inputTag"
          name="id"
          {...register("id", {
            required: "This is required.",
          })}
          placeholder="Enter Trainee Id"
        />
              
        <ErrorMessage
          errors={errors}
          name="id"
          render={({ message }) => <p className="errorMsg">{message}</p>}
        />
              
        <input
          type="text"
          className="inputTag"
          name="name"
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
              
        <input
          type="text"
          className="inputTag"
          name="degree"
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
          Add Trainee
        </button>
            
      </form>
    </div>
  );
}
