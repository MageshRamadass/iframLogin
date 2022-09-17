<template>
  <div class="signupbgclr">
    <v-container fill-height class="SsoView">
      <v-card max-width="400px" class="mx-auto my-auto elevation-0 py-8 pb-1 rounded-lg">
        <div class="px-4 px-sm-6 px-md-8">
          <!-- <img class="" src="@/assets/ZebuLogo.svg" width="30px"> -->
          <v-card-title class="headline font-weight-bold pl-0" style="color:black;">
            <p class="mr-16 ">Score</p>
          </v-card-title>
          <v-card-subtitle class="body-1 pl-0">Track all of your data from anywhere, at any time.</v-card-subtitle>
          <!-- <img src="@/assets/Group 277.svg" class="mt-2 mb-6" width="100%" alt=""> -->
          <v-card-action>

            <v-btn @click="clcframe" plain :ripple="false" block large color="white" class="btn mb-2 rounded-lg">
              <b style="color:black;">
                Login
              </b>
            </v-btn>
            <iframe id="myiframe" class="dialogframe rounded-lg" height="600px" src="https://zebull.in/?mode=SSO&vendor=MyZebu&redirectUrl=http://192.168.5.198:8082/about"
              ></iframe>

            <v-dialog v-model="signindialog" hide-overlay persistent width="400px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" plain :ripple="false" block large color="white"
                  class="btn mb-2 rounded-lg"><b style="color:black;">
                    sign in with ZEBULL
                  </b></v-btn>
              </template>
              <iframe id="myiframe" class="dialogframe rounded-lg" height="600px"
                src="https://zebull.in/embed"></iframe>
            </v-dialog>

            <v-row no-gutters class="my-4">
              <v-col cols="5">
                <v-divider class="mx-2 mt-2" color="#DBE3EA"></v-divider>
              </v-col>
              <v-col cols="2">
                <p class="text-center caption mb-0"> or </p>
              </v-col>
              <v-col cols="5">
                <v-divider class="mx-2 mt-2" color="#DBE3EA"></v-divider>
              </v-col>
            </v-row>

            <v-btn href="https://oa.zebull.in" target="_blank" plain :ripple="false" block large color="white"
              class="btn mb-2 rounded-lg"><b style="color:black;">
                Open an account
              </b></v-btn>
          </v-card-action>

          <v-card-subtitle style="font-size:11px;" class="text-center">
            <p style="color:#858B95;">By continuing with ZEBU, you agree our Terms and Privacy Policy
            </p>
          </v-card-subtitle>
        </div>
      </v-card>
    </v-container>
  </div>
</template>

<script>
// import VueRouter from 'vue-router'
export default {
  name: "SsoView",

  data() {
    return {
      /* eslint-disable */
      signindialog: false,
    }
  },
  mounted() {
    const myIframe = document.getElementById('myiframe');
      const iframeWindow = document.getElementById("myiframe").contentWindow.location.href
      console.log("test",iframeWindow);

      var url = new URL(iframeWindow);
      var authCode = url.searchParams.get("authCode");
      if (authCode) {
        // router.push('about')
        this.$router.push({ name: 'dashboard', params: "/dashboard"});
      }
  
  },
  methods: {

    clcframe() {
      const myIframe = document.getElementById('myiframe');
      const iframeWindow = document.getElementById("myiframe").contentWindow.location.href
      console.log("test",iframeWindow);

      var url = new URL(iframeWindow);
      var authCode = url.searchParams.get("authCode");
      localStorage.setItem("auth", authCode)
      if (authCode) {
        // router.push('about')
        this.$router.push({ name: 'dashBoard', params: "/dashBoard"});
      }
    },
  }
}
</script>


<style>
::-webkit-scrollbar {
  width: 0;
}

.btn {
  box-shadow: 0px 8px 16px 2px rgba(22, 34, 51, 0.08) !important;
}

.signupbgclr {
  background-color: #ECEEF0 !important;
  height: 100vh !important;
  overflow-y: hidden !important;
}

.SsoView {
  height: 100vh !important;
  overflow-y: scroll !important;
}

.dialogframe,
.v-dialog {
  border: none !important;
  box-shadow: none !important;
}

@media only screen and (max-width: 600px) {
  .signupbgclr {
    background-color: white !important;
  }

  .btn:hover {
    background-color: #ECEEF0 !important;
  }
}
</style>