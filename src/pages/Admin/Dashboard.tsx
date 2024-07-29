import { Link } from "react-router-dom";
import { Product } from "../../interfaces/Product";

type Props = {
  products: Product[];
  onDel: (id: any) => void;
};

const Dashboard = ({ products, onDel }: Props) => {
  const Del = (id: any) => {
    onDel(id);
  };
  return (
    <div>
      <Link className="text-decoration-none text-white" to="/add">
        <button className="btn btn-primary">Add</button>
      </Link>
      <table className="table table-bordered table-striped text-center border-dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((i) => (
            <tr key={i.id}>
              <td>{i.id}</td>
              <td>{i.title}</td>
              <td>{i.price}</td>
              <td>{i.description}</td>
              <td>
                <button className="btn btn-danger" onClick={() => Del(i.id)}>
                  Del
                </button>
                <Link className="text-decoration-none" to={`/edit/${i.id}`}>
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
