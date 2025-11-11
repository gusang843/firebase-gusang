// src/components/SignUpForm.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

function SignUpForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            // Firebase로 신규 사용자 생성
            await createUserWithEmailAndPassword(auth, email, password);
            console.log('회원가입 성공!');
            
            // 회원가입 성공 시 바로 로그인 처리되며 MainPage로 이동
            navigate('/main');

        } catch (firebaseError) {
            console.error('회원가입 에러:', firebaseError);
            if (firebaseError.code === 'auth/email-already-in-use') {
                setError('이미 사용 중인 이메일입니다.');
            } else if (firebaseError.code === 'auth/weak-password') {
                setError('비밀번호는 6자리 이상이어야 합니다.');
            } else {
                setError('회원가입 중 오류가 발생했습니다.');
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
            <div style={{ marginBottom: '15px' }}>
                <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호 (6자리 이상)"
                    style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
                />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <input 
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="비밀번호 확인"
                    style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
                />
            </div>
            {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
            <button type="submit" style={{ width: '100%', padding: '12px', cursor: 'pointer' }}>
                회원가입
            </button>
        </form>
    );
}

export default SignUpForm;