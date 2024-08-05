import { Link } from "react-router-dom";
import { ProductContext } from "../../Context/ProductContext";
import { useContext } from "react";
import { Product } from "../../interfaces/Product";

const Dashboard = () => {
  const { state, handleRemove } = useContext(ProductContext);
  console.log(state.products);

  return (
    <div>
      <Link className="text-decoration-none text-white" to="/product-add">
        <button className="btn btn-primary">Add</button>
      </Link>
      <table className="table table-bordered table-striped text-center border-dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Thumbnail</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {state.products.map((i: Product) => (
            <tr key={i._id}>
              <td>{i._id}</td>
              <td>{i.title}</td>
              <td>{i.price}</td>
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
                  onClick={() => handleRemove(i._id!)}
                >
                  Del
                </button>
                <Link className="text-decoration-none" to={`/edit/${i._id}`}>
                  <button className="btn btn-warning ">Edit</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
