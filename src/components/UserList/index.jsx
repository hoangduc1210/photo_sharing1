import React, { useState, useEffect } from "react";
import { Divider, List, ListItem, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import "./styles.css";
import axios from "axios";
import Loading from "../Loading/Loading";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList() {
  //const users = models.userListModel();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token")
  useEffect(() => {
    const fetchUsers = async () => {
      const headers = { 'Authorization': `Bearer ${token}` };
      try {
        const res = await axios.get(
          "https://ryrv32-8081.csb.app/api/user/list",
          {headers: headers}
        );
        setUsers(res.data);
        setLoading(false)
        console.log("fetched users")
      } catch (e) {
        console.error("Error fetching user list:", e);
        setLoading(false)
      }
    };
    fetchUsers();
  }, []);

  if(loading){
    return <Loading />
  }
  console.log(users)
  return (
    <div>
      <h2>User List </h2>
      <List component="nav">
        {users.map((item) => (
          <div key={item._id}>
            <ListItem> 
              <Link className="link-item" to={`/users/${item._id}`}>
                <table border ="1">
                    <tr>
                      <th>
                      {item.first_name + " " + item.last_name}
                      </th>
                    </tr>
                </table>
              </Link>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  );
}

export default UserList;
