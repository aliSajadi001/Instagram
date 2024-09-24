import axios from 'axios';
let uploadFile = async (file) => {
  let formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'chat-app');
  let { data } = await axios.post(
    'https://api.cloudinary.com/v1_1/dss4nbdej/auto/upload',
    formData
  );
  return data;
};

export default uploadFile;
