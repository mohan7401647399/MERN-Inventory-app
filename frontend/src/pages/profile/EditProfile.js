import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import Loader from "../../components/Loader/Loader";
import { selectUser } from "../../redux/features/auth/authSlice";
import "./Profile.scss";
import { toast } from "react-toastify";
import { updateUser } from "../../services/service";
import ChangePassword from "../../components/changePassword/ChangePassword";

const EditProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(selectUser);
  const { email } = user;

  useEffect(() => {
    if (!email) {
      navigate("/profile");
    }
  }, [email, navigate]);

  const initialState = {
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    bio: user?.bio,
    photo: user?.photo,
  };
  const [profile, setProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Handle Image upload
      let imageURL;
      if (profileImage && (profileImage.type === "image/jpeg" || profileImage.type === "image/jpg" || profileImage.type === "image/png")) {
        const image = new FormData();
        image.append("file", profileImage);
        image.append("cloud_name", "dtvqulsog");
        image.append("upload_preset", "ed1lxlqe");

        // First save image to cloudinary
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dtvqulsog/image/upload",
          { method: "post", body: image }
        );
        const imgData = await response.json();
        imageURL = imgData.url.toString();

        // Save Profile
        const formData = {
          name: profile.name,
          phone: profile.phone,
          bio: profile.bio,
          photo: profileImage ? imageURL : profile.photo,
        };

        const data = await updateUser(formData);
        toast.success("User updated");
        navigate("/profile");
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="profile p-2 bg-dark">
      {isLoading && <Loader />}
      <Card>
        <h2>Edit Profile</h2>
        <span className="profile-photo">
          <img src={user?.photo} alt="profilePic" />
        </span>
        <form className="form-control m-auto" onSubmit={saveProfile}>
          <span className="profile-data">
            <p>
              <label>Name: &nbsp; </label>
              <input
                type="text"
                name="name"
                value={profile?.name}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label>Email:&nbsp;</label>
              <input type="text" name="email" value={profile?.email} disabled />
              <br />
              <code>Email cannot be changed.</code>
            </p>
            <p>
              <label>Phone:&nbsp;</label>
              <input
                type="text"
                name="phone"
                value={profile?.phone}
                onChange={handleInputChange}
                className='form-control rounded-2 p-1 m-auto mt-2'
              />
            </p>
            <p>
              <label>Bio:&nbsp;</label>
              <textarea
                name="bio"
                value={profile?.bio}
                onChange={handleInputChange}
                cols="20"
                rows="5"
              ></textarea>
            </p>
            <p>
              <label>Photo:&nbsp;</label>
              <input type="file" name="image" onChange={handleImageChange} className='form-control rounded-2 p-1 m-auto mt-2' />
            </p>
            <div>
              <button className="btn btn-primary  hover:font-bold">Edit Profile</button>
            </div>
          </span>
        </form>
      </Card>
      <br />
      <ChangePassword />
    </div>
  );
};

export default EditProfile;
