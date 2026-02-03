import React from 'react';
import { Zap } from 'lucide-react';

const Header = () => {
    return (
        <div className="header-container">
            <div className="header-content">
                <div className="header-icon-box">
                    <Zap fill="white" stroke="white" size={24} />
                </div>

                <div className="header-title-box">
                    <h1 className="header-title">
                        JDEE Electric Shop
                    </h1>
                    <p className="header-subtitle">
                        Solar Investment Calculator
                    </p>
                </div>
            </div>

            <div className="header-badge-container">
                <span className="header-badge">
                    Authorized Dealer & Installer
                </span>
            </div>
        </div>
    );
};

export default Header;
