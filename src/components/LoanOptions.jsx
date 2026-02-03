import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '../lib/utils';

const LoanOptions = ({ system, params, onChange }) => {
    const pricingOption = useMemo(() => {
        return system.options.find(o => o.downPaymentPercent === params.downPaymentPercent);
    }, [system, params.downPaymentPercent]);

    const installment = useMemo(() => {
        return pricingOption?.installments.find(i => i.months === params.months);
    }, [pricingOption, params.months]);

    const downPaymentAmounts = [10, 15, 20, 25];
    const terms = [48, 60, 72, 84];

    return (
        <div className="animate-fade-in">
            {/* Summary Header */}
            <div style={{
                background: '#F8FAFC',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                border: '1px solid #E2E8F0'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '1.2rem' }}>☀️</span>
                    <div>
                        <div style={{ fontSize: '0.8rem', color: '#64748B' }}>ระบบ</div>
                        <div style={{ fontWeight: '600', color: '#334155' }}>{system.name} ({system.gridSize})</div>
                    </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.8rem', color: '#64748B' }}>ราคารวม</div>
                    <div style={{ fontWeight: '600', color: '#EA580C' }}>{formatCurrency(system.price)}</div>
                </div>
            </div>

            {/* Down Payment Selector */}
            <div style={{ marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 12px', fontSize: '0.9rem', color: '#475569' }}>
                    เงินดาวน์ (Down Payment)
                    <span style={{ float: 'right', fontWeight: '600', color: '#EA580C' }}>
                        {formatCurrency(pricingOption?.downPaymentAmount || 0)}
                    </span>
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                    {downPaymentAmounts.map((pct) => (
                        <button
                            key={pct}
                            onClick={() => onChange({ ...params, downPaymentPercent: pct })}
                            style={{
                                padding: '10px 4px',
                                borderRadius: '8px',
                                border: params.downPaymentPercent === pct ? '2px solid #F59E0B' : '1px solid #E2E8F0',
                                background: params.downPaymentPercent === pct ? '#FFF7ED' : 'white',
                                color: params.downPaymentPercent === pct ? '#B45309' : '#64748B',
                                fontWeight: '500',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                transition: 'all 0.2s'
                            }}
                        >
                            {pct}%
                        </button>
                    ))}
                </div>
            </div>

            {/* Term Selector */}
            <div style={{ marginBottom: '32px' }}>
                <h4 style={{ margin: '0 0 12px', fontSize: '0.9rem', color: '#475569' }}>
                    ระยะเวลาผ่อน (Duration)
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                    {terms.map((m) => (
                        <button
                            key={m}
                            onClick={() => onChange({ ...params, months: m })}
                            style={{
                                padding: '10px 4px',
                                borderRadius: '8px',
                                border: params.months === m ? '2px solid #F59E0B' : '1px solid #E2E8F0',
                                background: params.months === m ? '#FFF7ED' : 'white',
                                color: params.months === m ? '#B45309' : '#64748B',
                                fontWeight: '500',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                transition: 'all 0.2s'
                            }}
                        >
                            {m} เดือน
                        </button>
                    ))}
                </div>
            </div>

            {/* Result Card */}
            <motion.div
                layout
                style={{
                    background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)', // Dark Slate
                    borderRadius: '20px',
                    padding: '24px',
                    color: 'white',
                    textAlign: 'center',
                    boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.4)'
                }}
            >
                <div style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '4px', color: '#94A3B8' }}>ค่างวดต่อเดือน (Monthly Payment)</div>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '8px', color: '#F59E0B' }}>
                    {formatCurrency(installment?.payment || 0)}
                </div>
                <div style={{ fontSize: '0.8rem', opacity: 0.8, color: '#CBD5E1' }}>
                    Flat Rate ~4.49% / ปี
                </div>

                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: '#94A3B8' }}>ยอดจัดสินเชื่อ</span>
                    <span style={{ fontWeight: '500' }}>{formatCurrency(pricingOption?.loanAmount || 0)}</span>
                </div>
            </motion.div>
        </div>
    );
};

export default LoanOptions;
