import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    ads: [
      {
        _id: "1",
        title: "Ad Title 1",
        description: "This is a description for Ad 1.",
        adUrl: "https://via.placeholder.com/300x200",
      },
      {
        _id: "2",
        title: "Ad Title 2",
        description: "This is a description for Ad 2.",
        adUrl: "https://via.placeholder.com/300x200",
      },
      
    ],
  });
}
