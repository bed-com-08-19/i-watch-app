"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashboardChart = () => {
  const [videoData, setVideoData] = useState([]);
  const [subscriptionData, setSubscriptionData] = useState([]);
  const [transactionData, setTransactionData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [videosResponse, subscriptionsResponse, transactionsResponse] = await Promise.all([
          axios.get('/api/videos'),
          axios.get('/api/subscriptions'),
          axios.get('/api/transactions'),
        ]);

        setVideoData(videosResponse.data.data);
        setSubscriptionData(subscriptionsResponse.data.data);
        setTransactionData(transactionsResponse.data.transactions);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data');
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  const processData = (data, field) => {
    const countByDate = data.reduce((acc, item) => {
      const date = new Date(item[field]).toLocaleDateString('en-US');
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(countByDate),
      data: Object.values(countByDate),
    };
  };

  const videoUploadData = processData(videoData, 'updatedAt');
  const subscriptionDataProcessed = processData(subscriptionData, 'start_date');
  const transactionDataProcessed = processData(transactionData, 'createdAt');

  // Ensure the labels are the same across all datasets
  const allLabels = [
    ...new Set([
      ...videoUploadData.labels,
      ...subscriptionDataProcessed.labels,
      ...transactionDataProcessed.labels,
    ]),
  ].sort((a, b) => new Date(a) - new Date(b));

  const alignData = (labels, data) => {
    const dataMap = data.labels.reduce((acc, label, index) => {
      acc[label] = data.data[index];
      return acc;
    }, {});

    return labels.map(label => dataMap[label] || 0);
  };

  const chartData = {
    labels: allLabels,
    datasets: [
      {
        label: 'Video Uploads',
        data: alignData(allLabels, videoUploadData),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: 'User Subscriptions',
        data: alignData(allLabels, subscriptionDataProcessed),
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
      },
      {
        label: 'Transactions',
        data: alignData(allLabels, transactionDataProcessed),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Dashboard Chart</h2>
      <Line data={chartData} />
    </div>
  );
};

export default DashboardChart;