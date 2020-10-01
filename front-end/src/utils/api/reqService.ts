import apiRequestHelper from './apiService';
import { apiRequestHelperProps } from '../types/types';

function getData(url: string) {
    return apiRequestHelper<apiRequestHelperProps>('GET', url);
}

function addData(url: string, data: {}) {
    return apiRequestHelper<apiRequestHelperProps>('POST', url, data);
}

function deleteData(url: string, data: {}) {
    return apiRequestHelper<apiRequestHelperProps>('DELETE', url, data);
}

function loginUser(url: string, data: {}) {
    return apiRequestHelper<apiRequestHelperProps>('POST', url, data);
}

async function signUpUser(url: string, data: {}) {
    return await apiRequestHelper<apiRequestHelperProps>('POST', url, data);
}

async function resendEmail(url: string, data: {}) {
    return await apiRequestHelper<apiRequestHelperProps>('POST', url, data);
}

async function accessRoom(url: string) {
    return await apiRequestHelper<apiRequestHelperProps>('GET', url);
}

async function joinRoom(url: string, data: {}) {
    return await apiRequestHelper<apiRequestHelperProps>('POST', url, data);
}

async function createRoom(url: string, data: {}) {
    return await apiRequestHelper<apiRequestHelperProps>('POST', url, data);
}

export default {
    getData,
    addData,
    deleteData,
    loginUser,
    signUpUser,
    resendEmail,
    accessRoom,
    joinRoom,
    createRoom,
};
