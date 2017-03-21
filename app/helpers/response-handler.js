import { dispatch } from '../store';
import { updateToken } from '../actions/auth';

export default function handleResponse(response) {
    if (response.status === 200) {
        dispatch(updateToken(response.headers.get('authorization')));
        return response.json();
    } else {
        return Promise.reject('no soup for you!');
    }
}
