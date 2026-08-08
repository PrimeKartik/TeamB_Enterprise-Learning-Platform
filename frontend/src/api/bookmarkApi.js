import client from './client';

export const bookmarkApi = {
    getUserBookmarks: (userId) => client.get(`/bookmarks/user/${userId}`),
    checkBookmark: (userId, lessonId) => client.get(`/bookmarks/check?userId=${userId}&lessonId=${lessonId}`),
    toggleBookmark: (data) => client.post('/bookmarks/toggle', data),
};
