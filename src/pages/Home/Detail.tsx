import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { instance } from "../../api/api";
import { Product } from "../../interfaces/Product";

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  useEffect(() => {
    const getProduct = async () => {
      const { data } = await instance.get(`/products/${id}`);
      setProduct(data);
    };
    getProduct();
  }, []);
  return (
    <div>
      <section className="bg-light">
        <div className="container pb-5">
          <div className="row">
            <div className="col-lg-5 mt-5">
              <div className="card mb-3">
                <img
                  className="card-img img-fluid"
                  src={product?.thumbnail}
                  alt="Card image cap"
                  id="product-detail"
                ></img>
              </div>
              <div className="row">
                <div
                  id="multi-item-example"
                  className="col-10 carousel slide carousel-multi-item"
                  data-bs-ride="carousel"
                >
                  <div
                    className="carousel-inner product-links-wap"
                    role="listbox"
                  >
                    <div className="carousel-item active">
                      <div className="row">
                        <div className="col-4">
                          <a href="#">
                            <img
                              className="card-img img-fluid"
                              src={product?.thumbnail}
                              alt="Product Image 1"
                            ></img>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#">
                            <img
                              className="card-img img-fluid"
                              src={product?.thumbnail}
                              alt="Product Image 2"
                            ></img>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#">
                            <img
                              className="card-img img-fluid"
                              src={product?.thumbnail}
                              alt="Product Image 3"
                            ></img>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7 mt-5">
              <div className="card">
                <div className="card-body">
                  <h1 className="h2">{product?.title}</h1>
                  <p className="h3 py-2">{product?.price}</p>
                  <p className="py-2">
                    <i className="fa fa-star text-warning"></i>
                    <i className="fa fa-star text-warning"></i>
                    <i className="fa fa-star text-warning"></i>
                    <i className="fa fa-star text-warning"></i>
                    <i className="fa fa-star text-secondary"></i>
                    <span className="list-inline-item text-dark">
                      Rating 4.8 | 36 Comments
                    </span>
                  </p>
                  <ul className="list-inline">
                    <li className="list-inline-item">
                      <h6>Brand:</h6>
                    </li>
                    <li className="list-inline-item">
                      <p className="text-muted">
                        <strong>{product?.title}</strong>
                      </p>
                    </li>
                  </ul>

                  <h6>Description:</h6>
                  <p>{product?.description}</p>
                  <ul className="list-inline">
                    <li className="list-inline-item">
                      <h6>Avaliable Color :</h6>
                    </li>
                    <li className="list-inline-item">
                      <p className="text-muted">
                        <strong>White / Black</strong>
                      </p>
                    </li>
                  </ul>

                  <form action="" method="GET">
                    <input
                      type="hidden"
                      name="product-title"
                      value="Activewear"
                    ></input>

                    <div className="row pb-3">
                      <div className="col d-grid">
                        <button
                          type="submit"
                          className="btn btn-success btn-lg"
                          name="submit"
                          value="buy"
                        >
                          Buy
                        </button>
                      </div>
                      <div className="col d-grid">
                        <button
                          type="submit"
                          className="btn btn-success btn-lg"
                          name="submit"
                          value="addtocard"
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Detail;
