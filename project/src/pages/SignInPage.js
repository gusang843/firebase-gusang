// src/pages/SignInPage.js

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
// Firebase에서 정의한 auth 인스턴스를 가져옵니다.
import { auth } from '../firebase'; 

function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // ⭐️ Firebase Auth: 이메일과 비밀번호로 로그인
            await signInWithEmailAndPassword(auth, email, password);
            
            alert('로그인 성공! 환영합니다.');
            console.log('로그인 성공:', email);

            // 성공 시 메인 페이지로 이동
            navigate('/main'); 

        } catch (error) {
            console.error('로그인 에러:', error.code, error.message);
            
            let errorMessage = '로그인 중 오류가 발생했습니다.';
            if (error.code === 'auth/invalid-email' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
                errorMessage = '이메일 또는 비밀번호가 올바르지 않습니다.';
            }
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>내 증명서 정보 정리 서비스</h1>
            <h2 style={styles.subHeader}>로그인</h2>

            <form onSubmit={handleSignIn} style={styles.formBox}>
                <label style={styles.label}>Email</label>
                <input
                    type="email"
                    placeholder="등록된 이메일을 입력하세요"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={styles.input}
                />

                <label style={styles.label}>Password</label>
                <input
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={styles.input}
                />

                <button type="submit" disabled={loading} style={styles.button}>
                    {loading ? '로그인 중...' : '로그인'}
                </button>
                
                <div style={styles.linkContainer}>
                    <span style={styles.linkText}>계정이 없으신가요?</span>
                    <Link to="/signup" style={styles.linkButton}>회원가입</Link>
                </div>
            </form>
        </div>
    );
}

// 스타일 정의
const styles = {
    container: {
        textAlign: 'center',
        padding: '50px 20px',
    },
    header: {
        fontSize: '32px',
        fontWeight: 'bold',
        marginBottom: '40px',
    },
    subHeader: {
        fontSize: '24px',
        marginBottom: '30px',
    },
    formBox: {
        maxWidth: '400px',
        margin: '0 auto',
        padding: '30px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
    },
    label: {
        display: 'block',
        textAlign: 'left',
        marginTop: '15px',
        marginBottom: '5px',
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        padding: '12px',
        marginBottom: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxSizing: 'border-box',
    },
    button: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        marginTop: '20px',
        transition: 'background-color 0.2s',
        opacity: 1, // Remove opacity from button style
    },
    linkContainer: {
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '14px',
    },
    linkText: {
        marginRight: '10px',
    },
    linkButton: {
        color: '#007bff',
        textDecoration: 'none',
        fontWeight: 'bold',
        padding: '5px 10px',
        borderRadius: '4px',
        backgroundColor: '#e6f7ff',
        border: '1px solid #b3e0ff',
        marginLeft: '5px',
    }
};

export default SignInPage;