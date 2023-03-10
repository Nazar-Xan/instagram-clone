import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Avatar } from "@material-ui/core";
import User from "../../components/users/user/User";
import Style from "./Style";

const Sidebar = () => {
  const classes = Style();

  const { profilePic, fullName, username, uid } = useSelector((state) => state.currentUser);
  const _users = useSelector((state) => state.users.filteredUsers);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(_users?.filter((user) => user.uid !== uid && !user.isFollowing && !user.isFollower));
  }, [_users]);

  const LoggedInUserInfo = () => {
    return (
      <div className={classes.logged__user}>
        <Avatar src={profilePic} />
        <Link to={`/${fullName}/profile?id=${uid}`}>
          <h4>{fullName}</h4>
          <p>{username}</p>
        </Link>
      </div>
    );
  };

  const SuggestedPeopleToFollow = () => {
    return (
      <div className={classes.followUsers}>
        <div className={classes.followUsers__heading}>
          <p>Suggestions for you</p>
          <Link to={`/${fullName}/suggested-users`}>See all</Link>
        </div>
        <div className={classes.followUsers__users}>
          {users?.map((user, i) => i < 5 && <User key={`sidebar-user-${i}`} user={user} />)}
        </div>
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <LoggedInUserInfo />
      <SuggestedPeopleToFollow />
      <About />
    </div>
  );
};

export default Sidebar;

// About section
const About = () => {
  const classes = Style();
  const footerTopLinks = [
    { title: "Github", link: "https://github.com/Nazar-Xan" },
    { title: "Instagram", link: "https://www.instagram.com/nazar____bek/" },
  ];
  return (
    <div className={classes.about}>
      <div>
        {footerTopLinks.map(({ title, link }, i) => (
          <a href={link} target="_black" key={`top-link-${i}`}>
            {title}
          </a>
        ))}
      </div>
      <p>Instagram clone</p>
    </div>
  );
};
