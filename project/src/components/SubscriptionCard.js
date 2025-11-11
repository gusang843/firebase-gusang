// src/components/SubscriptionCard.js

import React from 'react';

function SubscriptionCard() {
    return (
        <div style={styles.card}>
            <h3 style={styles.header}>프리미엄 구독 (Premium Subscription)</h3>
            <p style={styles.text}>
                구독 서비스를 이용하시면 PDF 다운로드, 고급 정렬, 그리고 AI 기반의 내용 분석 기능을 무제한으로 이용하실 수 있습니다.
            </p>
            
            <div style={styles.priceContainer}>
                <span style={styles.price}>월 9,900원</span>
                <span style={styles.period}>/ 월 (VAT 포함)</span>
            </div>

            <ul style={styles.featuresList}>
                <li>✅ PDF 보고서 무제한 다운로드</li>
                <li>✅ 커스텀 정렬 및 필터링 기능</li>
                <li>✅ AI 기반 맞춤형 문서 템플릿 제공</li>
                <li>✅ 광고 제거</li>
            </ul>

            <button style={styles.button}>
                프리미엄 구독 시작하기
            </button>
        </div>
    );
}

const styles = {
    card: {
        maxWidth: '500px',
        margin: '40px auto',
        padding: '30px',
        border: '2px solid #007bff',
        borderRadius: '12px',
        textAlign: 'center',
        boxShadow: '0 8px 16px rgba(0, 123, 255, 0.2)',
        backgroundColor: '#f8fafd'
    },
    header: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#007bff',
        marginBottom: '15px'
    },
    text: {
        fontSize: '16px',
        color: '#555',
        marginBottom: '25px',
        lineHeight: '1.5'
    },
    priceContainer: {
        marginBottom: '25px',
        borderBottom: '1px dashed #ccc',
        paddingBottom: '20px',
    },
    price: {
        fontSize: '36px',
        fontWeight: 'extrabold',
        color: '#333',
        marginRight: '5px'
    },
    period: {
        fontSize: '14px',
        color: '#888'
    },
    featuresList: {
        textAlign: 'left',
        listStyle: 'none',
        padding: '0',
        marginBottom: '30px',
        fontSize: '15px',
        color: '#333'
    },
    button: {
        width: '100%',
        padding: '15px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '18px',
        fontWeight: 'bold',
        transition: 'background-color 0.2s',
    }
};

export default SubscriptionCard;