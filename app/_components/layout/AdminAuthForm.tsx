// 'use client';
// import React, { useState } from 'react';
// import { FiMail, FiLock } from 'react-icons/fi';
// import { loginAdminSchema } from '@/app/validations/adminValidation';
// import { useRouter } from 'next/navigation';
// import { FiEye, FiEyeOff } from 'react-icons/fi'; // Add this import at the top

// const AdminAuthForm = () => {
//   const router = useRouter();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errors, setErrors] = useState<{ [key: string]: string }>({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [apiError, setApiError] = useState<string | null>(null);
//   const [showPassword, setShowPassword] = useState(false); // Add this state

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setApiError(null);

//     try {
//       // Validate the form data
//       await loginAdminSchema.validateAsync({ email, password }, { abortEarly: false });
//       setErrors({});
//       setIsLoading(true);

//       // API call
//       const response = await fetch('/api/admin/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || 'Login failed');
//       }

//       // Store token in cookie (handled by the API response)
//       if (data.success && data.data.token) {
//         // Redirect to admin space
//         router.push('/adminspace');
//       }

//     } catch (error: any) {
//       if (error.details) {
//         // Joi validation errors
//         const validationErrors: { [key: string]: string } = {};
//         error.details.forEach((detail: any) => {
//           validationErrors[detail.path[0]] = detail.message;
//         });
//         setErrors(validationErrors);
//       } else {
//         // API or other errors
//         setApiError(error.message || 'An error occurred');
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
//       {apiError && (
//         <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
//           {apiError}
//         </div>
//       )}

//       <div className="space-y-2">
//         <div className="relative">
//           <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Email Address"
//             disabled={isLoading}
//             className={`w-full px-10 py-3 bg-white border ${errors.email ? 'border-red-500' : 'border-gray-200'
//               } rounded-lg focus:outline-none focus:border-[#A7FF03] focus:ring-1 focus:ring-[#A7FF03] transition-all ${isLoading ? 'opacity-50' : ''
//               }`}
//           />
//           {errors.email && (
//             <p className="mt-1 text-sm text-red-500">{errors.email}</p>
//           )}
//         </div>
//         <div className="relative">
//           <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           <input
//             type={showPassword ? "text" : "password"}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Password"
//             disabled={isLoading}
//             className={`w-full px-10 py-3 bg-white border ${errors.password ? 'border-red-500' : 'border-gray-200'
//               } rounded-lg focus:outline-none focus:border-[#A7FF03] focus:ring-1 focus:ring-[#A7FF03] transition-all ${isLoading ? 'opacity-50' : ''
//               }`}
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
//           >
//             {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
//           </button>
//           {errors.password && (
//             <p className="mt-1 text-sm text-red-500">{errors.password}</p>
//           )}
//         </div>
//       </div>
//       <button
//         type="submit"
//         disabled={isLoading}
//         className={`w-full py-3 bg-[#A7FF03] text-black font-semibold rounded-lg hover:bg-opacity-90 transition-all duration-200 shadow-lg hover:shadow-[#A7FF03]/50 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
//           }`}
//       >
//         {isLoading ? 'Signing In...' : 'Sign In'}
//       </button>
//     </form>
//   );
// };

// export default AdminAuthForm;
'use client';
import React, { useState } from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
import { loginAdminSchema } from '@/app/validations/adminValidation';
import { useRouter } from 'next/navigation';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import toast from 'react-hot-toast';


const AdminAuthForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    try {
      
      await loginAdminSchema.validateAsync(
        { email, password },
        { abortEarly: false }
      );
      setErrors({});
      setIsLoading(true);

      
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/driver-auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phone_number: email, 
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      
      if (data.success && data.data.tokens) {
        
        localStorage.setItem(
          'access_token',
          data.data.tokens.access_token
        );
        localStorage.setItem(
          'refresh_token',
          data.data.tokens.refresh_token
        );
        localStorage.setItem('driver_id', data.data.driver_id);
        localStorage.setItem('phone_number', email);

        
        toast.success(data.message || 'Login successful');

        
        router.push('/adminspace');
      }
    } catch (error: any) {
      if (error.details) {
        // Joi validation errors
        const validationErrors: { [key: string]: string } = {};
        error.details.forEach((detail: any) => {
          validationErrors[detail.path[0]] = detail.message;
        });
        setErrors(validationErrors);
      } else {
        // API or other errors
        const errorMsg = error.message || 'An error occurred';
        setApiError(errorMsg);
        toast.error(errorMsg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
      {apiError && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {apiError}
        </div>
      )}

      <div className="space-y-2">
        {/* Email/Phone Input */}
        <div className="relative">
          <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Phone Number or Email"
            disabled={isLoading}
            className={`w-full px-10 py-3 bg-white border ${
              errors.email ? 'border-red-500' : 'border-gray-200'
            } rounded-lg focus:outline-none focus:border-[#A7FF03] focus:ring-1 focus:ring-[#A7FF03] transition-all ${
              isLoading ? 'opacity-50' : ''
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="relative">
          <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            disabled={isLoading}
            className={`w-full px-10 py-3 bg-white border ${
              errors.password ? 'border-red-500' : 'border-gray-200'
            } rounded-lg focus:outline-none focus:border-[#A7FF03] focus:ring-1 focus:ring-[#A7FF03] transition-all ${
              isLoading ? 'opacity-50' : ''
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
          )}
        </div>
      </div>

      {/* Sign In Button */}
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3 bg-[#A7FF03] text-black font-semibold rounded-lg hover:bg-opacity-90 transition-all duration-200 shadow-lg hover:shadow-[#A7FF03]/50 ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </button>

      {/* Forgot Password Link */}
      <div className="text-center">
        <a
          href="/forgot-password"
          className="text-sm text-gray-600 hover:text-[#A7FF03] transition-colors"
        >
          Forgot Password?
        </a>
      </div>
    </form>
  );
};

export default AdminAuthForm;
