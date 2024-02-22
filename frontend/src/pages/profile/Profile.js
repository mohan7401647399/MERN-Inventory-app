import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../../components/card/Card";
import { SpinnerImg } from "../../components/Loader/Loader";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { SET_NAME, SET_USER } from "../../redux/features/auth/authSlice";
import { getUser } from "../../services/service";
// import "./Profile.scss";

const Profile = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("Getting use");
    setIsLoading(true);
    async function getUserData() {
      const data = await getUser();
      console.log(data);

      setProfile(data);
      setIsLoading(false);
      await dispatch(SET_USER(data));
      await dispatch(SET_NAME(data.name));
    }
    getUserData();
  }, [dispatch]);

  return (
    <div className="profile h-30 bg-dark">
      {isLoading && <SpinnerImg />}
      <>
        {!isLoading && profile === null ? (
          <p>Something went wrong, please reload the page...</p>
        ) : (
          <Card>
            <span className="w-100 h-100 d-flex justify-center align-content-center overflow-hidden max-h-80	pt-4 rounded-sm	ease-in duration-300">
              <img src={profile?.photo} alt="profilePic" />
            </span>
            <span className="m-auto p-5">
              <p><b>Name : </b> {profile?.name}</p>
              <p><b>Email : </b> {profile?.email}</p>
              <p><b>Phone : </b> {profile?.phone}</p>
              <p><b>Bio : </b> {profile?.bio}</p>
              <div>
                <Link to="/edit-profile">
                  <button className="btn btn-primary  hover:font-bold">Edit Profile</button>
                </Link>
              </div>
            </span>
          </Card>
        )}
      </>
    </div>
  );
};

export default Profile;
