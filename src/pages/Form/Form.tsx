import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Product } from "../../interfaces/Product";
import instance from "../../api/index";
import { ProductContext } from "../../Context/ProductContext";
import { Category } from "../../interfaces/Category";
import productSchema from "../../utils/productSchema";
import ImageUploader from "../Home/ImageUploader";

const Form = () => {
  const { id } = useParams();
  const [categories, setCategories] = useState([] as Category[]);
  const { handleProduct } = useContext(ProductContext);
  const [cateSelected, setCateSelected] = useState({} as Category);
  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm<Product>({
    resolver: zodResolver(productSchema),
  });

  const [productImage, setProductImage] = useState<string>("");

  const handleImageChange = (newImage: string) => {
    setProductImage(newImage);
  };

  useEffect(() => {
    if (id) {
      (async () => {
        const { data } = await instance.get(`/products/${id}`);
        console.log(data);
        setCateSelected(data.data.category);
        reset(data.data);
      })();
    }
  }, [id, reset]);

  const onSubmit = async (product: Product) => {
    try {
      console.log(product);
      const updatedProduct = { ...product, thumbnail: productImage };
      handleProduct(updatedProduct);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      const { data } = await instance.get("/categories");
      setCategories(data.data);
    })();
  }, []);
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
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            id="category"
            className="form-control"
            {...register("category")}
          >
            {categories.map((category) =>
              cateSelected._id == category._id ? (
                <option key={category._id} value={category._id} selected>
                  {category.name}
                </option>
              ) : (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              )
            )}
          </select>
        </div>

        <div className="mb-3">
          <ImageUploader
            initialImage={productImage}
            onImageChange={handleImageChange}
          />
        </div>

        {productImage && <img src={productImage} />}
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
