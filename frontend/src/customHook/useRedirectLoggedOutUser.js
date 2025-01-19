import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_LOGIN } from "../redux/features/auth/authSlice";
import { getLoginStatus } from "../services/service";
import { toast } from "react-toastify";

const useRedirectLoggedOutUser = (path) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        const redirectLoggedOutUser = async () => {
            try {
                const isLoggedIn = await getLoginStatus();
                dispatch(SET_LOGIN(isLoggedIn));
                // console.log(isLoggedIn)
                if (!isLoggedIn) {
                    toast.info("Session expired, Please login");
                    navigate(path);
                    return;
                }
            } catch (error) {
                toast.error("Authorization error, Please try again.");
                console.error("Error checking login status:", error);
                navigate(path);
            }
        };

        redirectLoggedOutUser();
    }, [navigate, path, dispatch]);

}

export default useRedirectLoggedOutUser;