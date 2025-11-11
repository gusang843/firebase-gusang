// src/components/Header.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase'; 

function Header({ loggedIn }) {
    const navigate = useNavigate();

    const handleAuthClick = async () => {
        if (loggedIn) {
            // 로그인 상태: 로그아웃 처리
            try {
                await signOut(auth);
                alert("로그아웃되었습니다.");
                // 로그아웃 후 랜딩 페이지로 이동
                navigate('/');
            } catch (error) {
                console.error("로그아웃 실패:", error);
                alert("로그아웃에 실패했습니다.");
            }
        } else {
            // 로그아웃 상태: 로그인 페이지로 이동
            navigate('/signin');
        }
    };

    return (
        <header style={styles.header}>
            <div style={styles.logo} onClick={() => navigate(loggedIn ? '/main' : '/')}>
                내 증명서 정보 정리 서비스
            </div>
            <button 
                onClick={handleAuthClick} 
                style={styles.authButton}
            >
                {loggedIn ? '로그아웃' : '로그인'}
            </button>
        </header>
    );
}

const styles = {
    header: {
        width: '100%',
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #eee',
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
    },
    logo: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#333',
        cursor: 'pointer',
    },
    authButton: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        transition: 'background-color 0.2s',
    }
};

export default Header;