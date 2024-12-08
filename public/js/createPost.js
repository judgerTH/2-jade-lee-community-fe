const titleInput = document.querySelector('input[type="text"]');
const contentTextarea = document.querySelector('textarea');
const submitButton = document.querySelector('.submit-button');
const helperText = document.querySelector('.helper-text');

titleInput.addEventListener('input', () => {
    if (titleInput.value.length > 26) {
        titleInput.value = titleInput.value.slice(0, 26); 
    }
    toggleSubmitButton();
});

contentTextarea.addEventListener('input', toggleSubmitButton);

function toggleSubmitButton() {
    if (titleInput.value.trim() !== '' && contentTextarea.value.trim() !== '') {
        submitButton.disabled = false;
        submitButton.style.backgroundColor = '#7F6AEE'; 
    } else {
        submitButton.disabled = true;
        submitButton.style.backgroundColor = '#ACA0EB';
    }
}

async function addPost() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const postImages = document.getElementById('postImage').files[0]; 

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (postImages) {
        formData.append('postImage', postImages); 
    }

    try {
        const response = await fetch('http://3.34.40.191:8000/posts', {
            method: 'POST',
            body: formData,
            credentials: 'include' 
        });
        if (response.status === 201) {
            console.log('게시글 업로드 성공');
            window.location.href = '/posts';
        } else {
            if (response.status === 400) {
                console.log('게시글');
                alert('유효하지 않은 요청입니다.');
            }
            else if (response.status === 500) {
                console.log(' 성공');
                alert('서버에 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
            }
        }
    } catch (error) {
        console.error('요청 오류:', error);
        alert('오류가 발생했습니다.');
    }
}

submitButton.addEventListener('click', (event) => {
    if (titleInput.value.trim() === '' || contentTextarea.value.trim() === '') {
        event.preventDefault(); 
        helperText.textContent = '*제목, 내용을 모두 작성해주세요';
        helperText.style.display = 'block';
    } else {
        helperText.style.display = 'none';
        addPost();
    }
});
