import authHeader from './authHeader';

export default function () {
    return {
        'Content-type': 'application/json',
        Authorization: authHeader(),
    };
}
