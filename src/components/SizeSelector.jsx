import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { formatCurrency } from '../lib/utils';
import { PRICING_DATA } from '../data/pricing';

const SizeSelector = ({ selectedId, onSelect }) => {
    return (
        <div className="grid-2" style={{ gap: '16px' }}>
            {PRICING_DATA.map((item) => {
                const isSelected = selectedId === item.id;
                return (
                    <motion.div
                        key={item.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onSelect(item)}
                        style={{
                            background: isSelected ? '#FFF7ED' : 'white', // Orange-50 vs White
                            border: isSelected ? '2px solid #F59E0B' : '1px solid #E2E8F0',
                            borderRadius: '16px',
                            padding: '20px',
                            cursor: 'pointer',
                            position: 'relative',
                            textAlign: 'center',
                            boxShadow: isSelected ? '0 4px 12px rgba(245, 158, 11, 0.2)' : 'none',
                            transition: 'all 0.2s',
                        }}
                    >
                        {isSelected && (
                            <div style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                background: '#F59E0B',
                                color: 'white',
                                borderRadius: '50%',
                                width: '24px',
                                height: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Check size={14} strokeWidth={3} />
                            </div>
                        )}

                        <h3 style={{ margin: '0 0 8px', fontSize: '1.25rem', color: isSelected ? '#B45309' : '#334155' }}>
                            {item.name}
                        </h3>
                        <div style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '4px' }}>
                            {item.gridSize}
                        </div>
                        <div style={{ fontSize: '1rem', fontWeight: '600', color: '#EA580C' }}> {/* Orange-600 */}
                            {formatCurrency(item.price)}
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default SizeSelector;
