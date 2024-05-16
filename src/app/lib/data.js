import { Product, User } from "./models";
import { connectToDB } from "./utils";

// export const fetchUsers = async (q, page) => {
//   const regex = new RegExp(q, "i");

//   const ITEM_PER_PAGE = 2;

//   try {
//     connectToDB();
//     const count = await User.find({ username: { $regex: regex } }).count();
//     const users = await User.find({ username: { $regex: regex } })
//       .limit(ITEM_PER_PAGE)
//       .skip(ITEM_PER_PAGE * (page - 1));
//     return { count, users };
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to fetch users!");
//   }
// };

// export const fetchUser = async (id) => {
//   console.log(id);
//   try {
//     connectToDB();
//     const user = await User.findById(id);
//     return user;
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to fetch user!");
//   }
// };

// export const fetchProducts = async (q, page) => {
//   console.log(q);
//   const regex = new RegExp(q, "i");

//   const ITEM_PER_PAGE = 2;

//   try {
//     connectToDB();
//     const count = await Product.find({ title: { $regex: regex } }).count();
//     const products = await Product.find({ title: { $regex: regex } })
//       .limit(ITEM_PER_PAGE)
//       .skip(ITEM_PER_PAGE * (page - 1));
//     return { count, products };
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to fetch products!");
//   }
// };

// export const fetchProduct = async (id) => {
//   try {
//     connectToDB();
//     const product = await Product.findById(id);
//     return product;
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to fetch product!");
//   }
// };

// DUMMY DATA

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
