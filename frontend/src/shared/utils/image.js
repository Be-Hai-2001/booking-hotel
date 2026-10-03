// src/shared/utils/image.js
import { STORAGE_URL, NO_IMAGE } from '../constants/storage';

export const getImageUrl = (path) => (path ? `${STORAGE_URL}/${path}` : NO_IMAGE);
export default getImageUrl;