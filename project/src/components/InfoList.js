// src/components/InfoList.js (재로딩 및 삭제 기능 포함)

import React, { useState, useEffect } from 'react';
import { auth, fetchIdeas, deleteIdea } from '../firebase'; 

function InfoList() {
    const [infoItems, setInfoItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = auth.currentUser; 

    // ⭐️ Firestore에서 현재 사용자의 데이터를 불러오는 함수
    const fetchCertifications = async () => {
        if (!user) {
            setLoading(false);
            setInfoItems([]);
            return;
        }

        setLoading(true);
        try {
            const ideas = await fetchIdeas(user.uid);
            
            const mappedItems = ideas.map(item => ({
                id: item.id,
                type: item.category || 'N/A', 
                title: item.text || 'N/A',     
                date: item.priority || 'N/A',  
            }));
            
            setInfoItems(mappedItems);
        } catch (error) {
            console.error("데이터 불러오기 에러: ", error);
            alert("데이터를 불러오는 중 오류가 발생했습니다. 콘솔을 확인해주세요.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // MainPage에서 key가 변경되어 재마운트될 때마다 실행됨
        fetchCertifications();
    }, []); 

    // 데이터 삭제 함수
    const handleDelete = async (itemId) => {
        if (!user) {
            alert("로그인 정보가 유효하지 않아 삭제할 수 없습니다.");
            return;
        }
        if (!window.confirm("정말 이 항목을 삭제하시겠습니까?")) return;

        try {
            await deleteIdea(user.uid, itemId);
            
            // 화면 목록에서 즉시 제거
            setInfoItems(prevItems => prevItems.filter(item => item.id !== itemId));
            alert("항목이 성공적으로 삭제되었습니다.");
            
        } catch (error) {
            console.error("데이터 삭제 에러: ", error);
            alert("삭제 중 오류가 발생했습니다. 콘솔을 확인해주세요.");
        }
    };
    
    // 스타일 정의
    const styles = {
        th: { padding: '10px', textAlign: 'left', border: '1px solid #ddd' },
        td: { padding: '10px', border: '1px solid #ddd', fontSize: '14px' },
        actionBtn: (color, marginLeft = '0') => ({
            padding: '5px 10px',
            marginLeft: marginLeft,
            backgroundColor: color,
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer',
        })
    };


    if (loading) {
        return <p style={{ textAlign: 'center', margin: '50px' }}>데이터를 불러오는 중입니다...</p>;
    }

    return (
        <div style={{ maxWidth: '800px', margin: '20px auto' }}>
            <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>정리된 증명서 목록</h3>
            
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th style={styles.th}>구분 (category)</th>
                        <th style={styles.th}>제목 (text)</th>
                        <th style={styles.th}>기간/취득일 (priority)</th>
                        <th style={styles.th}>관리</th>
                    </tr>
                </thead>
                <tbody>
                    {infoItems.map(item => (
                        <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={styles.td}>{item.type}</td>
                            <td style={styles.td}>{item.title}</td>
                            <td style={styles.td}>{item.date}</td>
                            <td style={styles.td}>
                                <button onClick={() => handleDelete(item.id)} style={styles.actionBtn('red')}>삭제</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            {infoItems.length === 0 && <p style={{ textAlign: 'center', marginTop: '20px' }}>아직 등록된 정보가 없습니다. 정보를 입력해보세요!</p>}
        </div>
    );
}

export default InfoList;