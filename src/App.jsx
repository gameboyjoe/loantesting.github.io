import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Stepper from './components/Stepper';
import SizeSelector from './components/SizeSelector';
import LoanOptions from './components/LoanOptions';
import Proposal from './components/Proposal';
import { PRICING_DATA } from './data/pricing';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [step, setStep] = useState(1);
  const [selectedSystemId, setSelectedSystemId] = useState(PRICING_DATA[1].id); // Default 5kW
  const [loanParams, setLoanParams] = useState({ downPaymentPercent: 20, months: 60 });

  const selectedSystem = PRICING_DATA.find(Sys => Sys.id === selectedSystemId);

  const nextStep = () => setStep(s => Math.min(s + 1, 3));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const contentVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="container" style={{ paddingBottom: '80px' }}>
      <Header />
      <Stepper currentStep={step} />

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          variants={contentVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          {step === 1 && (
            <div className="card">
              <h2 className="section-title">⚡ เลือกขนาดระบบ (Select System)</h2>
              <SizeSelector
                selectedId={selectedSystemId}
                onSelect={(sys) => setSelectedSystemId(sys.id)}
              />

              <div style={{ marginTop: '24px' }}>
                <button className="btn" onClick={nextStep}>
                  ถัดไป: เลือกเงื่อนไขสินเชื่อ →
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="card">
              <LoanOptions
                system={selectedSystem}
                params={loanParams}
                onChange={setLoanParams}
              />
              <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
                <button className="btn btn-secondary" onClick={prevStep} style={{ width: '40%' }}>
                  ← ย้อนกลับ
                </button>
                <button className="btn" onClick={nextStep} style={{ width: '60%' }}>
                  ถัดไป →
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="card" style={{ background: 'transparent', border: 'none', boxShadow: 'none' }}>
              <Proposal system={selectedSystem} params={loanParams} />
              <div className="no-print" style={{ marginTop: '16px', textAlign: 'center' }}>
                <button className="btn btn-secondary" onClick={prevStep}>
                  ← แก้ไขข้อมูล
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <Footer />
    </div>
  );
}

export default App;
