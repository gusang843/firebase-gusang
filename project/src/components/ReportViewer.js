// src/components/ReportViewer.js

import React, { useState, useEffect, useCallback } from 'react';
import { auth, fetchIdeas, deleteIdea } from '../firebase';

// NOTE: data structure: { id, text (title), category (type), priority (date), createdAt }

function ReportViewer({ refreshTrigger }) {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedReport, setSelectedReport] = useState(null); // 상세 보기 용
    const user = auth.currentUser;

    // 데이터 로딩 함수 (refetchIdeas)
    const loadReports = useCallback(async () => {
        if (!user) {
            setLoading(false);
            return;
        }
        setLoading(true);
        try {
            const data = await fetchIdeas(user.uid);
            // 최신 항목이 위로 오도록 정렬
            data.sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate()); 
            setReports(data);
        } catch (error) {
            console.error('보고서 불러오기 실패:', error);
            setReports([]);
        } finally {
            setLoading(false);
        }
    }, [user]);

    // refreshTrigger가 변경되거나 컴포넌트가 마운트될 때 데이터 로드
    useEffect(() => {
        loadReports();
    }, [loadReports, refreshTrigger]);

    const handleDelete = async (ideaId, title) => {
        if (window.confirm(`정말로 "${title}" 정보를 삭제하시겠습니까?`)) {
            try {
                await deleteIdea(user.uid, ideaId);
                alert("정보가 삭제되었습니다.");
                loadReports(); // 목록 새로고침
            } catch (error) {
                console.error("삭제 실패:", error);
                alert("삭제에 실패했습니다.");
            }
        }
    };
    
    // 상세 보기 닫기
    const handleCloseDetail = () => setSelectedReport(null);

    // 상세 보기 열기
    const handleViewDetail = (report) => {
        setSelectedReport(report);
    }

    if (!user) {
        return <div style={styles.centerText}>로그인 후 정리된 정보를 확인하세요.</div>;
    }

    if (loading) {
        return <div style={styles.centerText}>데이터를 불러오는 중입니다...</div>;
    }

    if (reports.length === 0) {
        return <div style={styles.centerText}>아직 저장된 정보가 없습니다. '정보' 탭에서 새 정보를 입력하세요.</div>;
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>정리된 정보 목록 (Wireframe 5)</h2>
            <div style={styles.reportGrid}>
                {reports.map((report) => (
                    <div key={report.id} style={styles.reportItem}>
                        <div style={styles.reportTitle}>
                            <span style={styles.categoryBadge}>{report.category}</span>
                            {report.text}
                        </div>
                        <div style={styles.reportDate}>
                            {report.priority}
                        </div>
                        <div style={styles.actions}>
                            <button 
                                onClick={() => handleViewDetail(report)} 
                                style={{...styles.actionButton, backgroundColor: '#17a2b8'}}
                            >
                                상세
                            </button>
                            <button 
                                onClick={() => handleDelete(report.id, report.text)} 
                                style={{...styles.actionButton, backgroundColor: '#dc3545'}}
                            >
                                삭제
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* 상세 정보 모달 */}
            {selectedReport && (
                <div style={styles.modalBackdrop}>
                    <div style={styles.modalContent}>
                        <h3 style={styles.modalHeader}>{selectedReport.text}</h3>
                        <p><strong>구분:</strong> {selectedReport.category}</p>
                        <p><strong>취득일/졸업일:</strong> {selectedReport.priority}</p>
                        <p><strong>저장일:</strong> {selectedReport.createdAt.toDate().toLocaleDateString()}</p>
                        <p><strong>상세:</strong> {/* 상세 정보 필드가 없으므로 임시 더미 데이터 */ selectedReport.text} 관련 상세 내용 (임시)</p>
                        <button onClick={handleCloseDetail} style={styles.modalCloseButton}>닫기</button>
                    </div>
                </div>
            )}
        </div>
    );
}

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        maxWidth: '800px',
        margin: '0 auto',
    },
    header: {
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: '#333',
        textAlign: 'center',
    },
    centerText: {
        textAlign: 'center',
        padding: '40px',
        fontSize: '16px',
        color: '#666',
    },
    reportGrid: {
        display: 'grid',
        gap: '15px',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    },
    reportItem: {
        border: '1px solid #eee',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        backgroundColor: '#f9f9f9',
        display: 'flex',
        flexDirection: 'column',
    },
    reportTitle: {
        fontSize: '16px',
        fontWeight: 'bold',
        marginBottom: '8px',
        display: 'flex',
        alignItems: 'center',
        color: '#007bff',
    },
    categoryBadge: {
        fontSize: '12px',
        fontWeight: 'normal',
        backgroundColor: '#e9ecef',
        color: '#495057',
        padding: '3px 8px',
        borderRadius: '4px',
        marginRight: '10px',
    },
    reportDate: {
        fontSize: '14px',
        color: '#6c757d',
        marginBottom: '10px',
    },
    actions: {
        marginTop: 'auto',
        display: 'flex',
        gap: '10px',
    },
    actionButton: {
        padding: '8px 12px',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        transition: 'opacity 0.2s',
    },
    // 모달 스타일
    modalBackdrop: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '10px',
        maxWidth: '90%',
        width: '400px',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    },
    modalHeader: {
        borderBottom: '2px solid #007bff',
        paddingBottom: '10px',
        marginBottom: '20px',
        fontSize: '22px',
        color: '#007bff',
    },
    modalCloseButton: {
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#6c757d',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    }
};

export default ReportViewer;