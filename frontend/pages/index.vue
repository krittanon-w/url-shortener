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
              <el-button type="info" @click="createUrl" :disabled="true">SHORTEN</el-button>
            </el-form-item>
          </div>

          <el-form-item v-if="form.shortUrl != ''" class="animated fadeInUp">
            <el-input type="info" placeholder="alias of the link *optional e.g. google" v-model="form.shortUrl">
              <template class="prepend" slot="prepend">short link</template>
            </el-input>
          </el-form-item>

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
      }
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

      axios.post('short', body)
        .then((result) => {
          console.log("createShortUrl", result.data)
          let data = result.data.data
          _this.form.shortUrl = "http://" + window.location.origin + "/" + data.shortUrl
        })
        .catch((error) => {
          console.log(error)
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

      axios.post('alias', body)
        .then((result) => {
          console.log("createShortUrl", result.data)
          let data = result.data.data
          _this.form.shortUrl = "http://" + window.location.origin + "/" + data.shortUrl
        })
        .catch((error) => {
          console.log(error)
        })
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
  background-color: #00d1b2;
  border: none;
}

.el-button:hover {
  transition: background-color 0.5s;
  background-color: #00c4a7;
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
</style>
