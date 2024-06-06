import dbConnect from '../../../dbConfig/dbConfig';
import { Product } from '../../../models/product';
import cloudinary from '../../../lib/cloudinary';

export default async (req, res) => {
  await dbConnect();

  const { method } = req;
  
  switch (method) {
    case 'GET':
      try {
        const products = await Product.find({});
        res.status(200).json(products);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
      }
      break;
    case 'POST':
      try {
        const { name, brand, desc, price, image } = req.body;
        let uploadedImage;

        if (image) {
          const uploadedResponse = await cloudinary.uploader.upload(image, { upload_preset: 'iwatchImage' });
          uploadedImage = uploadedResponse.secure_url;
        }

        const product = new Product({ name, brand, desc, price, image: uploadedImage });
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create product' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
