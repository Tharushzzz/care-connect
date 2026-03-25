import Header from '../components/Header/Header.tsx'
import Herosection from '../components/HeroSection/Herosection.tsx'
import Works from '../components/works/Works.tsx'


function Home() {

  return (
    <>
      <Header />
      <main>
        <Herosection />
        <Works />
      </main>
      
      
    </>
  )
}

export default Home