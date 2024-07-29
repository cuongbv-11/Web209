import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";
import { Product } from "../../interfaces/Product";
import { instance } from "../../api/api";

type Props = {
  onSubmit: (data: Product) => void;
};
const schema = z.object({
  title: z.string().min(6),
  price: z.number().min(0),
  description: z.string().optional(),
});
const Form = ({ onSubmit }: Props) => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Product>({
    resolver: zodResolver(schema),
  });
  if (id) {
    useEffect(() => {
      (async () => {
        const { data } = await instance.get(`/products/${id}`);
        reset(data);
      })();
    }, [id]);
  }
  return (
    <div>
      <h1>{id ? "Update" : "Add"}</h1>
      <form onSubmit={handleSubmit((data) => onSubmit({ ...data, id }))}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            className="form-control"
            type="text"
            placeholder="Title"
            {...register("title", { required: true })}
          />
          {errors.title && <span>{errors.title.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            className="form-control"
            type="number"
            placeholder="Price"
            {...register("price", { required: true, valueAsNumber: true })}
          />
          {errors.price && <span>{errors.price.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            cols={100}
            rows={3}
            placeholder="Description"
            {...register("description", { required: true })}
          />
          {errors.description && <span>{errors.description.message}</span>}
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
