export const API_BASED_URL =
  'https://facebook-clone-saimoon.herokuapp.com/api/v1/';
// export const API_BASED_URL = 'https://hip-brindle-save.glitch.me/api/v1/';
// export const API_BASED_URL = 'http://192.168.20.43:5000/api/v1/';
export const IMAGE_BASED_URL =
  'https://res.cloudinary.com/dd6tdswt5/image/upload/v1644406357/samples/';
export const POST_IMAGE_URL =
  'https://api.cloudinary.com/v1_1/dd6tdswt5/upload';

export const getApi = endpoint => API_BASED_URL + endpoint;

export const LoginUrl = getApi('auth/login');
export const SignUpUrl = getApi('auth/register');
export const TimeLineUrl = getApi('posts/timeline/');
export const PostCreateUrl = getApi('posts/createpost');
export const ImageUploadUrl = getApi('upload');
export const LikeUrl = getApi('posts/');
export const UpdatePostUrl = getApi('post/');
