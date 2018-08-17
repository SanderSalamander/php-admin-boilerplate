/*
MIT License
Copyright (c) 2018 Sander Larsen
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

class xhr {
  static send(obj) {

    let params
    let GET = obj.method.toUpperCase() === 'GET'
    let POST = obj.method.toUpperCase() === 'POST'
    if (obj.data) {
      params = obj.data === 'string'
        ? obj.data
        : Object.keys(obj.data).map(key => {
          return encodeURIComponent(key) + '=' + encodeURIComponent(obj.data[key])
        }).join('&')
    } else {
      params = ''
    }
    let request = window.XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject('Microsoft.XMLHTTP')
    let u = GET
      ? obj.url + '?' + params
      : obj.url
    const m = GET || POST
      ? obj.method.toUpperCase()
      : 'GET'
    request.open(m, u)
    request.onreadystatechange = () => {
      if (request.readyState > 3 && request.status === 200) obj.success(request.responseText)
    }
    request.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
    if (POST) {
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
      request.send(params)
    } else {
      request.send()
    }
  }

  static request(obj) {
    return new Promise((resolve, reject) => {
      let params
      let GET = obj.method.toUpperCase() === 'GET'
      let POST = obj.method.toUpperCase() === 'POST'
      if (obj.data) {
        params = obj.data === 'string'
          ? obj.data
          : Object.keys(obj.data).map(key => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(obj.data[key])
          }).join('&')
      } else {
        params = ''
      }
      let request = window.XMLHttpRequest
        ? new XMLHttpRequest()
        : new ActiveXObject('Microsoft.XMLHTTP')
      const url = GET
        ? obj.url + '?' + params
        : obj.url
      const method = GET || POST
        ? obj.method.toUpperCase()
        : 'GET'
      request.open(method, url)
      request.onload = () => {
        if (request.status >= 200 && request.status < 300) {
          resolve(request.response)
        } else {
          reject(request.statusText)
        }
      }
      request.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
      if (POST) {
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        request.send(params)
      } else {
        request.send()
      }
    })
  }
}