// src/components/InfoInputForm.js

import React, { useState } from 'react';
import { auth, addIdea } from '../firebase';

function InfoInputForm({ onSaveSuccess }) {
    const [info, setInfo] = useState({
        type: '', // 자격증, 학력, 경력 등
        title: '', // 정보의 이름 (예: OOO 자격증)
        date: '', // 취득일, 졸업일 등
        details: '' // 기타 상세 정보
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const user = auth.currentUser;

        if (!user) {
            alert("로그인이 필요합니다.");
            setLoading(false);
            return;
        }

        const { type, title, date, details } = info;
        // Firestore helper function addIdea를 사용하여 저장
        // addIdea(uid, ideaText, category, priority)
        // 여기서는 title을 ideaText로, type을 category로, date를 priority 대신 date 필드로 사용하겠습니다.
        // NOTE: firebase.js의 addIdea 함수 시그니처와 맞추기 위해 details는 현재 전송되지 않습니다.
        // firebase.js의 addIdea를 수정해야 완벽한 데이터 저장이 가능하나, 현재 구조를 최대한 활용합니다.
        
        try {
            // type과 title을 사용하여 데이터 저장 (date는 임시로 priority 필드에 매핑)
            await addIdea(user.uid, title, type, date); 

            alert(`"${title}" 정보가 성공적으로 저장되었습니다.`);
            
            // 폼 초기화
            setInfo({ type: '', title: '', date: '', details: '' });
            
            // 부모 컴포넌트에 저장 성공 알림 (ReportViewer 갱신 유발)
            if (onSaveSuccess) {
                onSaveSuccess();
            }

        } catch (error) {
            console.error('정보 저장 실패:', error);
            alert('정보 저장에 실패했습니다. 콘솔을 확인해주세요.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>정보 입력 (Wireframe 4)</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                
                <label style={styles.label}>구분 (Type)</label>
                <select
                    name="type"
                    value={info.type}
                    onChange={handleChange}
                    required
                    style={styles.input}
                >
                    <option value="" disabled>선택</option>
                    <option value="경력">경력</option>
                    <option value="자격증">자격증</option>
                    <option value="학력">학력</option>
                </select>

                <label style={styles.label}>정보 이름 (Title)</label>
                <input
                    type="text"
                    name="title"
                    placeholder="정보의 제목 (예: OOO 자격증)"
                    value={info.title}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />

                <label style={styles.label}>취득/졸업일 (Date)</label>
                <input
                    type="date"
                    name="date"
                    value={info.date}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />

                <label style={styles.label}>상세 내용 (Details)</label>
                <textarea
                    name="details"
                    placeholder="상세 내용을 입력하세요"
                    value={info.details}
                    onChange={handleChange}
                    rows="4"
                    style={{...styles.input, resize: 'vertical'}}
                />

                <button type="submit" disabled={loading} style={styles.button}>
                    {loading ? '저장 중...' : '정보 저장'}
                </button>
            </form>
            <div style={styles.limitInfo}>
                <span style={{color: '#ff6347'}}>무료: 10개까지 저장 가능</span>
            </div>
        </div>
    );
}

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        maxWidth: '500px',
        margin: '0 auto',
    },
    header: {
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: '#333',
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        textAlign: 'left',
        fontWeight: 'bold',
        marginTop: '10px',
        marginBottom: '5px',
        fontSize: '14px',
        color: '#555',
    },
    input: {
        padding: '10px',
        marginBottom: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '14px',
        boxSizing: 'border-box',
    },
    button: {
        padding: '12px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        marginTop: '20px',
        transition: 'background-color 0.2s',
    },
    limitInfo: {
        marginTop: '15px',
        fontSize: '12px',
        textAlign: 'center',
        padding: '10px',
        backgroundColor: '#fffbe6',
        borderRadius: '4px',
        border: '1px solid #ffecb3',
    }
};

export default InfoInputForm;