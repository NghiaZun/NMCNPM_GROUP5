import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { AiOutlineLock, AiOutlineUser, AiOutlineTeam } from "react-icons/ai";
import { authenticationService } from "../../services/authenticationService";
const Signup = () => {
 const { isAuthenticated, login } = useContext(AuthContext);
 const [isLoading, setIsLoading] = useState(false);
 const navigate = useNavigate();
 const [formData, setFormData] = useState({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "customer",
  error: "",
 });

 if (isAuthenticated) {
  return <Navigate to="/" />;
 }

 const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({
   ...prevData,
   [name]: value,
  }));
 };
 console.log(formData);
 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  const { name, email, password, confirmPassword, role } = formData;

  setFormData((prevData) => ({ ...prevData, error: "" }));
  if (password !== confirmPassword) {
   setFormData((prevData) => ({
    ...prevData,
    error: "Confirm Password doesn't match with Password",
   }));
   setIsLoading(false);

   return;
  }
  if (password.length < 8 || !/[A-Z]/.test(password) || !/\d/.test(password)) {
   setFormData((prevData) => ({
    ...prevData,
    error:
     "Password must be at least 8 characters long, include at least one uppercase letter, and one number.",
   }));
   setIsLoading(false);
   return;
  }

  try {
   const response = await authenticationService.signup(
    name,
    email,
    password,
    role
   );
   await new Promise((resolve) => {
    setTimeout(resolve, 3000);
   });
   if (response.status === 200 || response.status === 201) {
    console.log("Signup successful:", response.data);
    const { token, user } = response.data;
    // await login(token, user.email, user.name, user.role);
    setIsLoading(false);

    navigate("/login");
    console.log("User logged in successfully");
   } else {
    throw new Error(response.data.message || "Signup failed");
   }
  } catch (error) {
   console.error("Error during signup:", error.message);
   setIsLoading(false);

   setFormData((prevData) => ({
    ...prevData,
    error: error.message || "An unexpected error occurred",
   }));
  }
 };

 return (
  <div className="flex flex-col justify-center px-6 py-12 mt-10">
   <div>
    <h1 className="text-[80px] font-bold text-center text-green-700 opacity-95">
     SoftWear
    </h1>
    <h2 className="text-center text-[14px] -mt-[20px] text-gray-900">
     Create an account
    </h2>
   </div>

   <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
    <form onSubmit={handleSubmit} className="space-y-2">
     <div className="mt-2">
      <div className="flex items-center">
       <div className="absolute ml-4">
        <AiOutlineUser size={20} />
       </div>
       <input
        type="name"
        name="name"
        id="name"
        required
        placeholder="Your name"
        value={formData.name}
        onChange={handleChange}
        className="pl-10 block w-full rounded-xl bg-gray-100 px-3 py-[12px] text-base text-gray-900 placeholder:text-gray-800 focus:outline-[0.5px] focus:outline-green-600 sm:text-sm/6"
       />
      </div>
     </div>

     <div className="">
      <div className="flex items-center">
       <div className="absolute ml-4">
        <AiOutlineUser size={20} />
       </div>
       <input
        type="email"
        name="email"
        id="email"
        required
        placeholder="Your email"
        value={formData.email}
        onChange={handleChange}
        className="pl-10 block w-full rounded-xl bg-gray-100 px-3 py-[12px] text-base text-gray-900 placeholder:text-gray-800 focus:outline-[0.5px] focus:outline-green-600 sm:text-sm/6"
       />
      </div>
     </div>

     <div>
      <div className="flex items-center">
       <div className="absolute ml-4">
        <AiOutlineLock size={20} />
       </div>
       <input
        type="password"
        name="password"
        id="password"
        required
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="pl-10 block w-full rounded-xl bg-gray-100 px-3 py-[12px] text-base text-gray-900 placeholder:text-gray-800 focus:outline-[0.5px] focus:outline-green-600 sm:text-sm/6"
       />
      </div>
     </div>

     <div>
      <div className="flex items-center">
       <div className="absolute ml-4">
        <AiOutlineLock size={20} />
       </div>
       <input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        required
        placeholder="Confirm password"
        value={formData.confirmPassword}
        onChange={handleChange}
        className="pl-10 block w-full rounded-xl bg-gray-100 px-3 py-[12px] text-base text-gray-900 placeholder:text-gray-800 focus:outline-[0.5px] focus:outline-green-600 sm:text-sm/6"
       />
      </div>
     </div>

     <div>
      <div className="flex items-center">
       <div className="absolute ml-4">
        <AiOutlineTeam size={20} />
       </div>
       <select
        name="role"
        id="role"
        required
        placeholder="Role"
        value={formData.role}
        onChange={handleChange}
        className="pl-10 block w-full rounded-xl bg-gray-100 px-3 py-[12px] text-base text-gray-900 placeholder:text-gray-800 focus:outline-[0.5px] focus:outline-green-600 sm:text-sm/6"
       >
        <option value="customer">Customer</option>
        <option value="retailer">Retailer</option>
       </select>
      </div>
     </div>

     {formData.error && (
      <div className="text-red-500 text-sm text-left ml-2 mt-2">
       {formData.error}
      </div>
     )}

     <div>
      <button
       type="submit"
       className="rounded-3xl font-lg py-4 mt-5 flex w-full justify-center bg-gray-800 px-3 text-sm/6 font-semibold text-white shadow-sm hover:bg-gray-900 "
      >
       SIGNUP
       {isLoading && (
        <div role="status">
         <svg
          aria-hidden="true"
          className="ml-2 w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-green-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
         >
          <path
           d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
           fill="currentColor"
          />
          <path
           d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
           fill="currentFill"
          />
         </svg>
        </div>
       )}
      </button>
     </div>
    </form>

    <div className="mt-4 text-center text-sm/6 text-gray-800 flex items-center justify-center">
     <p>{"Already have an account? "}</p>
     <Link
      to="/login"
      className="underline text-green-600 hover:text-green-900"
     >
      {" Login"}
     </Link>
    </div>
   </div>
  </div>
 );
};

export default Signup;
