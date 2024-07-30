import { Link } from "react-router-dom";
import { Product } from "../../interfaces/Product";

type Props = {
  products: Product[];
};

const Home = ({ products }: Props) => {
  return (
    <div>
      <body>
        <section className="bg-light">
          <div className="container py-5">
            <div className="row text-center py-3">
              <div className="col-lg-6 m-auto">
                <h1 className="h1">Featured Product</h1>
                <p>
                  Reprehenderit in voluptate velit esse cillum dolore eu fugiat
                  nulla pariatur. Excepteur sint occaecat cupidatat non
                  proident.
                </p>
              </div>
            </div>

            <div className="row">
              {products.map((i) => (
                <div className="col-12 col-md-4 mb-4">
                  <div className="card h-100">
                    <a href="shop-single.html">
                      <img
                        src={i.thumbnail}
                        className="card-img-top"
                        alt="..."
                      ></img>
                    </a>
                    <div className="card-body">
                      <ul className="list-unstyled d-flex justify-content-between">
                        <li>
                          <p>Price: </p>
                        </li>
                        <li className="text-muted text-right">{i.price}</li>
                      </ul>
                      <a
                        href="shop-single.html"
                        className="h2 text-decoration-none text-dark"
                      >
                        {i.title}
                      </a>
                      <p className="card-text">{i.description}</p>
                      <ul className="list-unstyled d-flex justify-content-between">
                        <li>
                          <Link to={`/detail/${i.id}`}>
                            <button className="btn btn-primary">Detail</button>
                          </Link>
                        </li>
                        <li className="text-muted text-right">
                          <button className="btn btn-success">
                            Add to cart
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="bg-dark" id="tempaltemo_footer">
          <div className="container">
            <div className="row">
              <div className="col-md-4 pt-5">
                <h2 className="h2 text-success border-bottom pb-3 border-light logo">
                  Nhóm 9
                </h2>
                <ul className="list-unstyled text-light footer-link-list">
                  <li>
                    <i className="fas fa-map-marker-alt fa-fw"></i>
                    Zimbabwe
                  </li>
                  <li>
                    <i className="fa fa-phone fa-fw"></i>
                    <a className="text-decoration-none text-light">
                      012 - 345 - 6789
                    </a>
                  </li>
                  <li>
                    <i className="fa fa-envelope fa-fw"></i>
                    <a
                      className="text-decoration-none text-light"
                      href="mailto:info@company.com"
                    >
                      info@company.com
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col-md-4 pt-5">
                <h2 className="h2 text-light border-bottom pb-3 border-light">
                  Products
                </h2>
                <ul className="list-unstyled text-light footer-link-list">
                  <li>
                    <a className="text-decoration-none" href="#">
                      Luxury
                    </a>
                  </li>
                  <li>
                    <a className="text-decoration-none" href="#">
                      Sport Wear
                    </a>
                  </li>
                  <li>
                    <a className="text-decoration-none" href="#">
                      Men's Shoes
                    </a>
                  </li>
                  <li>
                    <a className="text-decoration-none" href="#">
                      Women's Shoes
                    </a>
                  </li>
                  <li>
                    <a className="text-decoration-none" href="#">
                      Popular Dress
                    </a>
                  </li>
                  <li>
                    <a className="text-decoration-none" href="#">
                      Gym Accessories
                    </a>
                  </li>
                  <li>
                    <a className="text-decoration-none" href="#">
                      Sport Shoes
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col-md-4 pt-5">
                <h2 className="h2 text-light border-bottom pb-3 border-light">
                  Further Info
                </h2>
                <ul className="list-unstyled text-light footer-link-list">
                  <li>
                    <a className="text-decoration-none" href="#">
                      Home
                    </a>
                  </li>
                  <li>
                    <a className="text-decoration-none" href="#">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a className="text-decoration-none" href="#">
                      Shop Locations
                    </a>
                  </li>
                  <li>
                    <a className="text-decoration-none" href="#">
                      FAQs
                    </a>
                  </li>
                  <li>
                    <a className="text-decoration-none" href="#">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </div>
  );
};

export default Home;
