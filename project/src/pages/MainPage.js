// src/pages/MainPage.js

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase'; 
import Header from '../components/Header';
import InfoInputForm from '../components/InfoInputForm';
import ReportViewer from '../components/ReportViewer';
import SubscriptionCard from '../components/SubscriptionCard';

function MainPage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('정보'); // 현재 활성화된 탭
    const [refreshReports, setRefreshReports] = useState(0); // ReportViewer 갱신용
    const navigate = useNavigate();

    // Firebase Auth 상태 리스너 (로그인 상태 확인)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                // 로그인하지 않은 경우 랜딩 페이지로 강제 이동
                navigate('/');
            }
            setLoading(false);
        });
        return () => unsubscribe(); // 클린업
    }, [navigate]);

    // InfoInputForm에서 정보 저장 성공 시 ReportViewer를 갱신하도록 트리거
    const handleSaveSuccess = useCallback(() => {
        setRefreshReports(prev => prev + 1);
        setActiveTab('정리'); // 저장 후 바로 정리 탭으로 이동
    }, []);

    // 탭 콘텐츠 렌더링 함수
    const renderContent = () => {
        switch (activeTab) {
            case '정보':
                return <InfoInputForm onSaveSuccess={handleSaveSuccess} />; // Wireframe 4
            case '정리':
                return <ReportViewer refreshTrigger={refreshReports} />; // Wireframe 5
            case '구독':
                return <SubscriptionCard />; // Wireframe 6
            case 'PDF':
                // Wireframe 7
                return (
                    <div style={styles.pdfContainer}>
                        <h2 style={styles.pdfHeader}>PDF 다운로드 (Wireframe 7)</h2>
                        <p style={styles.pdfText}>
                            저장된 정보를 기반으로 보고서를 생성하고 PDF 파일로 다운로드 할 수 있습니다.
                        </p>
                        <div style={styles.pdfIcon}>
                            📄
                        </div>
                        <button style={styles.pdfButton}>
                            PDF 보고서 다운로드
                        </button>
                    </div>
                );
            default:
                return <div>탭을 선택해주세요.</div>;
        }
    };

    if (loading) {
        return <div style={styles.fullCenter}>로그인 상태를 확인 중입니다...</div>;
    }

    return (
        <div style={styles.container}>
            <Header loggedIn={!!user} />

            <div style={styles.mainArea}>
                {/* 탭 네비게이션 */}
                <div style={styles.tabContainer}>
                    {['정보', '정리', '구독', 'PDF'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                ...styles.tabButton,
                                ...(activeTab === tab ? styles.activeTab : {})
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* 탭 콘텐츠 */}
                <div style={styles.contentArea}>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#f4f7f9',
    },
    mainArea: {
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    tabContainer: {
        display: 'flex',
        borderBottom: '2px solid #ccc',
        marginBottom: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    },
    tabButton: {
        padding: '15px 25px',
        border: 'none',
        backgroundColor: 'transparent',
        fontSize: '16px',
        fontWeight: '500',
        cursor: 'pointer',
        color: '#666',
        transition: 'color 0.2s, background-color 0.2s',
        flexGrow: 1,
    },
    activeTab: {
        color: '#007bff',
        borderBottom: '3px solid #007bff',
        backgroundColor: '#e6f7ff',
        fontWeight: 'bold',
    },
    contentArea: {
        padding: '20px 0',
    },
    fullCenter: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        fontSize: '20px',
        color: '#333',
    },
    // PDF 탭 스타일
    pdfContainer: {
        textAlign: 'center',
        padding: '50px 20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        maxWidth: '600px',
        margin: '0 auto',
    },
    pdfHeader: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#dc3545',
        marginBottom: '15px',
    },
    pdfText: {
        fontSize: '16px',
        color: '#555',
        marginBottom: '30px',
    },
    pdfIcon: {
        fontSize: '80px',
        marginBottom: '30px',
    },
    pdfButton: {
        padding: '15px 30px',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '18px',
        fontWeight: 'bold',
        transition: 'background-color 0.2s',
    }
};

export default MainPage;