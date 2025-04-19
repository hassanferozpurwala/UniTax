import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import StudentType from './components/StudentType';
import LocalStudentQuestionnaire from './components/LocalStudentQuestionnaire';
import InternationalStudentQuestionnaire from './components/InternationalStudentQuestionnaire';
import BasicInfoForm from './components/BasicInfoForm';
import IncomeSourcesForm from './components/IncomeSourcesForm';
import EducationCredits from './components/EducationCredits';
import Deductions from './components/Deductions';
import TaxSummary from './components/TaxSummary';
import FilingSuccess from './components/FilingSuccess';

function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/student-type" element={<StudentType />} />
            <Route path="/local-student" element={<LocalStudentQuestionnaire />} />
            <Route path="/international-student" element={<InternationalStudentQuestionnaire />} />
            <Route path="/basic-info" element={<BasicInfoForm />} />
            <Route path="/income-sources" element={<IncomeSourcesForm />} />
            <Route path="/education-credits" element={<EducationCredits />} />
            <Route path="/deductions" element={<Deductions />} />
            <Route path="/summary" element={<TaxSummary />} />
            <Route path="/filing-success" element={<FilingSuccess />} />
          </Routes>
        </main>
        <Footer />
        <Chatbot />
      </div>
    </Router>
  );
}

export default App