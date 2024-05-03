import Head from 'next/head';
import Header from './_components/Header';
import Footer from './_components/Footer';
import VideoCards from "./_components/videoCards"

export default function Home() {
  const numbers = [1, 2, 3, 5, 6, 7, 8]
  return ( 
  <div>
  <Head>
    <title>i-watch</title>
  
  </Head>

  <div>
 
  <Header />

  <main style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', padding: '20px' }}>
          {numbers.map((num) => (
            <div key={num} style={{ flex: '0 0 calc(25% - 15px)', marginBottom: '30px' }}>
              <VideoCards />
            </div>
          ))}
        </main>

  <Footer />
  </div>
  
  
</div>
  );
}
