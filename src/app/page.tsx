export default function HomePage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <h1 className="text-5xl font-semibold mb-4">Earn money by watching <br /> Videos, Content creation, advertise with us and more.</h1>
          <p className="text-xl mb-6">Watch anywhere. Cancel anytime.</p>
          <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold">
          <a href="/auth/signin">
            Sign in
          </a>
          </button>
        </div>
      </div>
    </div>
      
  );
}
