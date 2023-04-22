<template>
  <div class="main">
    <div class="header">
      <img src="https://www.hualigs.cn/image/641fdd4dac243.jpg"  style="height: 60px;margin-bottom: -40px">
      <div class="header-d1">领智行高校认证</div>
      <div class="header-d2">HelpEaseProApp</div>
    </div>
    <van-tabs style="width: 200px;padding-top: 30px;text-align: center;margin: auto" v-model="active">
      <van-tab title="高校认证"/>
<!--      <van-tab title="账号注册"/>-->
    </van-tabs>
    <div class="form" v-if="active === 0">
      <input placeholder="请输入手机" v-model="signInForm.phone" class="input"/>
      <input placeholder="请输入密码" type="password" v-model="signInForm.password" class="input"/>
      <van-button @click="submitSignIn" type="info" class="btn">验 证</van-button>
    </div>
    <div class="form" v-if="active === 1">
      <van-uploader v-model="fileList"
                    :after-read="onRead"
                    :max-count="1">
        <template #preview-cover="{ file }">
          <div class="preview-cover van-ellipsis">{{ file.name }}</div>
        </template>
      </van-uploader>
      <div style="font-size: 12px;color: #909399;padding-left: 15px;margin-bottom: 10px">上传头像</div>
      <input placeholder="请输入手机号码" v-model="signUpForm.phone" class="input"/>
      <input placeholder="请输入密码" v-model="signUpForm.password" type="password" class="input"/>
      <input placeholder="请输入昵称" v-model="signUpForm.nickname" class="input"/>
      <input placeholder="请输入就读高校" v-model="signUpForm.school" class="input"/>
      <van-button @click="submitSignUp" type="info" class="btn">注 册</van-button>
    </div>
    <div class="container">
      <img class="img" src="https://www.hualigs.cn/image/641fdd4dac243.jpg" alt="your-image" />
    </div>
  </div>
</template>

<script>
import {checkSignInForm, checkSignUpForm} from "@/utils/check";
import {Login, SaveUser} from "@/api/user";
import axios from "axios";
import {BASE_RUL} from "@/utils/request";

export default {
  data() {
    return {
      active: 0,
      fileList: [],
      signInForm: {
        phone: '',
        password: '',
      },
      signUpForm: {
        avatar: '',
        nickname: '',
        phone: '',
        password: '',
        school: '',
      },
    };
  },

  methods: {

    onRead() {
      let formData = new FormData()
      let file = this.fileList[0].file
      formData.append("file", file, file.name)
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
      axios.post("/api/file/image", formData, config).then((res) => {
        if (res.status === 200) this.signUpForm.avatar = res.data
      })
    },

    submitSignIn() {
      if (checkSignInForm(this.signInForm)) {
        Login(this.signInForm).then((res) => {
          if (res.status) {
            localStorage.setItem("user", JSON.stringify(res.data))
            localStorage.setItem("uid", res.data.id)
            this.$toast.success("认证成功")
            this.$router.push("/")
          }
        })
      }
    },

    submitSignUp() {
      if (checkSignUpForm(this.signUpForm)) {
        SaveUser(this.signUpForm).then((res) => {
          if (res.status) {
            this.$toast.success("注册成功")
            setTimeout(() => {
              this.signUpForm = {}
              this.fileList = []
              this.active = 0
            }, 700)
          }
        })
      }
    },
  },

};
</script>

<style scoped>
.container {
  margin-top: -30px;
  position: relative;
  width: 100%;
  height: 100%;
}
.img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 100%;
  height: auto;
  z-index: -1;
}


.preview-cover {
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  width: 100%;
  padding: 4px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
}

>>> .van-tab__text {
  font-size: 16px;
  letter-spacing: 1px;
}

.main {
  width: 100%;
  height: 100%;
}

.header {
  height: 110px;
  background: #0066ff;
  text-align: center;
  letter-spacing: 1px;
}

.header-d1 {
  color: #ffffff;
  font-size: 22px;
  padding-top: 25px;
}

.header-d2 {
  color: #f5f6f7;
  font-size: 13px;
  padding-top: 10px;
}

.form {
  width: 90%;
  height: 300px;
  margin: 20px auto;
}

.input {
  width: 94%;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  color: rgba(0, 0, 0, .4);
  letter-spacing: 1px;
  margin: 10px 0;
  padding: 10px;
  font-size: 13px;
}

.btn {
  width: 100%;
  margin: 30px 0;
}

>>> .van-tabs__line {
  background-color: #0066ff;
  width: 30px;
}
</style>
