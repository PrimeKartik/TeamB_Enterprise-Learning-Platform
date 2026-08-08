import client from './client';

export const noteApi = {
    getNote: (userId, lessonId) => client.get(`/notes/user/${userId}/lesson/${lessonId}`),
    getAllUserNotes: (userId) => client.get(`/notes/user/${userId}`),
    saveNote: (data) => client.post('/notes/save', data),
};
