import React from 'react';

function Sidebar() {
    return (
        <div style={{ width: '200px', padding: '20px', borderRight: '1px solid #ddd' }}>
            <h3>메인 메뉴</h3>
            <ul>
                <li>대시보드</li>
                <li>프로필 설정</li>
                <li>서비스 이용</li>
            </ul>
        </div>
    );
}

export default Sidebar;