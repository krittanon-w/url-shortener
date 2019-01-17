<template>
  <section class="container">
    <div>
      <h1 class="title">
        url-shortener
      </h1>
      <div class="form slideInUp">
        <el-form :inline="false" :model="form" class="demo-form-inline">
          <el-form-item>
            <el-input placeholder="Paste a link to shorten it e.g. http://google.com " v-model="form.originalUrl">
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-input placeholder="alias of the link *optional e.g. google" v-model="form.aliasUrl">
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="createUrl">SHORTEN</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  transition: 'fadeIn',
  components: {
    Logo
  },
  data() {
    return {
      form: {
        originalUrl: '',
        aliasUrl: ''
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
    },
    createAliasUrl() {
      console.log('alias!');
    }
  }
}
</script>

<style>
.el-input {
  width: 500px;
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

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.form {
  margin-bottom: 100px;
}
</style>
