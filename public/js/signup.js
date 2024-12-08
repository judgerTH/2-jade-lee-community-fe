function triggerFileInput() {
    const output = document.getElementById('profileImage');
    output.src = "";
    document.querySelector('.overlay').style.display = 'flex';
    document.getElementById('fileInput').click();
    document.getElementById('helper-text-profileImage').style.display = 'flex';
}
function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function () {
            const output = document.getElementById('profileImage');
            output.src = reader.result;
            document.querySelector('.overlay').style.display = 'none';
            document.getElementById('helper-text-profileImage').style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
}
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
const nicknameRegex = /^[^\s]{1,10}$/;
const emailInput = document.getElementById('id');
const emailhelperText = document.getElementById('helper-text-email');
emailInput.addEventListener('focusout', function () {
    const email = emailInput.value.trim();
    if (!email) {
        emailhelperText.textContent = '*이메일을 입력해주세요.';
        emailhelperText.style.display = 'block';
    } else if (!validateEmail(email)) {
        emailhelperText.textContent = '*올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com)';
        emailhelperText.style.display = 'block';
    } else {
        emailhelperText.style.display = 'none';
    }
});
const passInput1 = document.getElementById('pass1');
const pass1helperText = document.getElementById('helper-text-pass1');

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

const nicknameInput = document.getElementById('nickname');
const nicknamehelperText = document.getElementById('helper-text-nickname');

nicknameInput.addEventListener('focusout', function () {
    const nickname = nicknameInput.value.trim();
    
    if (!nickname) {
        nicknamehelperText.textContent = '*닉네임을 입력해주세요.';
        nicknamehelperText.style.display = 'block';
    } else if (!nicknameRegex.test(nickname)) {
        nicknamehelperText.textContent = '*띄어쓰기를 없애주세요';
        nicknamehelperText.style.display = 'block';
    } else if (nickname.length > 10) {
        nicknamehelperText.textContent = '*닉네임은 최대 10자 까지 작성 가능합니다.';
        nicknamehelperText.style.display = 'block';
    } else {
        // 닉네임 중복 체크 로직 구현 예정
        nicknamehelperText.style.display = 'none';
    }
});

const submitButton = document.querySelector('.submit-button');

function toggleSubmitButton() {
    const isEmailValid = validateEmail(emailInput.value);
    const isPasswordValid = passwordRegex.test(passInput1.value);
    const isPasswordConfirmed = passInput1.value === passInput2.value;
    const isNicknameValid = nicknameRegex.test(nicknameInput.value);

    if (isEmailValid && isPasswordValid && isPasswordConfirmed && isNicknameValid) {
        submitButton.disabled = false;
        submitButton.style.backgroundColor = '#7F6AEE';
    } else {
        submitButton.disabled = true;
        submitButton.style.backgroundColor = '#ACA0EB';
    }
}

emailInput.addEventListener('input', toggleSubmitButton);
passInput1.addEventListener('input', toggleSubmitButton);
passInput2.addEventListener('input', toggleSubmitButton);
nicknameInput.addEventListener('input', toggleSubmitButton);

async function signup() {
    const email = document.getElementById('id').value;
    const password = document.getElementById('pass1').value;
    const profileImage = document.getElementById('fileInput').files[0];
    const nickname = document.getElementById('nickname').value;

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('nickname', nickname);
    if (profileImage) {
        formData.append('profileImage', profileImage); 
    }

    try {
        const response = await fetch('http://3.34.40.191:8000/auth/signup', {
            method: 'POST',
            body: formData,
            credentials: 'include'
        });
        if (response.status === 201) {
            console.log('회원가입 성공');
            alert('회원가입 성공!');
            window.location.href = '/';
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
submitButton.addEventListener('click', function() {
    signup();
});