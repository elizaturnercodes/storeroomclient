import { useEffect, useState } from 'react';
import Product from '../components/Product';
import { useNavigate } from 'react-router';
import LogoutButton from '../components/LogoutButton';

export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    async function fetchProducts() {
      try {
        const response = await fetch('https://storeroomserver.vercel.app/api/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Ensure cookies are included in the request
        });

        const data = await response.json();

        if (data.status === 'success') {
          console.log(data.data[0]._id);
          setProducts(data.data);
        } else {
          setError(data.message);
          navigate('/');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [navigate]);

  const handleOrder = (updatedProduct) => {
    setProducts((prevProducts) => prevProducts.map((product) => (product._id === updatedProduct._id ? updatedProduct : product)));
  };

  const handleReceive = (updatedProduct) => {
    setProducts((prevProducts) => prevProducts.map((product) => (product._id === updatedProduct._id ? updatedProduct : product)));
  };

  const handleCancel = (updatedProduct) => {
    setProducts((prevProducts) => prevProducts.map((product) => (product._id === updatedProduct._id ? updatedProduct : product)));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = products.filter((product) => product.productName.toLowerCase().includes(searchQuery.toLowerCase()));

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-6 pt-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Store Room Products</h1>
          {user && (
            <p className="small capitalize">
              Employee: {user.firstName} {user.lastName}
            </p>
          )}
        </div>
        <LogoutButton />
      </div>
      <div className="mb-6">
        <h3 className="small">Search Products:</h3>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Start Typing Product Name..."
          className="w-full px-3 py-2 border rounded mb-4 border-slate-500"
        />
      </div>
      <ul className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
        {filteredProducts.map((product) => (
          <Product key={product._id} product={product} onOrder={handleOrder} onReceive={handleReceive} onCancel={handleCancel} />
        ))}
      </ul>
    </div>
  );
}
