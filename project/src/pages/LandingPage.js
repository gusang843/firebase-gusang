// src/pages/LandingPage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'; // Header 컴포넌트 사용

function LandingPage() {
    const navigate = useNavigate();

    const handleStartClick = () => {
        // "시작하기" 버튼을 누르면 회원가입 페이지로 이동
        navigate('/signup');
    };

    return (
        <div style={styles.container}>
            {/* 1. Header: 로그인 버튼을 표시 (loggedIn=false) */}
            <Header loggedIn={false} />

            {/* 2. 서비스 소개 섹션 */}
            <main style={styles.mainContent}>
                <div style={styles.textContainer}>
                    <h2 style={styles.slogan}>
                        흩어진 증명서를 한 곳에,<br />
                        나만의 정보 정리 서비스
                    </h2>
                    <p style={styles.description}>
                        경력, 학력, 자격증 등 복잡하게 얽힌 개인 정보를 간편하게 등록하고,<br />
                        필요할 때마다 깔끔한 PDF 보고서로 만들어 보세요.
                    </p>
                    
                    {/* 3. 시작하기 버튼 (회원가입 페이지로 연결) */}
                    <button 
                        onClick={handleStartClick} 
                        style={styles.startButton}
                    >
                        서비스 시작하기 (회원가입)
                    </button>
                </div>

                <div style={styles.imagePlaceholder}>
                    {/* Placeholder for a relevant image */}
                    
                </div>
            </main>

            {/* 4. Footer 또는 추가 설명 섹션 */}
            <footer style={styles.footer}>
                <p>&copy; 2024 내 증명서 정보 정리 서비스. 모든 권리 보유.</p>
            </footer>
        </div>
    );
}

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#f9fafb', // 연한 배경
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    mainContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '80px 40px',
        maxWidth: '1000px',
        width: '100%',
        flexGrow: 1, // 중앙 콘텐츠가 확장되도록 설정
    },
    textContainer: {
        maxWidth: '50%',
        textAlign: 'left',
    },
    slogan: {
        fontSize: '48px',
        fontWeight: 'extrabold',
        color: '#1f2937',
        lineHeight: '1.2',
        marginBottom: '20px',
    },
    description: {
        fontSize: '18px',
        color: '#6b7280',
        lineHeight: '1.6',
        marginBottom: '40px',
    },
    startButton: {
        padding: '15px 30px',
        backgroundColor: '#007bff', // 파란색 버튼
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '18px',
        fontWeight: 'bold',
        boxShadow: '0 4px 6px rgba(0, 123, 255, 0.3)',
        transition: 'background-color 0.2s',
    },
    imagePlaceholder: {
        width: '40%',
        height: '300px',
        backgroundColor: '#e5e7eb', // 이미지 영역 표시
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#9ca3af',
        fontSize: '16px',
        border: '2px dashed #d1d5db',
    },
    footer: {
        padding: '20px',
        width: '100%',
        textAlign: 'center',
        fontSize: '14px',
        color: '#9ca3af',
        borderTop: '1px solid #eee',
        marginTop: 'auto', // 하단에 붙도록 설정
    }
};

export default LandingPage;