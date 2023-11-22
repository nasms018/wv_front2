import axios from 'axios';

export default axios.create({
    baseURL: 'http://ec2-52-78-208-249.ap-northeast-2.compute.amazonaws.com:8080/'
});