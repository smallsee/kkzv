<template>
  <div class="hello">
    <input type="text" v-model="login.email">
    <input type="text" v-model="login.password">
    <button @click="_postForm">登陆</button>
  </div>
</template>

<script>
  import {loginUrl, getHeader, userUrl} from 'api/config';
  import {clientId,clientSecret} from '../../env'
export default {
  data() {
    return {
      login: {
        email: '13631297694@163.com',
        password: '283629211'
      }
    }
  },
  methods: {

    _postForm() {
      const postData = {
        grant_type: 'password',
        client_id: clientId,
        client_secret: clientSecret,
        username: this.login.email,
        password: this.login.password,
        scope: ''
      };

      this.$http.post(loginUrl, postData)
        .then(res => {

          if (res.status === 200){
            console.log(res);
            const authUser = {};
            authUser.access_token =res.data.access_token;
            authUser.refresh_token =res.data.refresh_token;
            window.localStorage.setItem('authUser',JSON.stringify(authUser))

            this.$http.get(userUrl, {headers: getHeader()})
              .then(res => {
                console.log(res)
              })
          }

        })

    }

  },

  created() {


    //axios

    this.axios.get('http://127.0.0.1:8000/api/user',{
      params: {
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvdXNlci9sb2dpbiIsImlhdCI6MTUwMTg1OTQ0MywiZXhwIjoxNTAxODYzMDQzLCJuYmYiOjE1MDE4NTk0NDMsImp0aSI6InFPM3htdHNOVGtwUHIwYWoifQ._Q0_jtJv4jIvOyrkzyStt0vBVSkkZsQD03-0qqnYHL4'
      }
    }).then(res => {
      console.log(res.data)
    })

    // vue-resource
//    this.$http.get('http://127.0.0.1:8000/api/user?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvdXNlci9sb2dpbiIsImlhdCI6MTUwMTg1OTQ0MywiZXhwIjoxNTAxODYzMDQzLCJuYmYiOjE1MDE4NTk0NDMsImp0aSI6InFPM3htdHNOVGtwUHIwYWoifQ._Q0_jtJv4jIvOyrkzyStt0vBVSkkZsQD03-0qqnYHL4',{
//      id: 1
//    })
//      .then(res => {
//        console.log(res)
//      })


//      const postData = {
//        grant_type: 'password',
//        client_id: 2,
//        client_secret: '3XDPA0cKD6VcIMNcIssdnaM7eNATkIqD7cSu4Gtf',
//        username: '13631297694@163.com',
//        password: '283629211',
//        scope: ''
//      };
//      this.$http.post('http://127.0.0.1:8000/oauth/token',postData)
//        .then(res => {
//
//        console.log(res);
//
//        const header = {
//          'Accept': 'application/json',
//          'Authorization': 'Bearer  ' + res.body.access_token
//        };
//
//
//          this.$http.get('http://localhost:8000/api/user',{headers: header})
//            .then(res => {
//              console.log(res)
//            })
//
//      });




  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
