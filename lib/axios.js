import Axios from 'axios'

const RootPath = "http://mywebci4-api.test/api/"

// Authorization
const token = JSON.parse(process.isClient ? !localStorage.getItem('access_token') : false);
const config = { headers: { "Authorization": `Bearer ${token}` } };

const GET = (path) => {
    const promise = new Promise((resolve, reject) => {
        Axios.get(RootPath + path, config).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
    return promise
}

const GET_ID = (path, id) => {
    const promise = new Promise((resolve, reject) => {
        Axios.get(RootPath + path + id, config).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
    return promise
}

const GET_BY_ID = (path, data) => {
    const promise = new Promise((resolve, reject) => {
        Axios.get(RootPath + path + data, config).then(res => {
            resolve(res.data)
        }, err => {
            console.log(err.response);
            return err.response;
        })
    })
    return promise
}

const POST = (path, data) => {
    const promise = new Promise((resolve, reject) => {
        Axios.post(RootPath + path, data, config).then(res => {
            resolve(res)
        }).catch(err => {
            console.log(err.response);
            return err.response;
        })
    })
    return promise
}

const PUT = (path, data) => {
    const promise = new Promise((resolve, reject) => {
        Axios.put(RootPath + path, data, config).then(res => {
            resolve(res.data)
        }).catch(err => {
            console.log(err.response);
            return err.response;
        })
    })
    return promise
}

const DELETE = (path, data) => {
    const promise = new Promise((resolve, reject) => {
        Axios.delete(RootPath + path + data, config).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
    return promise
}

const POST_FOTO = (path, data, name) => {
    const promise = new Promise((resolve, reject) => {
        const formdata = new FormData()
        formdata.append('foto', data, name)
        Axios.post(RootPath + path, formdata, config).then(res => {
            resolve(res.data.status)
        }, (err) => {
            reject(err)
        })
    })
    return promise
}

const PostLogin = (data) => POST('auth/login', data);

const GetBlog = () => GET('blog');
const GetBlogId = (data) => GET_ID('blog/', data)
const PostBlog = (data) => POST('blog/save', data);
const PutBlog = (data) => PUT('blog/update/', data);
const DeleteBlog = (id) => DELETE('blog/delete/', id);
const PutBlogCategory = (data) => PUT('blog/setcategory', data);
const PutBlogImage = (data) => PUT('blog/imgupload', data);
const CountBlog = () => GET('count/blog');

const SearchBlog = (data) => GET_ID('search?query=', data);
const GetTag = (data) => GET_ID('searchtag?category=', data);

const GetSetting = () => GET('setting');
const PutSetting = (data) => PUT('setting/update/', data);
const PutSettingLanding = (data) => PUT('setting/landing', data);

const GetUser = () => GET('user');
const GetUserId = (data) => GET_ID('user/', data)
const PostUser = (data) => POST('user/save', data);
const PutUser = (data) => PUT('user/update', data);
const DeleteUser = (id) => DELETE('user/delete/', id);
const PutChangePassword = (data) => PUT('user/changepassword/', data);

const GetSlideshow = () => GET('slideshow');
const GetSlideshowId = (data) => GET_ID('slideshow/', data)
const PostSlideshow = (data) => POST('slideshow/save', data);
const PutSlideshow = (data) => PUT('slideshow/update/', data);
const DeleteSlideshow = (id) => DELETE('slideshow/delete/', id);
const PutSlideshowImage = (data) => PUT('slideshow/upload/', data);

const GetCategory = () => GET('category');
const GetCategoryId = (data) => GET_ID('category/', data)
const PostCategory = (data) => POST('category/save', data);
const PutCategory = (data) => PUT('category/update', data);
const DeleteCategory = (id) => DELETE('category/delete/', id);
const CountCategory = () => GET('count/category');

const PostFoto = (data, name) => POST_FOTO('imageupload', data, name);

const GetComment = () => GET('comment');
const GetCommentId = (data) => GET_ID('comment/', data);
const PostComment = (data) => POST('comment/save', data);
const PutComment = (data) => PUT('comment/update', data);
const CountComment = () => GET('count/comment');

const GetMenu = () => GET('menu');
const GetProduct = () => GET('product');
const CountProduct = () => GET('count/product');

const API = {
    PostLogin,
    GetBlog,
    GetBlogId,
    PostBlog,
    PutBlog,
    PutBlogCategory,
    DeleteBlog,
    PutBlogImage,
    GetSetting,
    PutSetting,
    PutSettingLanding,
    GetUser,
    GetUserId,
    PostUser,
    PutUser,
    PutChangePassword,
    DeleteUser,
    GetSlideshow,
    GetSlideshowId,
    PostSlideshow,
    PutSlideshow,
    DeleteSlideshow,
    PutSlideshowImage,
    GetCategory,
    GetCategoryId,
    PostCategory,
    PutCategory,
    DeleteCategory,
    PostFoto,
    CountBlog,
    CountCategory,
    SearchBlog,
    GetComment,
    GetCommentId,
    PostComment,
    PutComment,
    CountComment,
    GetTag,
    GetMenu,
    GetProduct,
    CountProduct
}

export default API