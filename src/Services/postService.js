class PostService {
    async getRandomPosts(
        signal,
        page = 1,
        limit = 10,
        category = '',
        orderBy = 'desc'
    ) {
        try {
            const res = await fetch(
                `/api/posts/all?limit=${limit}&orderBy=${orderBy}&page=${page}&category=${category}`,
                {
                    method: 'GET',
                    signal,
                }
            );

            const data = await res.json();
            console.log(data);

            if (res.status === 500) {
                throw new Error(data.message);
            }

            return data;
        } catch (err) {
            if (err.name === 'AbortError') {
                console.log('get random posts request aborted.');
            } else {
                console.error('error in getRandomPosts service', err);
                throw err;
            }
        }
    }

    async getPosts(signal, channelId, limit = 10, page = 1, orderBy = 'desc') {
        try {
            const res = await fetch(
                `/api/posts/channel/${channelId}?limit=${limit}&orderBy=${orderBy}&page=${page}`,
                { signal, method: 'GET' }
            );

            const data = await res.json();
            console.log(data);

            if (res.status === 500) {
                throw new Error(data.message);
            }
            return data;
        } catch (err) {
            if (err.name === 'AbortError') {
                console.log('get posts request aborted.');
            } else {
                console.error('error in getPosts service', err);
                throw err;
            }
        }
    }

    async getPost(signal, postId) {
        try {
            const res = await fetch(`/api/posts/post/${postId}`, {
                method: 'GET',
                credentials: 'include',
                signal,
            });

            const data = await res.json();
            console.log(data);

            if (res.status === 500) {
                throw new Error(data.message);
            }
            return data;
        } catch (err) {
            if (err.name === 'AbortError') {
                console.log('get post request aborted.');
            } else {
                console.error('error in getPost service', err);
                throw err;
            }
        }
    }

    async updatePostDetails(inputs, postId) {
        try {
            const res = await fetch(`/api/posts/details/${postId}`, {
                method: 'PATCH',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inputs), // title, content & category
            });

            const data = await res.json();
            console.log(data);

            if (res.status === 500) {
                throw new Error(data.message);
            }
            return data;
        } catch (err) {
            console.error('error in updatePostDetails service', err);
            throw err;
        }
    }

    async updatePostImage(postImage, postId) {
        try {
            const formData = new FormData();
            formData.append('postImage', postImage);

            const res = await fetch(`/api/posts/image/${postId}`, {
                method: 'PATCH',
                credentials: 'include',
                body: formData,
            });

            const data = await res.json();
            console.log(data);

            if (res.status === 500) {
                throw new Error(data.message);
            }
            return data;
        } catch (err) {
            console.error('error in updatePostImage service', err);
            throw err;
        }
    }

    async deletePost(postId) {
        try {
            const res = await fetch(`/api/posts/delete/${postId}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            const data = await res.json();
            console.log(data);

            if (res.status === 500) {
                throw new Error(data.message);
            }
            return data;
        } catch (err) {
            console.error('error in deletePost service', err);
            throw err;
        }
    }

    async addPost(inputs) {
        try {
            const formData = new FormData();
            Object.entries(inputs).forEach(([key, value]) => {
                formData.append(key, value);
            });

            const res = await fetch('/api/posts/add', {
                method: 'POST',
                credentials: 'include',
                body: formData,
            });

            const data = await res.json();
            console.log(data);

            if (res.status === 500) {
                throw new Error(data.message);
            }
            return data;
        } catch (err) {
            console.error('error in addPost service', err);
            throw err;
        }
    }

    async togglePostVisibility(postId) {
        try {
            const res = await fetch(`/api/posts/visibility/${postId}`, {
                method: 'PATCH',
                credentials: 'include',
            });

            const data = await res.json();
            console.log(data);

            if (res.status === 500) {
                throw new Error(data.message);
            }
            return data;
        } catch (err) {
            console.error('error in togglePostVisibility service', err);
            throw err;
        }
    }

    async getSavedPosts(signal, limit = 10, page = 1, orderBy = 'desc') {
        try {
            const res = await fetch(
                `/api/posts/saved?orderBy=${orderBy}&limit=${limit}&page=${page}`,
                {
                    method: 'GET',
                    credentials: 'include',
                    signal,
                }
            );

            const data = await res.json();
            console.log(data);

            if (res.status === 500) {
                throw new Error(data.message);
            }
            return data;
        } catch (err) {
            if (err.name === 'AbortError') {
                console.log('get saved posts request aborted.');
            } else {
                console.error('error in getSavedPosts service', err);
                throw err;
            }
        }
    }

    async toggleSavePost(postId) {
        try {
            const res = await fetch(`/api/posts/toggle-save/${postId}`, {
                method: 'POST',
                credentials: 'include',
            });

            const data = await res.json();
            console.log(data);

            if (res.status === 500) {
                throw new Error(data.message);
            }
            return data;
        } catch (err) {
            console.error('error in toggleSavePost service', err);
            throw err;
        }
    }
}

export const postService = new PostService();
