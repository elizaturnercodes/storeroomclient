import { useState } from 'react';
import { useNavigate, Link } from 'react-router';

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'employee',
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
      const response = await fetch('https://storeroomserver.vercel.app/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      const data = await response.json();

      if (data.message === 'Register successful') {
        alert(data.message);
        localStorage.setItem('user', JSON.stringify(data.user)); // Store user data in local storage
        navigate('/products');
      } else {
        console.error('Registration failed:', data.error);
        alert('Registration failed: ' + data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + error.message);
    }
  }

  return (
    <div className="flex h-screen">
      <div className="m-auto max-w-xl px-6">
        <h1 className="text-center text-5xl mb-6">Stock Room Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full px-3 py-2 border rounded border-slate-500"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
          <input
            className="w-full px-3 py-2 border rounded border-slate-500"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
          <input className="w-full px-3 py-2 border rounded" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
          <input
            className="w-full px-3 py-2 border rounded border-slate-500"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <select className="w-full px-3 py-2 border rounded border-slate-500" name="role" value={formData.role} onChange={handleChange} disabled>
            <option value="employee">Employee</option>
          </select>
          <p className="small text-slate-600 ">*All accounts are defaulted to employee, contact HR for admin rights.</p>
          <button
            className="rounded-md border text-white border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg  bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none w-full"
            type="submit"
          >
            Register
          </button>
        </form>

        <Link className="mt-8 block text-center hover:underline" to="/">
          Already have an account? Sign In
        </Link>
      </div>
    </div>
  );
}
