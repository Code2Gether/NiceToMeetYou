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

function signUpUser(url: string, data: {}) {
    console.log(url, data);
    return apiRequestHelper<apiRequestHelperProps>('POST', url, data);
}

export default {
    getData,
    addData,
    deleteData,
    loginUser,
    signUpUser,
};
