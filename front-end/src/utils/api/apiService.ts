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
    const responseJSON = await response.json();
    if (response.ok) return responseJSON;
    throw new Error(responseJSON.message);
}

export default apiRequestHelper;
