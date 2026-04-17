import Header from '../components/Header/Header.tsx'
import Herosection from '../components/HeroSection/Herosection.tsx'
import Works from '../components/works/Works.tsx'
import CareServices from '../components/CareServices/CareServices'
import WhyUs from '../components/Why_Us/WhyUs.tsx'
import Support from '../components/Support/Support.tsx'


function Home() {

  return (
    <>
      <Header />
      <main>
        <Herosection />
        <Works />
        <CareServices />
        <WhyUs />
        <Support />
      </main>
      
      
    </>
  )
}

export default Home