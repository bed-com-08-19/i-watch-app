import { Product, User } from "../models/userModel";
import { connectToDB } from "./utils";

export const cards = [
  {
    id: 1,
    title: "Total Users",
    number: 10928,
    change: 12,
  },
  {
    id: 2,
    title: "Views",
    number: 8236,
    change: -2,
  },
  {
    id: 3,
    title: "Revenue",
    number: 6642,
    change: 18,
  },
];

export const user = 
  {
    id:1,
    name: "Chrisprog",
    bio: "Frontend developer",
    balance: 100,
    views: "20k",
    likes: "5k",
    image: "/profile.jpg"
  }

  export const users = 
  {
    id:1,
    name: "Chrisprog",
    role: "Administrator",
    image: "/profile.jpg"
  }


export const videos = [
  { id: 1, src: "/video1.mp4", alt: "Video 1" },
  { id: 2, src: "/video2.jpg", alt: "Video 2" },
  { id: 3, src: "/video3.jpeg", alt: "Video 3" },
  { id: 4, src: "/video4.jpeg", alt: "Video 4" },
  { id: 5, src: "/video4.jpeg", alt: "Video 5" },
  { id: 6, src: "/video4.jpeg", alt: "Video 6" },
  { id: 7, src: "/video4.jpeg", alt: "Video 7" },
  { id: 8, src: "/video4.jpeg", alt: "Video 8" },
  { id: 9, src: "/video4.jpeg", alt: "Video 9" },
  { id: 10, src: "/video4.jpeg", alt: "Video 10" },
  { id: 11, src: "/video4.jpeg", alt: "Video 11" },
];

export const transactions = [
  {
    id:1,
    name:"Chris prog",
    status:"Pending",
    date:"14.02.2024",
    amount:3.200,
    image:""
  },
  {
    id:2,
    name:"Flora Jossam",
    status:"Done",
    date:"16.02.2024",
    amount:20.000,
    image:""
  },
  {
    id:3,
    name:"Mary Malenga",
    status:"Cancelled",
    date:"19.02.2024",
    amount:5.000,
    image:""
  },
  {
    id:4,
    name:"John Banda",
    status:"Pending",
    date:"26.02.2024",
    amount:2.300,
    image:""
  },
];
