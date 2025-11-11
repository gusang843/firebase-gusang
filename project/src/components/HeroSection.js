// src/components/HeroSection.js
// (Wireframe 1의 핵심 소개 영역)

import React from 'react';

function HeroSection() {
    return (
        <section style={{ 
            textAlign: 'center', 
            padding: '80px 20px', 
            backgroundColor: '#f8f9fa' 
        }}>
            <h2>사용자가 졸업증, 자격증, 경력 등 정보를</h2>
            <h2 style={{ marginTop: '5px' }}>직접 입력할 수 있습니다.</h2>
            <p style={{ fontSize: '18px', color: '#555', marginTop: '20px' }}>
                흩어져 있는 내 커리어 정보를 한곳에 모아 PDF로 관리하세요.
            </p>
        </section>
    );
}

export default HeroSection;