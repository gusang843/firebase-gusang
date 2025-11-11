# firebase-gusang
// create-readme.js

const fs = require("fs");

const content = `# 🚀 React Firebase 인증 & 아이디어 관리 프로젝트

이 프로젝트는 **React + Firebase** 기반의 간단한 웹 서비스로,  
회원가입 / 로그인 / 로그아웃 기능과 개인 아이디어 관리 기능을 제공합니다.

---

## 📂 프로젝트 구조

\`\`\`
src/
├── App.js
├── firebase.js
├── index.js
├── pages/
│   ├── LandingPage.js
│   ├── SignInPage.js
│   ├── SignUpPage.js
│   └── MainPage.js
└── components/
    ├── Header.js
    ├── HeroSection.js
    ├── LoginComponent.js
    └── SignUpForm.js
\`\`\`

---

## ⚙️ 주요 기능

### 🔐 1. 회원가입 & 로그인 (Firebase Auth)
- **회원가입(SignUpPage)**  
  이메일, 비밀번호, 닉네임 입력을 통한 회원가입  
- **로그인(SignInPage)**  
  Firebase Auth의 \`signInWithEmailAndPassword\` 이용  
- **로그아웃(MainPage)**  
  \`signOut(auth)\`으로 로그아웃 후 랜딩 페이지(\`/\`)로 이동  

---

### 🗂️ 2. 데이터베이스 (Firebase Firestore)
- 사용자 UID 기준으로 데이터 저장
- Firestore에 아이디어를 추가, 불러오기, 삭제 가능

\`\`\`js
// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCnPftv-cPelcJX7Xwt2hEZOKcz8oDxGxo",
  authDomain: "project-2100499686623682012.firebaseapp.com",
  projectId: "project-2100499686623682012",
  storageBucket: "project-2100499686623682012.firebasestorage.app",
  messagingSenderId: "713121085828",
  appId: "1:713121085828:web:225c2ada96d8fd587a85d1",
  measurementId: "G-002VE37F8K"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
\`\`\`

---

### 🌐 3. 라우팅 구조 (React Router v6)

\`App.js\`
\`\`\`js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import MainPage from './pages/MainPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Signin" element={<SignInPage />} />
        <Route path="/Signup" element={<SignUpPage />} />
        <Route path="/home" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
\`\`\`

---

## 💡 각 페이지 설명

| 페이지 | 파일 | 설명 |
|--------|------|------|
| LandingPage | \`LandingPage.js\` | 서비스 소개 및 로그인/회원가입 버튼 |
| SignInPage | \`SignInPage.js\` | 로그인 기능 페이지 |
| SignUpPage | \`SignUpPage.js\` | 회원가입 기능 페이지 |
| MainPage | \`MainPage.js\` | 로그인 후 접근 가능한 메인 서비스 화면 |

---

## 🧩 실행 방법

\`\`\`bash
# 패키지 설치
npm install

# 개발 서버 실행
npm start
\`\`\`

> 기본적으로 http://localhost:3000 에서 실행됩니다.

---

## ⚠️ 주의사항

1. Firebase 설정 시, \`storageBucket\` 주소가 잘못되면 Firestore가 연결되지 않습니다.  
   반드시 Firebase 콘솔에서 최신 설정값을 복사하여 사용하세요.  
2. React Router는 **최상단에 한 번만** \`<BrowserRouter>\`가 있어야 합니다.  
   중첩 Router를 넣으면 \`You cannot render a <Router> inside another <Router>\` 에러가 발생합니다.  

---

## 🧠 추가 예정 기능
- [ ] 프로필 편집 기능  
- [ ] 아이디어 수정 기능  
- [ ] UI 개선 및 반응형 디자인 적용  
- [ ] Firebase Storage를 이용한 이미지 업로드  

---

## 👨‍💻 개발자 정보
- **Frontend:** React (Router, Firebase)
- **Backend:** Firebase Authentication, Firestore  
- **배포:** Vercel / Netlify (예정)
`;

fs.writeFileSync("README.md", content, "utf8");
console.log("✅ README.md 파일이 생성되었습니다!");

