function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function checkEmail() {
    const emailInput = document.getElementById('id');
    const helperText = document.querySelector('.helper-text');
    
    if (!emailInput.value || !validateEmail(emailInput.value)) {
        helperText.textContent = '*올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com)';
        return false;
    }
    return true;
}

function checkPass() {
    const passInput = document.getElementById('pw');
    const helperText = document.querySelector('.helper-text');
    
    if (!passInput.value) {
        helperText.textContent = '*비밀번호를 입력해주세요.';
        return false;
    } 

    return true;
}

function updateButtonState() {
    const passValid = checkPass();
    const emailValid = checkEmail();
    const loginButton = document.getElementById('lottie-login'); 
    if (emailValid && passValid) {
        document.querySelector('.helper-text').textContent = '';
        loginButton.style.backgroundColor = '#7F6AEE'; 
        loginButton.disabled = false; 
    } else {
        loginButton.style.backgroundColor = '#ACA0EB';
        loginButton.disabled = true; 
    }
}

document.getElementById('id').addEventListener('input', updateButtonState);
document.getElementById('pw').addEventListener('input', updateButtonState);

async function login() {
    const isValid2 = checkPass();
    const isValid1 = checkEmail();
    if (isValid1 && isValid2) {
        const email = document.getElementById('id').value;
        const password = document.getElementById('pw').value;
        document.querySelector('.helper-text').textContent = '';

        try {
            const response = await fetch('http://3.34.40.191:8000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include' 
            });
            const responseData = await response.json();
            if (response.status === 200) {
                console.log('로그인 성공');
                window.location.href = '/posts';
            } else {
                if (response.status === 400 && responseData.message === "invalid_request") {
                    console.error('유효하지 않은 요청:', responseData.message);
                    alert('유효하지 않은 요청입니다.');
                }
                else if (response.status === 500 && responseData.message === "internal_server_error") {
                    console.error('서버 오류:', responseData.message);
                    alert('서버에 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
                } else {
                    console.error('알 수 없는 에러:', responseData.message);
                    alert(responseData.message || '로그인에 실패했습니다.');
                }
            }
        } catch (error) {
            console.error('로그인 요청 오류:', error);
            alert('로그인 중 오류가 발생했습니다.');
        }
    }
}
function handleKeydown(event) {
    if (event.key === 'Enter') {
        login();
    }
}

document.getElementById('id').addEventListener('keydown', handleKeydown);
document.getElementById('pw').addEventListener('keydown', handleKeydown);
