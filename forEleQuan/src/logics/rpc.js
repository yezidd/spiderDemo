/**
 * Created by tdzl2003 on 6/18/16.
 */
import URI from 'urijs';
import 'whatwg-fetch';


export async function _setToken(token) {
  await localStorage.setItem('token', token);
}

export async function _getToken() {
  return await localStorage.getItem("token");
}

const URLPRE = "/api/v1"

async function request(url, _options) {
  const uri = new URI(URLPRE + url);

  const options = _options || {};
  options.method = options.method || 'GET';
  options.headers = options.headers || {};

  options.headers['Authorization'] = 'hello ' + _getToken();

  console.log(options);

  if (__DEV__) {
    console.log(`${options.method} ${uri}`);
    if (options.body) {
      console.log(options.body);
    }
  }

  const resp = await fetch(uri.toString(), options);
  console.log(resp);
  const text = await resp.text();
  const json = JSON.parse(text);
  console.log(json);

  //状态码以2开头的说明请求成功
  if (resp.status.toString().indexOf("2") === 0) {

  } else {
    //token验证失败
    if (resp.status === "401") {

    } else {
      throw new Error(json.message);
    }
  }
  return json;
}

export function get(url, options) {
  return request(url, options);
}

export function post(url, data, options) {
  return request(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    ...options,
  });
}

export function put(url, data, options) {
  return request(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    ...options,
  });
}


export function del(url, data, options) {
  return request(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    ...options,
  });
}

