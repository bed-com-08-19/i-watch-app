import Head from 'next/head';
import Header from './_components/Header';
import Footer from './_components/Footer';
import VideoCards from "./_components/videoCards"

export default function Home() {
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
  </div>

  <div>
 
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
