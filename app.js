import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
})
app.get('/posts', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'postList.html'));
});

app.get('/posting', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'createPost.html'));
});

app.get('/posts/:post_id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'postDetail.html'));
});

app.get('/posts/:post_id/edit', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'editPost.html'));
});


app.get('/user/editProfile', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'editProfile.html'));
});

app.get('/user/editPassword', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'editPassword.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://3.34.40.191:${PORT}`);
});
