// import { message } from 'ant-design-vue'
export default function({ $cookies, $axios, redirect, store, route, req, app, env }, inject) {
    // const { API_URL_BROWSER } = env
    // console.log(API_URL_BROWSER, 'L4')
    // request interceptor
    $axios.interceptors.request.use(
      config => {
        // do something before request is sent
        // if(store.getters.token) {
        //   config.headers['X-Token'] = getToken()
        // }
        return config
      },
      error => {
        // do something with request error
        console.log('Axios Error Message:', error)
        return Promise.reject(error)
      }
    )
    $axios.onRequest(config => {
      console.log('Making request to ' + config.url)
      // console.log(config, 'AXIOS config')
    })
  
    // response interceptor
    $axios.interceptors.response.use(
      /**
       * Determine the request status by custom code
       * Here is just an example
       * You can also judge the status by HTTP Status Code
       */
      response => {
        const res = response.data
        if (res.code === 20000) {
          return res
        } else {
          return response
          // redirect('/404')
          // if the custom code is not 200, it is judged as an error.
        }
        return Promise.reject(new Error(res.msg || 'Error'))
      },
      error => {
        console.log('err' + error) // for debug
  
        return Promise.reject(error)
      }
    )
  
    $axios.onError(async error => {
      const errorRes = (error && error.response) || {};
      const statusCode = errorRes.status;
      const errorData = errorRes.data || {};
      console.log("Axios////on Error: ", statusCode, "-", errorData);
  
      // api error code:
      switch (errorData.code) {
        case 1000:
          return redirect("/500");
          break;
        case 1002:
          return redirect("/404")
  
        default:
          break;
      }
      // server status error code
      switch (statusCode) {
        case 400:
          // redirect('/404')
          break;
        case 500:
          redirect("/500");
          break;
        case 502:
          redirect("/500");
          break;
        default:
          break;
      }
  
      throw errorData;
    });
  }