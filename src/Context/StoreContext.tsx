import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Product } from "../interfaces/Product";
import { instance } from "../api/api";

interface StoreContextProps {
  products: Product[];
  fetchProducts: () => void;
  handleRemove: (id: any) => Promise<void>;
  onSubmitProduct: (data: Product) => Promise<void>;
}

const StoreContext = createContext<StoreContextProps | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const { data } = await instance.get(`products`);
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleRemove = async (id: any) => {
    if (confirm("Are you sure?")) {
      await instance.delete(`products/${id}`);
      setProducts(products.filter((item) => item.id !== id));
    }
  };

  const onSubmitProduct = async (data: Product) => {
    if (data.id) {
      await instance.patch(`/products/${data.id}`, data);
      fetchProducts();
    } else {
      const res = await instance.post(`/products`, data);
      setProducts([...products, res.data]);
    }
  };

  return (
    <StoreContext.Provider
      value={{ products, fetchProducts, handleRemove, onSubmitProduct }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
