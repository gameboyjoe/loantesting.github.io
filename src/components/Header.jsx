import React from 'react';
import { Zap } from 'lucide-react';

const Header = () => {
    return (
        <div style={{ textAlign: 'center', padding: '40px 20px 20px' }}>
            <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
            }}>
                {/* Changed icon to Zap (Electricity) and color to branding */}
                <div style={{
                    background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                    padding: '8px',
                    borderRadius: '12px',
                    display: 'flex',
                    boxShadow: '0 4px 6px -1px rgba(245, 158, 11, 0.3)'
                }}>
                    <Zap fill="white" stroke="white" size={24} />
                </div>

                <div style={{ textAlign: 'left' }}>
                    <h1 style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        margin: 0,
                        color: '#1E293B', // Slate 800
                        lineHeight: 1.1
                    }}>
                        JDEE Electric Shop
                    </h1>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748B', fontWeight: '500' }}>
                        Solar Investment Calculator
                    </p>
                </div>
            </div>

            <div style={{ marginTop: '16px' }}>
                <span style={{
                    background: '#FFF7ED',
                    border: '1px solid #FFEDD5',
                    color: '#B45309',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                }}>
                    Authorized Dealer & Installer
                </span>
            </div>
        </div>
    );
};

export default Header;
