import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import FeatureStrip from './components/FeatureStrip'
import ContentSection from './components/ContentSection'
import DevicesSection from './components/DevicesSection'
import PricingSection from './components/PricingSection'
import FaqSection from './components/FaqSection'
import Footer from './components/Footer'
import RegisterModal from './components/RegisterModal'
import StickyBar from './components/StickyBar'

export default function App() {
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  return (
    <>
      <Header onRegister={openModal} />
      <Hero onRegister={openModal} />
      <FeatureStrip />
      <ContentSection />
      <DevicesSection onRegister={openModal} />
      <PricingSection onRegister={openModal} />
      <FaqSection />
      <Footer onRegister={openModal} />
      <StickyBar onRegister={openModal} />
      {modalOpen && <RegisterModal onClose={closeModal} />}
    </>
  )
}
