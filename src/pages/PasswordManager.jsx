import React, { useEffect, useState } from "react";
import eye from "../assets/Images/eye.png";
import hidden from "../assets/Images/hidden.png";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PasswordManager() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [visibleIndexes, setVisibleIndexes] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("passwords");
    if (saved) {
      setPasswordArray(JSON.parse(saved));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSavePassword = () => {
    const updated = [form, ...passwordArray]; // Newest on top
    setPasswordArray(updated);
    localStorage.setItem("passwords", JSON.stringify(updated));
    setForm({ site: "", username: "", password: "" });
    toast("Password added successfully!", {
      type: "success",
      theme: "colored",
      autoClose: 3000,
      transition: Slide,
    });
  };

  const toggleVisibility = (index) => {
    setVisibleIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleCopy = (password) => {
    navigator.clipboard.writeText(password);
    toast("Password copied to clipboard!", {
      type: "info",
      theme: "colored",
      autoClose: 3000,
      transition: Slide,
    });
  };

  const handleDelete = (index) => {
    const updated = passwordArray.filter((_, i) => i !== index);
    setPasswordArray(updated);
    localStorage.setItem("passwords", JSON.stringify(updated));
    toast("Password deleted!", {
      type: "error",
      theme: "colored",
      autoClose: 3000,
      transition: Slide,
    });
  };

  return (
    <div className="p-4 overflow-x-hidden w-full">
      <h1 className="text-xl font-bold mb-4 text-[#3e67c8]">Password Manager</h1>

      {/* Navbar */}
      <nav
        className="mt-6 border border-gray-200 shadow-xl rounded-xl p-4"
        style={{
          background: "linear-gradient(to bottom, #d6f8df 0%, #d6f8df 100%)",
          color: "#3e67c8",
        }}
      >
        <ul className="space-x-4 flex">
          <li>
            <a href="#" className="text-blue-700 hover:font-bold">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-700 hover:font-bold">
              About
            </a>
          </li>
          <li>
            <a href="#Contact" className="text-blue-700 hover:font-bold">
              Contact
            </a>
          </li>
        </ul>
      </nav>

      {/* Form */}
      <div
        className="mt-6 border border-gray-200 shadow-lg rounded-xl p-4"
        style={{
          background: "linear-gradient(to bottom, #d6f8df 0%, #ffd6e8 40%, #d6f8df 100%)",
          color: "#3e67c8",
        }}
      >
        <div className="text-xl font-bold flex justify-center mb-2">
          <span className="text-blue-700">&lt;</span>
          <span className="text-sky-600">Lock</span>
          <span className="text-blue-700">Layer</span>
          <span className="text-blue-700">/&gt;</span>
        </div>
        <p className="font-bold text-center text-[#3e67c8] mb-6">
          Your Own Password Manager
        </p>

        <div className="flex flex-col gap-4 text-sky-500">
          <input
            name="site"
            value={form.site}
            onChange={handleChange}
            className="w-full rounded-full border border-[#3e67c8] px-4 py-1 focus:outline-none focus:ring-2 focus:ring-sky-400"
            placeholder="Enter Website URL"
          />

          <div className="flex gap-4 w-full">
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-1/2 rounded-full border border-[#3e67c8] px-4 py-1 focus:outline-none focus:ring-2 focus:ring-sky-400"
              placeholder="Enter Username"
            />
            <div className="relative w-1/2">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                className="w-full rounded-full border border-[#3e67c8] px-4 py-1 pr-10 focus:outline-none focus:ring-2 focus:ring-sky-400"
                placeholder="Enter Password"
              />
              <img
                src={showPassword ? eye : hidden}
                alt="Toggle visibility"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <button
              onClick={handleSavePassword}
              className="flex items-center gap-2 bg-green-400 hover:bg-[#3e67c8] text-white font-semibold px-6 py-2 rounded-full"
            >
              <span>Add Password</span>
              <lord-icon
                src="https://cdn.lordicon.com/gzqofmcx.json"
                trigger="hover"
                style={{ width: "30px", height: "30px" }}
              ></lord-icon>
            </button>
          </div>
        </div>
      </div>

      {/* Password List */}
      {passwordArray.length > 0 ? (
        <div
          className="mt-6 border border-gray-200 shadow-lg rounded-xl overflow-hidden p-4"
          style={{
            background: "linear-gradient(to bottom, #d6f8df 0%, #ffd6e8 40%, #d6f8df 100%)",
            color: "#3e67c8",
          }}
        >
          <h2 className="text-2xl font-bold mb-4 text-[#3e67c8] text-center pt-2">
            Saved Passwords
          </h2>

          <div className="overflow-y-auto max-h-[180px] rounded-xl pr-2">
            <table className="w-full table-fixed border-separate border-spacing-y-3">
              <thead className="sticky top-0 bg-[#3e67c8] text-white z-10">
                <tr>
                  <th className="py-3 px-5 w-1/4 rounded-l-xl text-left">Website</th>
                  <th className="py-3 px-5 w-1/4 text-left">Username</th>
                  <th className="py-3 px-5 w-1/4 text-left">Password</th>
                  <th className="py-3 px-5 w-1/4 rounded-r-xl text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {passwordArray.map((item, index) => (
                  <tr key={index} className="bg-white hover:shadow-md text-gray-800">
                    <td className="py-3 px-5 rounded-l-xl break-words text-blue-600">
                      <a
                        href={item.site.startsWith("http") ? item.site : `https://${item.site}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:font-bold no-underline"
                      >
                        {item.site}
                      </a>
                    </td>
                    <td className="py-3 px-5 break-words">{item.username}</td>
                    <td className="py-3 px-5 break-all">
                      {visibleIndexes.includes(index) ? item.password : "●●●●●●"}
                    </td>
                    <td className="py-3 px-5 flex items-center gap-2 justify-start rounded-r-xl">
                      <img
                        src={visibleIndexes.includes(index) ? hidden : eye}
                        alt="toggle"
                        className="w-5 h-5 cursor-pointer"
                        onClick={() => toggleVisibility(index)}
                      />
                      <img
                        src="/copy.png"
                        alt="copy"
                        className="w-6 h-6 cursor-pointer hover:scale-110 transition"
                        title="Copy password"
                        onClick={() => handleCopy(item.password)}
                      />
                      <img
                        src="/trash-bin.png"
                        alt="delete"
                        className="w-6 h-6 cursor-pointer hover:scale-110 transition"
                        title="Delete password"
                        onClick={() => handleDelete(index)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="mt-6 flex justify-center">
          <p className="text-center bg-green-400 hover:bg-[#3e67c8] text-white font-semibold px-6 py-2 rounded-full">
            There is no password saved.
          </p>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default PasswordManager;