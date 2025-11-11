// src/components/PDFDownloadButton.js

import React from 'react';

function PDFDownloadButton() {
    const handleDownload = () => {
        console.log('PDF 생성 및 다운로드 시작');
        // TODO: jsPDF 또는 html2pdf와 같은 라이브러리를 사용하여 
        // 현재 목록 데이터를 PDF로 변환하는 실제 로직을 구현해야 합니다.
        alert('PDF 파일 생성을 시작합니다.');
    };

    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <div style={{ marginBottom: '20px' }}>
                <span role="img" aria-label="PDF icon" style={{ fontSize: '100px', color: '#dc3545' }}>
                    
                </span>
            </div>
            
            <button 
                onClick={handleDownload}
                style={{ 
                    padding: '15px 40px', 
                    backgroundColor: '#dc3545', 
                    color: 'white', 
                    fontSize: '18px',
                    border: 'none', 
                    borderRadius: '5px', 
                    cursor: 'pointer' 
                }}
            >
                PDF 다운로드
            </button>
        </div>
    );
}

export default PDFDownloadButton;