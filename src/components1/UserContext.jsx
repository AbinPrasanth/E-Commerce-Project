import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated", true) || null
  });
  const [currentUser, setCurrentUser] = useState(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();




    if (isAuthenticated && currentUser) {
      const userExists = users.find((user) => user.email === currentUser.email);
      if (userExists) {
        setIsAuthenticated(true);
        setCurrentUser(userExists);
      }
    }
  }, [currentUser?.id]);


  const registerUser = async (newUser) => {
    try {
      const response = await axios.post("http://localhost:5000/users", newUser, {
        headers: { "Content-Type": "application/json" },
      });


      setUsers((prevUsers) => [...prevUsers, response.data]);
      return { success: true, user: response.data };
    } catch (error) {
      console.error("Error registering user:", error);
      return { success: false, error: "An error occurred during registration" };
    }
  };


  const loginUser = async (email, password) => {
    if (loading) {
      return { success: false, error: "Users are still loading, please try again later." };
    }
    const res = await axios.get(`http://localhost:5000/users?email=${email}`)
    const filterusers = res.data[0]
    if (filterusers.isBlocked) {
      alert("Blocked")
      return
    }
    const user = filterusers.password === password;
    if (user) {

      setIsAuthenticated(true);
      setCurrentUser({ id: filterusers.id, name: filterusers.name, email: filterusers.email });
      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("user", JSON.stringify({ id: filterusers.id, name: filterusers.name, email: filterusers.email }));
      return { success: true, user: { id: filterusers.id, name: filterusers.name, email: filterusers.email } };
    } else {
      return { success: false, error: "Invalid email or password" };
    }
  };
  const logoutUser = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider
      value={{
        users,
        setUsers,
        isAuthenticated,
        currentUser,
        registerUser,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
