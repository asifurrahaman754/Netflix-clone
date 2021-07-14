import { useState } from "react";

import { useSelector } from "react-redux";

import style from "./profile.module.css";
import ReusableNavbar from "../Home/Navbar";
import userAvatar from "../../assets/images/users/1.png";
import { auth } from "../../firebase";
import { useHistory } from "react-router-dom";
import firebase from "firebase";

export default function Profile() {
  const [src, setSrc] = useState(userAvatar);
  const [loading, setLoading] = useState(false);
  const [loadingPercentage, setLoadingPercentage] = useState(0);

  // data from redux
  const userEmail = useSelector(state => state.user.user.userEmail);
  const uid = useSelector(state => state.user.user.uid);

  //get the url history to update url
  const history = useHistory();
  const handleSignOut = () => {
    history.push("/");
    auth.signOut();
  };

  const handleProfileChange = e => {
    //get file
    const file = e.target.files[0];

    //this is where file will store in firebase database
    let storageRef = firebase.storage().ref(`users/${uid}/${file.name}`);

    //upload file to the database
    const uploadTask = storageRef.put(file);
    uploadTask.on(
      "state_changed",
      snapshot => {
        // Observe state change events such as progress, pause, and resume
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setLoadingPercentage(Math.floor(progress));
        setLoading(true);
      },
      error => {
        alert(error);
      },
      () => {
        // Handle successful uploads on complete
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          setSrc(downloadURL);
          setLoading(false);
        });
      }
    );
  };

  return (
    <div className={style.black_bg}>
      <ReusableNavbar />
      <section className={style.profile_section}>
        <h1>Edit Profile</h1>

        <div className={style.profile_Info_container}>
          <div className={style.change_profile}>
            {loading ? (
              <span className={style.profile_loading}>
                Loading profile ({loadingPercentage}%)
              </span>
            ) : (
              <img
                className={style.profile_avatar}
                src={src}
                alt="user avatar"
              />
            )}
            <label className={style.custom_profile}>
              <input type="file" onChange={handleProfileChange} />
              change profile
            </label>
          </div>

          <div className={style.profile_information}>
            <h3 className={style.profile_email}>{userEmail}</h3>
            <h3 className={style.profile_plans}>Plan</h3>
            <span className={style.profile_plan_msg}>
              No Subscription plan currently available
            </span>
            <button onClick={handleSignOut} className={style.profile_signout}>
              Sign out
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
