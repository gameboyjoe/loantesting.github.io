import React from 'react';

const Stepper = ({ currentStep }) => {
    const steps = [1, 2, 3];

    // Brand colors
    const activeColor = '#F59E0B'; // Amber
    const inactiveColor = '#E2E8F0'; // Slate 200
    const inactiveText = '#94A3B8'; // Slate 400

    return (
        <div className="no-print" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '32px' }}>
            {steps.map((step, index) => {
                const isActive = currentStep >= step;
                const isCurrent = currentStep === step;
                return (
                    <React.Fragment key={step}>
                        <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            background: isActive ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' : inactiveColor,
                            color: isActive ? 'white' : inactiveText,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: '600',
                            transition: 'all 0.3s',
                            zIndex: 1,
                            boxShadow: isActive ? '0 4px 6px -1px rgba(245, 158, 11, 0.4)' : 'none'
                        }}>
                            {step}
                        </div>
                        {index < steps.length - 1 && (
                            <div style={{
                                width: '40px',
                                height: '4px',
                                background: isActive && currentStep > step ? activeColor : inactiveColor,
                                margin: '0 8px',
                                borderRadius: '2px',
                                transition: 'all 0.3s'
                            }} />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default Stepper;
