import { useState } from 'react';
import { useNavigate, Link } from 'react-router';

export default function Home() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      const data = await response.json();

      console.log(data);

      if (data.status === 'success') {
        alert(data.message);
        localStorage.setItem('user', JSON.stringify(data.user)); // Store user data in local storage
        navigate('/products');
      } else {
        console.error('Login failed:', data.error);
        alert('Login failed: ' + data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + error.message);
    }
  }

  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <h1 className="text-center text-5xl mb-6">Stock Room</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-3 py-2 border rounded border-bottom border-slate-500"
          />
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-3 py-2 border rounded border-slate-500"
          />
          <button
            type="submit"
            className="rounded-md border text-white border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none w-full"
          >
            Sign In
          </button>
        </form>

        <p className="small mt-6 text-center text-slate-500">*demo email: employee1@gmail.com password: 123456</p>

        <Link className="mt-8 block text-center hover:underline" to="/register">
          Register an Employee
        </Link>
      </div>
    </div>
  );
}
