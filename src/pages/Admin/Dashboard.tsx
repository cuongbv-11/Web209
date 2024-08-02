import { Link } from "react-router-dom";
import { useStore } from "../../Context/StoreContext";
import { useContext } from "react";
import { AuthContext, AuthContextType } from "../../Context/AuthContext";

const Dashboard = () => {
  const { products, handleRemove } = useStore();
  const { user } = useContext(AuthContext) as AuthContextType;
  if (user?.role !== "admin") {
    return <h1>Access denied. You are not an admin.</h1>;
  }

  return (
    <div>
      <div id="wrapper">
        <div id="sidebar-wrapper">
          <ul className="sidebar-nav">
            <li className="sidebar-brand">
              <p>Admin</p>
            </li>
            <li>
              <Link to="/add">Add Product</Link>
            </li>
          </ul>
        </div>

        <div id="page-content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12"></div>

              <table className="table table-bordered table-striped text-center border-dark">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Thumbnail</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((i) => (
                    <tr key={i.id}>
                      <td>{i.title}</td>
                      <td>
                        {i.price}
                        <strong>$</strong>
                      </td>
                      <td>{i.description}</td>
                      <td>
                        <img
                          src={i.thumbnail}
                          alt={i.title}
                          style={{ width: "50px" }}
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleRemove(i._id)}
                        >
                          Del
                        </button>
                        <Link
                          className="text-decoration-none"
                          to={`/edit/${i._id}`}
                        >
                          <button className="btn btn-warning ">Edit</button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
