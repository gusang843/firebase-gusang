// src/components/FeatureTabs.js (새로 생성)

import React from 'react';

function FeatureTabs() {
    const tabs = ['정보', '정리', '구독', 'PDF'];

    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '20px', 
            marginTop: '80px', // HeroSection과의 간격
            marginBottom: '50px' // 페이지 하단과의 간격
        }}>
            {tabs.map((tab, index) => (
                <button 
                    key={index}
                    style={{
                        padding: '12px 30px',
                        backgroundColor: '#007bff', // 파란색 버튼
                        color: 'white',
                        border: '2px solid #007bff', // 테두리도 파란색
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        transition: 'background-color 0.2s, border-color 0.2s'
                    }}
                    // 실제 구현 시 각 탭에 따라 다른 페이지로 이동하거나 모달을 띄울 수 있습니다.
                    onClick={() => console.log(`${tab} 탭 클릭!`)} 
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}

export default FeatureTabs;