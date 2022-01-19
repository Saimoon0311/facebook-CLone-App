export const API_BASED_URL = 'http://192.168.20.43:5000/api/v1/';
export const IMAGE_BASED_URL = 'http://192.168.20.43:5000/images/';

export const getApi = endpoint => API_BASED_URL + endpoint;

export const LoginUrl = getApi('auth/login');
export const SignUpUrl = getApi('auth/register');
export const TimeLineUrl = getApi('posts/timeline/');
export const PostCreateUrl = getApi('posts/createpost');
export const ImageUploadUrl = getApi('upload');
export const LikeUrl = getApi('posts/');
export const UpdatePostUrl = getApi('post/');
