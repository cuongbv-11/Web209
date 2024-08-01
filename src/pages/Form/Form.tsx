import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Product } from "../../interfaces/Product";
import { instance } from "../../api/api";
import { useStore } from "../../Context/StoreContext";

const schema = z.object({
  title: z.string().min(6),
  price: z.number().min(0),
  description: z.string().optional(),
  thumbnail: z.string().optional(),
});

const Form = () => {
  const cloud_name = "dbzb6a9g3";
  const preset_key = "upload";
  const [image, setImage] = useState();
  const uploadImage = async (e: any) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    setImage(data.url);
    console.log(data);
    return data.url;
  };
  const { id } = useParams();

  const nav = useNavigate();
  const { onSubmitProduct } = useStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Product>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (id) {
      (async () => {
        const { data } = await instance.get(`/products/${id}`);
        reset(data.data);
      })();
    }
  }, [id, reset]);

  const onSubmit = async (data: Product) => {
    await onSubmitProduct({ ...data, id });
    nav("/admin");
  };

  return (
    <div className="login-popup">
      <form onSubmit={handleSubmit(onSubmit)} className="login-popup-container">
        <h1>{id ? "Update" : "Add"}</h1>
        <div className="login-popup-title">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            className="form-control"
            type="text"
            placeholder="Title"
            {...register("title", { required: true })}
          />
          {errors.title && <span>{errors.title.message}</span>}
        </div>

        <div className="login-popup-inputs">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            className="form-control"
            type="number"
            placeholder="Price"
            {...register("price", { required: true, valueAsNumber: true })}
          />
          {errors.price && <span>{errors.price.message}</span>}
        </div>

        <div className="login-popup-inputs">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            cols={100}
            rows={3}
            placeholder="Description"
            {...register("description")}
          />
          {errors.description && <span>{errors.description.message}</span>}
        </div>
        <div className="login-popup-inputs">
          <label htmlFor="thumbnail" className="form-label">
            Thumbnail
          </label>
          <input type="file" className="form-control" onChange={uploadImage} />
          <input
            type="text"
            className="form-control"
            defaultValue={image}
            {...register("thumbnail")}
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
