import Head from 'next/head';
import Header from '../landing/_components/Header';
import Footer from '../landing/_components/Footer';

export default function recommended() {
  const videos = [
    { id: 1, src: "/video1.jpg", alt: "Video 1" },
        { id: 2, src: "/video2.jpg", alt: "Video 2" },
        { id: 3, src: "/video3.jpeg", alt: "Video 3" },
        { id: 3, src: "/video4.jpeg", alt: "Video 4" },
  ];
  return ( 
  <div>
  <Head>
    <title>i-watch</title>
    <link rel="icon" href="/favicon.ico" />
  </Head>

  <div>
 
  <Header />

  <main className="flex flex-col items-center justify-between p-4">
          {/* User Videos */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-5xl p-4">
          
            {videos.map((video) => (
              <div key={video.id} className="relative h-48 sm:h-64">
                <video
                  className="object-cover w-full h-full"
                  src={video.src}
                  controls
                  
                />
              </div>
          
            ))}
          </div>    
        </main>

  <Footer />
  </div>
  
  
</div>
  );
}
