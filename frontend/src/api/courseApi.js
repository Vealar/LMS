import {instance} from "@/api/commonApi.js";


export const fetchCourseStructure = async (courseId) => {
    const res = await instance.get(`/courses/${courseId}/structure`);
    return res.data;
};

export const createTopic = (courseId, title = "Новая тема") =>
    instance.post(`/courses/${courseId}/topics`, { title }).then(res => res.data);

export const createBlock = (topicId, block) =>
    instance.post(`/courses/topics/${topicId}/blocks`, block).then(res => res.data);

export const updateBlock = (blockId, updates) =>
    instance.patch(`/courses/blocks/${blockId}`, updates).then(res => res.data);

export const updateTopic = (topicId, updates) =>
    instance.patch(`/courses/topics/${topicId}`, updates).then(res => res.data);

export const reorderBlocks = (topicId, orderedIds) =>
    instance.patch(`/courses/topics/${topicId}/blocks/reorder`, { orderedIds });

export const reorderTopics = (courseId, orderedIds) =>
    instance.patch(`/courses/${courseId}/topics/reorder`, { orderedIds });

export const deleteBlock = (blockId) =>
    instance.delete(`/courses/blocks/${blockId}`);

export const deleteTopic = (topicId) =>
    instance.delete(`/courses/topics/${topicId}`);

export const fetchBlockById = async (blockId) => {
    const res = await instance.get(`courses/blocks/${blockId}`);
    return res.data;
};