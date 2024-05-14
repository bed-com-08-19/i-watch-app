"use client"
import { useState, useEffect } from "react";
import Pagination from "../pagination/pagination";
import Search from "../search/search";
import styles from "./users.module.css";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";


const UsersPage = ({ searchParams }) => {

  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/users/get-all-users/index", {
          params: {
            q: searchParams?.q || "",
            page: searchParams?.page || 1,
          },
        });
        setUsers(response.data.data);
        setCount(response.data.count);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [searchParams]);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/api/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      setError(error.message);
    }
  };


  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a user..." />
        <Link href="/dashboard/users/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <td>Name</td>
              <td>Email</td>
              <td>Created At</td>
              <td>Role</td>
              <td>Status</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className={styles.user}>
                    <Image
                      src={user.img}
                      alt=""
                      width={40}
                      height={40}
                      className={styles.userImage}
                    />
                    {user.username}
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{new Date(user.createdAt).toDateString()}</td>
                <td>{user.role === 'creator' ? "Creator" : "User"}</td>
                <td>{user.isActive ? "Active" : "Inactive"}</td>
                <td>
                  <div className={styles.buttons}>
                    <Link href={`/dashboard/users/${user._id}`}>
                      <button className={`${styles.button} ${styles.view}`}>
                        View
                      </button>
                    </Link>
                    <button
                      className={`${styles.button} ${styles.delete}`}
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Pagination count={count} />
    </div>
  );
};


export default UsersPage;
