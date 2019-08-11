<template>
  <div>
    <div class="background">
    </div>
    <div class="header">
    </div>
    <div class="body-content">
      <div></div>
      <div class="login-box">
        <div>
          <a-input type="text" class="components-input-demo-presuffix" placeholder="请输入账号" v-model="userName" ref="userNameInput" @blur="blurUserName">
            <a-icon slot="prefix" type="user" />
            <a-icon class="anticon-close-circle" v-if="userName" slot="suffix" type="close-circle" @click="emitEmptyUserName" />
          </a-input>
        </div>
        <div>
          <a-input type="password" class="components-input-demo-presuffix" placeholder="请输入密码" v-model="password" ref="passwordInput" @blur="blurPassword">
            <a-icon slot="prefix" type="lock" />
            <a-icon class="anticon-close-circle" v-if="password" slot="suffix" type="close-circle" @click="emitEmptyPassword" />
          </a-input>
        </div>
        <div class="prompt-font">
        </div>
        <div>
          <a-checkbox @change="remberMe">下次自动登录</a-checkbox>
        </div>
        <div>
          <a-button type="primary" block @click="login">登录</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .background{
    position: absolute;
    top: 0;
    left: 0;
    min-width: 1200px;
    width: 100%;
    height: 100%;
  }
  .header{
    position: absolute;
    top: 0;
    left: 0;
    min-width: 1200px;
    height: 90px;
    width: 100%;
    background-color: #1890ff;
  }
  .body-content{
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    align-items: center;
    margin-top: -300px;
    margin-left: -600px;
    width: 1200px;
    height: 600px;
  }
  .body-content>div:nth-child(1){
    position: absolute;
    left: 0;
  }
  .body-content>div:nth-child(2){
    position: absolute;
    right: 0;
    width: 360px;
    padding: 40px 20px 60px 20px;
    border: 1px solid #1890ff;
  }
  /*参考ant desgin vue样式*/
  .components-input-demo-presuffix .anticon-close-circle {
    cursor: pointer;
    color: #ccc;
    transition: color 0.3s;
    font-size: 13px;
  }
  .components-input-demo-presuffix .anticon-close-circle:hover {
    color: red;
  }
  .components-input-demo-presuffix .anticon-close-circle:active {
    color: #666;
  }
  .prompt-font{
    height: 18px;
    line-height: 18px;
    color: red;
    margin-top: 3px !important;
  }
  .login-box>div{
    margin-top: 20px;
  }
</style>

<script>
// @ is an alias to /src
import axios from 'axios'
import $ from 'jquery'
import store from '@/store.js'
import router from '@/router.js'
import Cookies from 'js-cookie'

export default {
  name: 'home',
  data () {
    return {
      userName: '',
      password: '',
      autoLogin: '',
      isAllFillIn: 0
    }
  },
  methods: {

    // 清空用户名和密码
    emitEmptyUserName: function () {
      this.$refs.userNameInput.focus()
      this.userName = ''
    },
    emitEmptyPassword: function () {
      this.$refs.passwordInput.focus()
      this.password = ''
    },

    // 鼠标离开输入框的提示
    blurUserName: function () {
      let element = $('div.prompt-font')[0]
      if (this.userName === '') {
        element.innerText = '请输入用户名'
      } else {
        element.innerText = ''
      }
    },
    blurPassword: function () {
      let element = $('div.prompt-font')[0]
      if (this.userName === '') {
        element.innerText = '请输入用户名'
      } else if (this.password === '') {
        element.innerText = '请输入密码'
      } else {
        element.innerText = ''
        this.isAllFillIn = 1
      }
    },

    // 下次自动登录，ture表示自动登录，false表示不自动登录
    remberMe: function (e) {
      this.autoLogin = e.target.checked
    },

    // 登录的函数
    login: function () {
      let element = $('div.prompt-font')[0]

      // 调试程序
      let routeData = router.resolve({ path: '/headquarter' })
      window.open(routeData.href, '_blank')

      if (this.isAllFillIn) {
        axios.post('/login', {
          'username': this.username,
          'password': this.password
        },
        {
          headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'timeout': 6000
          }
        })
          .then((response) => {
            if (response.status === 200) {
              if (response.data.username) {
                store.commit('login', response.data)
                if (this.autoLogin) {
                  Cookies.set('userName', this.userName, { expires: 7 })
                  Cookies.set('password', this.password, { expires: 7 })
                }
                if (response.data.type === 'headquarter') {
                  let routeData = router.resolve({ path: '/headquarter' })
                  window.open(routeData.href, '_blank')
                } else if (response.data.type === 'community') {
                  let routeData = router.resolve({ path: '/community' })
                  window.open(routeData.href, '_blank')
                } else if (response.data.type === 'property') {
                  let routeData = router.resolve({ path: '/property' })
                  window.open(routeData.href, '_blank')
                }
              }
            } else {
              element.innerText = '请输入正确的用户名或密码'
            }
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        element.innerText = ''
      }
    }
  }
}
</script>
