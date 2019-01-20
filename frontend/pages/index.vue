<template>
  <section class="container">
    <div>
      <h1 class="title">
        url-shortener
      </h1>
      <div class="form">
        <el-form :inline="false" :model="form" class="demo-form-inline">
          <div class="animated fadeInUp">
            <el-form-item>
              <el-input type="info" placeholder="Paste a link to shorten it e.g. http://google.com " v-model="form.originalUrl">
                <template class="prepend" slot="prepend">link</template>
              </el-input>
            </el-form-item>

            <el-form-item>
              <el-input type="info" placeholder="name your the link *optional e.g. google" v-model="form.aliasUrl">
                <template class="prepend" slot="prepend">alias</template>
              </el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="danger" :loading="isLoading" :round="true" @click="createUrl" :disabled="isURL(form.originalUrl) == false || isAlias(form.aliasUrl) == false">SHORTEN</el-button>
            </el-form-item>
          </div>

          <div class="short-url">
            <transition name="list" mode="in-out">
              <el-form-item v-show="!isHide">
                <el-input readonly size="mini" type="info" placeholder="alias of the link *optional e.g. google" :value="form.shortUrl">
                  <template class="prepend" slot="prepend">short link</template>
                  <el-button slot="append" icon="el-icon-d-arrow-right" style="width: 20px; padding: 0" @click="newTab(form.shortUrl)"></el-button>
                </el-input>
              </el-form-item>
            </transition>
          </div>
        </el-form>
      </div>
      <div class="form">
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
import axios from '~/plugins/axios.js'

export default {
  transition: 'fadeIn',
  components: {

  },
  data() {
    return {
      form: {
        originalUrl: '',
        aliasUrl: '',
        shortUrl: ''
      },
      isHide: true,
      isLoading: false
    }
  },
  methods: {
    createUrl() {
      if (this.form.aliasUrl.trim() == '') {
        this.createShortUrl()
      }
      else {
        this.createAliasUrl()
      }
    },
    createShortUrl() {
      console.log('short!');
      let _this = this
      let originalUrl = _this.form.originalUrl

      let body = {
        originalUrl: originalUrl
      }

      // call createShortUrl api
      _this.isLoading = true
      axios.post('short', body)
        .then((result) => {
          console.log('createShortUrl', result.data)
          let data = result.data.data
          setTimeout(()=> {
              _this.isHide = true
              setTimeout(()=> {
              _this.isHide = false
              _this.form.shortUrl = window.location.origin + '/' + data.shortUrl
              }, 300)
              _this.isLoading = false
          }, 300)
        })
        .catch((error) => {
          console.error(error)
        })
    },
    createAliasUrl() {
      console.log('alias!');
      let _this = this
      let originalUrl = _this.form.originalUrl
      let aliasUrl = _this.form.aliasUrl

      let body = {
        originalUrl: originalUrl,
        aliasUrl: aliasUrl
      }

      // call createAliasUrl api
      _this.isLoading = true
      axios.post('alias', body)
        .then((result) => {
          console.log("createAliasUrl", result.data)
          if (result.data.success == true) {
            let data = result.data.data
            setTimeout(()=> {
                _this.isHide = true
                setTimeout(()=> {
                _this.isHide = false
                _this.form.shortUrl = window.location.origin + '/' + data.shortUrl
                }, 300)
                _this.isLoading = false
            }, 300)
          }
          else {
            _this.isHide = true
            this.$message.error('Oops, ' + result.data.message)
            setTimeout(()=> {
              _this.isLoading = false
            }, 300)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    isURL(str) {
      if (str.trim() == '') {
        return false
      }
      let urlRegex = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$'
      let url = new RegExp(urlRegex, 'i')
      return str.length < 2083 && url.test(str)
    },
    isAlias(str) {
      if (str.trim() == '') {
        return true
      }
      else {
        let urlRegex = '^[a-zA-Z0-9]+$'
        let url = new RegExp(urlRegex)
        return url.test(str)
      }
    },
    newTab(url) {
      window.open(url, '_blank');
    }
  }
}
</script>

<style>
.el-input {
  width: 550px;
}

.el-input-group__prepend {
  width: 100px !important;
}

.el-button {
  width: 250px;
  border: none;
}

.el-form-item.shortUrl-warper {
  margin-bottom: 0px !important;
}

.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
  margin-bottom: 20px;
}

.links {
  padding-top: 15px;
}

.form {
  margin-bottom: 100px;
}

.short-url {
  height: 50px;
}

.list-enter-active, .list-leave-active {
  transition: all 0.30s;
}

.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

</style>
