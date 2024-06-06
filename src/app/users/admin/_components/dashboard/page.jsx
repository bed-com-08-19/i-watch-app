"use client";

import { useEffect, useState } from 'react';
import { connect } from '../../../../lib/mongoose';
import UserModel from '../../../../models/userModel';
import { cards } from '../../../../lib/data';
import Card from './card/card';
import Chart from './chart/chart';
import Rightbar from './rightbar/rightbar';
import styles from './dashboard.module.css';
import Transactions from './transactions/page';

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await connect();
      try {
        const users = await UserModel.find({});
        setUsers(users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          {cards.map((item) => (
            <Card item={item} key={item.id} />
          ))}
        </div>
        <Transactions />
        <Chart />
      </div>
      <div className={styles.side}>
        <Rightbar />
      </div>
    </div>
  );
};

export default Dashboard;
