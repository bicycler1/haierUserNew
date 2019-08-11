<template>
  <a-layout id="components-layout-demo-custom-trigger" class="layout-body">
    <a-layout-header class="header">
      <div class="logo" />
      <div class="user-info">
        ajshdkahdk
      </div>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <a-menu
          mode="inline"
          :defaultSelectedKeys="['1']"
          :defaultOpenKeys="['sub1']"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <a-sub-menu key="sub1">
            <span slot="title"><a-icon type="alert" />小区报警情况管理</span>
            <a-menu-item key="1">option1</a-menu-item>
            <a-menu-item key="2">option2</a-menu-item>
            <a-menu-item key="3">option3</a-menu-item>
            <a-menu-item key="4">option4</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <span slot="title"><a-icon type="laptop" />小区信息管理</span>
            <a-menu-item key="5">option5</a-menu-item>
            <a-menu-item key="6">option6</a-menu-item>
            <a-menu-item key="7">option7</a-menu-item>
            <a-menu-item key="8">option8</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub3">
            <span slot="title"><a-icon type="usergroup-add" />小区管理员账号管理</span>
            <a-menu-item key="9">option9</a-menu-item>
            <a-menu-item key="10">option10</a-menu-item>
            <a-menu-item key="11">option11</a-menu-item>
            <a-menu-item key="12">option12</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px ">
        <a-layout-content class="content-button">
          <div>
            <a-button type="primary">
              <a-icon type="plus" />新增
            </a-button>
          </div>
          <div>
            <a-button type="danger">
              <a-icon type="minus" />删除
            </a-button>
          </div>
          <div>
            <a-input-search
              :placeholder="searchPlaceholder"
              @search="onSearch"
              enterButton
              v-model="searchText"
              ref="searchInput"
            />
          </div>
        </a-layout-content>
        <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }">
          <table class="content-table">
            <thead>
            <tr>
              <td>
                <a-checkbox></a-checkbox>
              </td>
              <td v-for="(value,index) in theadData" :key="index">
                {{value}}
              </td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(p, index) in tbodyData" :key="index">
              <td>
                <a-checkbox @click="chooseTable(index)"></a-checkbox>
              </td>
              <td>
                {{p.age}}
              </td>
              <td>
                {{p.name1}}
              </td>
              <td>
                {{p.age1}}
              </td>
            </tr>
            </tbody>
          </table>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<style scoped>
  .layout-body{
    min-height: 100vh;
  }
  .header{
    display: flex;
    align-items: center;
  }
  .logo{
    background: #fff;
  }
  .user-info{
    position: absolute;
    top: 0;
    right: 60px;
  }
  .content-button{
    display: flex;
    align-items: center;
    max-height: 60px;
    background-color: #e6f7ff;
    padding: 0 20px;
  }
  .content-button>div{
    margin-left: 20px;
  }
  .content-button>div:last-child{
    position: absolute;
    right: 64px;
  }
  .content-table{
    width: 100%;
  }
  thead>tr>td:nth-child(1){
    width: 30px;
  }
  td{
    border: 1px solid #cccccc;
  }
  tbody>tr:nth-of-type(odd){
    background-color: #fff;
  }
  tbody>tr:nth-of-type(even){
    background-color: #eee;
  }
  #components-layout-demo-top-side-2 .logo {
    width: 120px;
    height: 31px;
    background: rgba(255,255,255,.2);
    margin: 16px 28px 16px 0;
    float: left;
  }
</style>

<script>
import axios from 'axios'
export default {
  name: 'property',
  data () {
    return {
      collapsed: false,
      searchPlaceholder: '搜索',
      searchText: '',
      tableChooseNumber: [],
      // tbody测试
      theadData: ['报警时间', '报警小区', '报警小区位置', '报警人姓名', '报警人联系方式'],
      tbodyData: [
        { name: 1211, age: 12, name1: 1211, age1: 12 },
        { name: 1211, age: 12, name1: 1211, age1: 12 }
      ]
    }
  },
  methods: {
    eventPrevent: function (e) {
      e.preventDefault()
      e.stopPropagation()
    },
    onSearch: function (value) {
      if (this.searchText === '') {
        this.searchPlaceholder = '请输入搜索内容'
      } else {
        this.searchPlaceholder = '搜索'
        this.searchText = ''
      }
      console.log(value)
    },
    chooseTable: function (index) {
      let order = this.tableChooseNumber.indexOf(index)
      if (order !== -1) {
        this.tableChooseNumber.splice(order, 1)
      } else {
        this.tableChooseNumber.push(index)
      }
      this.tableChooseNumber.sort((a, b) => (a - b))
    }
  },
  mounted: function () {
    axios.get('/user', {
      params: {
        ID: 12345
      }
    })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
</script>
