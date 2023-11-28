import axios from 'axios';

export default axios.create({
    baseURL: 'http://ec2-43-200-121-6.ap-northeast-2.compute.amazonaws.com:8080/'
});