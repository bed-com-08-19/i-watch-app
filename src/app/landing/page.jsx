import Head from 'next/head';
import Header from './_components/Header';
import Footer from './_components/Footer';
import subjectCards from './_components/subjectcards';

export default function Home() {
  return ( 
  <div>
  <Head>
    <title>i-watch</title>
    <link rel="icon" href="/favicon.ico" />
  </Head>

  <div>
  <Header />

  <main>
    <subjectCards/>

  </main>

  <Footer />
  </div>
  
  
</div>
  );
}
