function toggleDropdown() {
    const dropdown = document.getElementById("dropdown-menu");
    dropdown.style.display = dropdown.style.display === "flex" ? "none" : "flex";
}

function showToast(message, callback) {
    const toast = document.getElementById('toast');
    toast.textContent = message; 
    toast.className = 'toast show';
    
    setTimeout(() => {
        toast.className = toast.className.replace('show', '');
        if (callback) {
            callback(); 
        }
    }, 1000); 
}

const passInput1 = document.getElementById('pass1');
const pass1helperText = document.getElementById('helper-text-pass1');
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;

passInput1.addEventListener('focusout', function () {
    const password1 = passInput1.value;
    if (!password1) {
        pass1helperText.textContent = '*비밀번호를 입력해주세요.';
        pass1helperText.style.display = 'block';
    } else if (!passwordRegex.test(password1)) {
        pass1helperText.textContent = '*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.';
        pass1helperText.style.display = 'block';
    } else {
        pass1helperText.style.display = 'none';
    }
});

const passInput2 = document.getElementById('pass2');
const pass2helperText = document.getElementById('helper-text-pass2');

passInput2.addEventListener('focusout', function () {
    const password1 = passInput1.value;
    const password2 = passInput2.value;
    
    if (!password2) {
        pass2helperText.textContent = '*비밀번호를 한번더 입력해주세요.';
        pass2helperText.style.display = 'block';
    } else if (password1 !== password2) {
        pass2helperText.textContent = '*비밀번호가 다릅니다.';
        pass2helperText.style.display = 'block';
    } else {
        pass2helperText.style.display = 'none';
    }
});

const submitButton = document.getElementById('submit-button');

function toggleSubmitButton() {
    const isPasswordValid = passwordRegex.test(passInput1.value);
    const isPasswordConfirmed = passInput1.value === passInput2.value;

    if (isPasswordValid && isPasswordConfirmed) {
        submitButton.disabled = false;
        submitButton.style.backgroundColor = '#7F6AEE';
    } else {
        submitButton.disabled = true;
        submitButton.style.backgroundColor = '#ACA0EB'; 
    }
}

passInput1.addEventListener('input', toggleSubmitButton);
passInput2.addEventListener('input', toggleSubmitButton);

async function editPassword() {
    const newPassword = document.getElementById('pass1').value;
    try {
        const response = await fetch('http://localhost:8000/user/password', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newPassword }),
            credentials: 'include' 
        });
        if (response.status === 204) {
            console.log('비밀번호 변경 성공');
            showToast('수정 완료', () => {
                window.location.href = '/posts';
            });
        } else {
            if (response.status === 400) {
                console.log('유효하지 않은 요청입니다.');
                alert('유효하지 않은 요청입니다.');
            }
            else if (response.status === 500) {
                console.log(' 서버에 오류가 발생했습니다.');
                alert('서버에 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
            }
        }
    } catch (error) {
        console.error('요청 오류:', error);
        alert('오류가 발생했습니다.');
    }
}

submitButton.addEventListener('click', editPassword);