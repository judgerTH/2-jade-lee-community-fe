document.addEventListener("DOMContentLoaded", function () {
    const titles = document.querySelectorAll('.post-title h3');
    
    titles.forEach(title => {
        if (title.textContent.length > 26) {
            title.textContent = title.textContent.slice(0, 26); 
        }
    });
});
document.getElementById('add_post_button').addEventListener('click', function(){
    window.location.href = '/posting';
});
let currentPage = 1; 
const postsContainer = document.querySelector(".warp article"); 
const postsPerPage = 5;

async function loadPosts() {
    try {
        const response = await fetch('http://3.34.40.191:8000/api/posts', {
            method: 'GET',
            credentials: 'include',
        });
        const data = await response.json();
        console.log(data.data.posts); 
        if (response.status === 400) {
            window.location.href = '/'; 
            return;
        }
        if (!Array.isArray(data.data.posts)) {
            console.error('데이터가 배열이 아닙니다:', data);
            return;
        }
        data.data.posts.forEach(post => { 
            if (post.title.length > 26) {
                post.title = post.title.slice(0, 26) + '...'; 
            }
            const imageUrl = `http://3.34.40.191:8000${post.author.image_url}`;
            const postElement = document.createElement("div");
            postElement.classList.add("post");
            postElement.onclick = async () => {
                try {
                    const response = await fetch(`http://3.34.40.191:8000/api/posts/${post.post_id}/`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include' 
                    });
                    if (response.status === 204) {
                        window.location.href = `/posts/${post.post_id}`;
                    } else {
                        console.error('알 수 없는 오류:', response.status);
                        alert('알 수 없는 오류가 발생했습니다.');
                    }
                } catch (error) {
                    console.error('요청 오류:', error);
                    alert('오류가 발생했습니다.');
                }
            };
            postElement.innerHTML = `
                <div class="post-header">
                    <div class="post-title">
                        <h3>${post.title}</h3>
                        <div class="post-info">
                            <p>좋아요 ${post.like_cnt} 댓글 ${post.comment_cnt} 조회수 ${post.view_cnt}</p>
                        </div>
                    </div>
                    <div class="post-date">${post.created_at}</div> 
                </div>
                <hr />
                <div class="post-footer">
                    <div class="author-info">
                        <div class="author-avatar">
                            <img src="${imageUrl}" alt="Author Avatar" /> 
                        </div>
                        <span>${post.author.nickname}</span> 
                    </div>
                </div>
            `;
            postsContainer.appendChild(postElement);
        });
    } catch (error) {
        console.error('게시글 로드 오류:', error);
        alert('게시글 로드 중 오류가 발생했습니다.');
    }
}
loadPosts(currentPage);
