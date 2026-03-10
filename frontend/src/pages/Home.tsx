import Header from '../components/Header.tsx'
import Herosection from '../components/Herosection.tsx'
import Works from '../components/Works.tsx'


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