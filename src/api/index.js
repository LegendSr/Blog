// 配置API接口地址
import { Message } from 'element-ui';//element-ui消息提示
import axios from 'axios'

var root = '/api'
// 自定义判断元素类型JS
function toType (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull (o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}
/*
  接口处理函数
  这个函数每个项目都是不一样的，我现在调整的是适用于
  https://cnodejs.org/api/v1 的接口，如果是其他接口
  需要根据接口的参数进行调整。参考说明文档地址：
  https://cnodejs.org/topic/5378720ed6e2d16149fa16bd
  主要是，不同的接口的成功标识和失败提示是不一致的。
  另外，不同的项目的处理方法也是不一致的，这里出错就是简单的alert
*/
axios.interceptors.request.use(data=> {
  return data;
}, err=> {
  Message({ type:'error', message: '请求超时!', duration:5000, showClose: true});
  return Promise.resolve(err);
});

axios.interceptors.response.use(data=> {
  if (data.status && data.status == 200 && data.data.code != 0) {
    // Message.error(data.data.msg)
    return data.data;
  }
  return data;
}, err=> {
  if(!err.response){
    Message({type:"error", message: '未知错误!', showClose: true});
  }else if (err.response.status == 504||err.response.status == 404) {
    Message({type:"error", message: '服务器消失了....', showClose: true});
  } else if (err.response.status == 403) {
    Message({type:"error", message: '权限不足,请联系管理员!', showClose: true});
  } else if (err.response.status == 400) {
    Message({type:"error", message: '提交参数有误！', showClose: true});
  } else if (err.response.status == 401) {
    Message({type:"error", message: '提交参数有误！', showClose: true});
  }else {
    Message({type:"error", message: '未知错误!', showClose: true});
  }
  return
});


function apiAxios (method, url, params, success, failure) {
  if (params) {
    params = filterNull(params)
  }
  let ajax = axios({
    method: method,
    url: url,
    headers:{
      // "intforce-vmatrix-auth":"IntForce "+ sessionStorage.token
    },
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    baseURL: root,
    // withCredentials: false,
    timeout:10000
  })
  if(success){
    ajax.then(function (res) {
      if (res) {
        if (success) {
          success(res)
        }
      } else{
        if (failure) {
          failure(res)
        } else {
          console.error(('error: ' + JSON.stringify(res)))
        }
      }
    }).catch(function (err) {
      if (err) {
        console.error(('api error, HTTP CODE: ' , err))
      }
    })
  }else{
    return ajax
  }
}


// 返回在vue模板中的调用接口
export default {
  get: function (url, params, success, failure) {
    return apiAxios('GET', url, params, success, failure)
  },
  post: function (url, params, success, failure) {
    return apiAxios('POST', url, params, success, failure)
  },
  put: function (url, params, success, failure) {
    return apiAxios('PUT', url, params, success, failure)
  },
  delete: function (url, params, success, failure) {
    return apiAxios('DELETE', url, params, success, failure)
  }
}
