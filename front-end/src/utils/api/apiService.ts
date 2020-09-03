import tokenService from './tokenService';
import { OptionProps } from '../types/types';

async function apiRequestHelper<T>(
    type: string,
    url: string,
    data?: {}
): Promise<any> {
    const option: OptionProps = {
        method: type,
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + tokenService.getToken(),
        },
    };
    if (data && type !== 'GET') option.body = JSON.stringify(data);
    const response = await fetch(url, option);
    const dataResponse = await response.json();
    if (dataResponse.ok) return dataResponse;
    throw new Error(dataResponse.message);
}

export default apiRequestHelper;
