const Navbar = () => {
    return (
      <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center">
          <img
            src="/path/to/profile.jpg"
            alt="Profile"
            className="w-8 h-8 rounded-full mr-2"
          />
          <span>Admin</span>
        </div>
      </div>
    );
  };
  
  export default Navbar;
  