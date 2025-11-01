import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
//   baseURL: "http://localhost:4000",
  baseURL: "https://tutor-sphere-server-side.vercel.app",
  withCredentials: true,
});
function useAxiosSecure() {
  const { signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        // console.log('error caught in interceptor', error);
        if (error.status === 401 || error.status === 403) {
            // console.log('need to logout user');
            signOutUser()
            .then(()=>{
                // console.log('Logged Out users');
                navigate('/signIn')
            })
            .catch ((error)=>{
                // console.log(error);
            })
        }
        return Promise.reject(error)
      }
    );
  }, []);
  return axiosInstance;
}

export default useAxiosSecure;