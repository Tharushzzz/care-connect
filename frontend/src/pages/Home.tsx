import Header from '../components/Header/Header.tsx'
import Herosection from '../components/HeroSection/Herosection.tsx'
import Works from '../components/works/Works.tsx'
import CareServices from '../components/CareServices/CareServices'


function Home() {

  return (
    <>
      <Header />
      <main>
        <Herosection />
        <Works />
        <CareServices />
      </main>
      
      
    </>
  )
}

export default Home