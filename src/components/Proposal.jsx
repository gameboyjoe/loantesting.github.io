import React, { useMemo, useState } from 'react';
import { formatCurrency } from '../lib/utils';
import { Download, FileText } from 'lucide-react';

const Proposal = ({ system, params }) => {
    const [customer, setCustomer] = useState({ name: '', phone: '' });

    const pricingOption = useMemo(() => {
        return system.options.find(o => o.downPaymentPercent === params.downPaymentPercent);
    }, [system, params.downPaymentPercent]);

    const installment = useMemo(() => {
        return pricingOption?.installments.find(i => i.months === params.months);
    }, [pricingOption, params.months]);

    const estimatedSavings = useMemo(() => {
        if (system.id.includes('3kw')) return 1600;
        if (system.id.includes('5kw')) return 2880;
        if (system.id.includes('10kw')) return 5800;
        return 0;
    }, [system]);

    const totalPayment = (installment?.payment * params.months) + pricingOption.downPaymentAmount;
    const roiYears = (totalPayment / (estimatedSavings * 12)).toFixed(1);

    return (
        <div className="animate-fade-in">
            {/* Customer Form */}
            <div style={{ marginBottom: '24px', background: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #E2E8F0' }}>
                <h3 style={{ margin: '0 0 16px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}>
                    <FileText size={18} className="text-amber-500" color="#F59E0B" /> ข้อมูลลูกค้า
                </h3>
                <div style={{ marginBottom: '12px' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px', color: '#64748B' }}>ชื่อลูกค้า</label>
                    <input
                        type="text"
                        value={customer.name}
                        onChange={e => setCustomer({ ...customer, name: e.target.value })}
                        placeholder="กรอกชื่อ นามสกุล"
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }}
                    />
                </div>
                <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px', color: '#64748B' }}>เบอร์โทรศัพท์</label>
                    <input
                        type="tel"
                        value={customer.phone}
                        onChange={e => setCustomer({ ...customer, phone: e.target.value })}
                        placeholder="0xx-xxx-xxxx"
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }}
                    />
                </div>
            </div>

            {/* Summary Details */}
            <div style={{ background: 'white', borderRadius: '16px', padding: '24px', marginBottom: '24px', border: '1px solid #E2E8F0' }}>
                <h3 style={{ margin: '0 0 20px', fontSize: '1rem', color: '#1E293B' }}>💎 สรุปการลงทุน</h3>

                <Row label="ระบบโซล่าร์" value={system.name} />
                <Row label="ราคาแพ็คเกจ" value={formatCurrency(system.price)} />
                <Row label={`เงินดาวน์ (${params.downPaymentPercent}%)`} value={formatCurrency(pricingOption.downPaymentAmount)} highlight />
                <Row label={`ผ่อนชำระ ${params.months} เดือน`} value={`${formatCurrency(installment.payment)}/เดือน`} highlightColor="#EA580C" /> {/* Orange-600 */}

                <div style={{ height: '1px', background: '#E2E8F0', margin: '16px 0' }}></div>

                <Row label="ประหยัดค่าไฟ/เดือน (โดยประมาณ)" value={formatCurrency(estimatedSavings)} highlightColor="#10B981" />
                <Row label="ระยะเวลาคืนทุน (ประมาณ)" value={`${roiYears} ปี`} />
                <Row label="กำไรสุทธิ 25 ปี" value={formatCurrency((estimatedSavings * 12 * 25) - totalPayment)} highlightColor="#10B981" />
            </div>

            <button
                className="btn no-print"
                onClick={() => window.print()}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
                <Download size={20} /> ดาวน์โหลด Proposal
            </button>

            <div className="no-print" style={{ marginTop: '20px', fontSize: '0.8rem', color: '#64748B', lineHeight: '1.5', background: '#F8FAFC', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <strong>💡 วิธีบันทึกเป็น PDF:</strong><br />
                1. กดปุ่ม "ดาวน์โหลด Proposal"<br />
                2. หน้าต่าง Print จะเปิดขึ้น<br />
                3. เลือก "Save as PDF"<br />
                4. กด Save เพื่อบันทึกไฟล์
            </div>
        </div>
    );
};

const Row = ({ label, value, highlight, highlightColor }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
        <span style={{ color: '#64748B', fontSize: '0.9rem' }}>{label}</span>
        <span style={{
            fontWeight: highlight || highlightColor ? '600' : '400',
            color: highlightColor || (highlight ? '#1E293B' : '#1E293B')
        }}>{value}</span>
    </div>
);

export default Proposal;
