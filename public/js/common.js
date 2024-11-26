function toggleDropdown() {
    const dropdown = document.getElementById("dropdown-menu");
    dropdown.style.display = dropdown.style.display === "flex" ? "none" : "flex";
}

const editProfileButton = document.getElementById('edit_profile');
editProfileButton.addEventListener('click', function() {
    window.location.href = '/user/editProfile';
});

const editPasswordButton = document.getElementById('edit_password');
editPasswordButton.addEventListener('click', function() {
    window.location.href = '/user/editPassword'; 
});

const logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click', async function() {
    try {
        const response = await fetch('http://localhost:8000/user/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include' 
        });
        const responseData = await response.json();

        if (response.status === 200) {
            console.log('로그인아웃 성공');
            window.location.href = '/'; 
        } else {
            if (response.status === 400 && responseData.message === "invalid_request") {
                console.error('유효하지 않은 요청:', responseData.message);
                alert('유효하지 않은 요청입니다.');
            }
            else if (response.status === 500 && responseData.message === "internal_server_error") {
                console.error('서버 오류:', responseData.message);
                alert('서버에 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
            } else {
                alert(responseData.message || '로그아웃에 실패했습니다.');
                window.location.href = '/'; 
            }
        }
    } catch (error) {
        console.error('로그아웃 요청 오류:', error);
        alert('로그아웃 중 오류가 발생했습니다.');
    }
});

async function load() {
    try {
        const response = await fetch(`http://localhost:8000/user`, {
            method: 'GET',
            credentials: 'include', 
        });

        const data = await response.json();

        if (response.status === 400) {
            window.location.href = '/'; 
            return
        } 

        document.getElementById('profile_image').src = data.profileImage ? `http://localhost:8000${data.profileImage}` : '/images/profile_img.png';
    } catch (error) {
        console.error('로드 오류:', error);
        alert('오류가 발생했습니다.');
    }
}
load();