// // pages/api/users/getBalance.ts

// import type { NextApiRequest, NextApiResponse } from 'next';
// import {connect} from '@/dbConfig/dbConfig';
// import User from '@/models/userModel';

// type ResponseData = {
//   success: boolean;
//   data?: any;
//   error?: string;
//   message?: string;
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
//   if (req.method === 'GET') {
//     const { userId } = req.query;

//     try {
//       // Ensure the database connection is established
//       await connect();

//       // Find the user by ID
//       const user = await User.findById(userId);

//       if (!user) {
//         return res.status(404).json({ success: false, message: 'User not found' });
//       }

//       // Respond with the user's balance
//       return res.status(200).json({ success: true, data: { balance: user.balance } });
//     } catch (error: any) {
//       return res.status(500).json({ success: false, error: error.message });
//     }
//   } else {
//     return res.status(405).json({ success: false, message: 'Method Not Allowed' });
//   }
// }
