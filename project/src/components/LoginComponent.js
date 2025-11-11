// src/components/LoginComponent.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // 1번에서 만든 설정 파일

function LoginComponent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // 에러 메시지 초기화

        if (!email || !password) {
            setError('이메일과 비밀번호를 모두 입력해주세요.');
            return;
        }

        try {
            // Firebase로 이메일/비밀번호 로그인 시도
            await signInWithEmailAndPassword(auth, email, password);
            console.log('로그인 성공!');
            
            // 로그인 성공 시 MainPage로 이동
            navigate('/main');

        } catch (firebaseError) {
            console.error('로그인 에러:', firebaseError);
            if (firebaseError.code === 'auth/user-not-found' || firebaseError.code === 'auth/wrong-password') {
                setError('이메일 또는 비밀번호가 일치하지 않습니다.');
            } else {
                setError('로그인 중 오류가 발생했습니다.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '350px', margin: '0 auto' }}>
            <div style={{ marginBottom: '15px' }}>
                <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="이메일"
                    style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
                />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호"
                    style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
                />
            </div>
            {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
            <button type="submit" style={{ width: '100%', padding: '12px', cursor: 'pointer' }}>
                로그인
            </button>
        </form>
    );
}

export default LoginComponent;