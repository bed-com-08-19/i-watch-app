import connect from '../../../../dbConfig';
import Category from '../../../../models';


export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  if (method === 'DELETE') {
    try {
      await connect();
      const deletedCategory = await Category.findByIdAndDelete(id);
      if (!deletedCategory) {
        return res.status(404).json({ success: false, message: 'Category not found' });
      }
      res.status(200).json({ success: true, message: 'Category deleted successfully' });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}