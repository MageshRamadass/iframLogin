<template>
    <div class="mainbgclr">
      <v-container fill-height class="SsoView pa-0 pa-sm-3">
        <!-- <button id="authorize_button" @click="handleAuthClick()">Authorize</button>
    <button id="signout_button" @click="handleSignoutClick()">Sign Out</button> -->
    <pre id="content" style="white-space: pre-wrap;"></pre>
    <div>
    <!-- <v-btn to="https://accounts.google.com/o/oauth2/v2/auth?scope=https://mail.google.com&access_type=offline&redirect_uri=http://localhost:8080&response_type=code&client_id=272883542308-4s1570et2p3gjhj9imf8s9g54p7kku7o.apps.googleusercontent.com">Login</v-btn> -->
    <!-- <a href="https://accounts.google.com/o/oauth2/v2/auth?scope=https://mail.google.com&access_type=offline&redirect_uri=http://localhost:8080&response_type=code&client_id=272883542308-4s1570et2p3gjhj9imf8s9g54p7kku7o.apps.googleusercontent.com">
      Click me login</a>  -->
      <v-btn href="https://accounts.google.com/o/oauth2/v2/auth?scope=https://mail.google.com&access_type=offline&redirect_uri=https://signintest-97502.firebaseapp.com&response_type=code&client_id=272883542308-4s1570et2p3gjhj9imf8s9g54p7kku7o.apps.googleusercontent.com">G-auth</v-btn> 
  </div>
  <v-row>
    <v-col>
      <div>
  <h3>Refresh Token:</h3><span>{{res_ref}} {{errMsg}}</span>
  <h3>Access Token:</h3> <span>{{res}}</span>
</div>
    </v-col>
  </v-row>

      </v-container>
    
    </div>
  </template>
  <script src="https://apis.google.com/js/api.js" @load="gapiLoaded()"></script>
      <script src="https://accounts.google.com/gsi/client" @load="gisLoaded()"></script>
  <script>  
  export default {
    data() {
      return {
        snackbar: false,
        errMsg: "",
        sheet: false,
        section: "Loin",
        loading: "",
        contactBtn: true,
        iosLink: false,
        androidLink: false,
        response: "",
        gapiInited: true,
        gisInited: true,
        tokenClient: null,
        contactArray: [],
        contactData: [],
        Client_refferal_url: "",
        urlisgenerated: false,
        clientcode: null,
        assa: null,
        refreshToken: '',
        res:'',
        res_ref:''
      };
    },
    created() {
      var url = new URL(window.location.href);
    var cOde = url.searchParams.get("code");
    localStorage.setItem("cod",cOde)
    // var codes = localStorage.getItem("cod")
    var decoded = decodeURI(cOde)
    if (this.refreshToken == '') {
      // console.log("code",cOde)
      // console.log("decoded",cOde)

      var axios = require('axios');
          var qs = require('qs');
          var axiosthis = this
          var data = qs.stringify({
            'code': cOde,
            'client_id': '272883542308-4s1570et2p3gjhj9imf8s9g54p7kku7o.apps.googleusercontent.com',
            'client_secret': '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',
            'redirect_uri': 'https://signintest-97502.firebaseapp.com',
            'grant_type': 'authorization_code',
            'access_type': 'offline'
          });
    // // console.log("da",data)

          var config = {
            method: 'post',
            url: 'https://accounts.google.com/o/oauth2/token',
            headers: { 
              'Content-Type': 'application/x-www-form-urlencoded', 
              // 'Cookie': '__Host-GAPS=1:zZDjLwtttyilNYykECmVuNz8wzY9gA:-H2M7RvUIKhmjAMP'
            },
            data : data
          };
    // console.log("da",data)
          
          axios(config)
          .then(function (response) {
            // console.log(JSON.stringify(response.data));
            // console.log(response.data.refresh_token);
            if(response.data.refresh_token == undefined) {
              axiosthis.errMsg = "Refresh token already generated"
            } else {
              axiosthis.errMsg = ""
            }
            axiosthis.refreshToken = response.data.refresh_token
            axiosthis.res = response.data.access_token
            axiosthis.res_ref = response.data.refresh_token

          })
          .catch(function (error) {
             console.log(error);
          });

    }
    },
    updated() {
    // console.log(`At this point, Virtual DOM has re-rendered and patched.`)
    // Fired every second, should always be true
    // console.log("jhj",this.assa)
  },
  
    methods: {
      google() {
      // window.href = "https://accounts.google.com/o/oauth2/v2/auth?scope=https://mail.google.com&access_type=offline&redirect_uri=http://localhost:8080&response_type=code&client_id=272883542308-4s1570et2p3gjhj9imf8s9g54p7kku7o.apps.googleusercontent.com"
      },
      RefreshData() {
        this.tokenClient.callback = async (resp) => {
          // document.getElementById("authorize_button").style.visibility = "none";
          await this.listConnectionNames();
        };
  
        if (gapi.client.getToken() === null) {
          this.tokenClient.requestAccessToken({ prompt: "consent" });
        } else {
          this.tokenClient.requestAccessToken({ prompt: "" });
        }
      },
      sheetup() {
        // document.getElementById("btmblrid").style.transition = "all 0.3s";
        // document.getElementById("btmblrid").style.height = "100vh";
      },
  
      async intializeGapiClient() {
        await gapi.client.init({
          apiKey: "AIzaSyDPX16M26gh_fNOZ8LQK4uhQBTbuVK5v6w",
          discoveryDocs: [
            // "https://www.googleapis.com/discovery/v1/apis/people/v1/rest",
            "https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest",
            // "https://www.googleapis.com/gmail/v1/users/me/messages",
          ],
        });
        this.gapiInited = true;
        this.maybeEnableButtons();
      },

      gisLoaded() {
        // console.log("looding gisLoaded");
        this.tokenClient = google.accounts.oauth2.initTokenClient({
          client_id:
            "272883542308-4s1570et2p3gjhj9imf8s9g54p7kku7o.apps.googleusercontent.com",
            client_secret: "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",
          scope: "https://www.googleapis.com/auth/gmail.readonly",
          callback: "",
        });
        // console.log("this.tokenClient", this.tokenClient);
        this.gisInited = true;
        this.maybeEnableButtons();
      },
      maybeEnableButtons() {
        // if (this.gapiInited && this.gisInited) {
        //   document.getElementById("authorize_button").style.visibility =
        //     "visible";
        // }
      },
       handleSignoutClick() {
        const token = gapi.client.getToken();
        if (token !== null) {
          google.accounts.oauth2.revoke(token.access_token);
          gapi.client.setToken('');
          // document.getElementById('content').innerText = '';
          // document.getElementById('authorize_button').innerText = 'Authorize';
          // document.getElementById('signout_button').style.visibility = 'hidden';
        }
      },
      async listLabels() {
        let response;
        try {
          response = await gapi.client.gmail.users.messages.list({  
            'userId': 'me',
            'labelIds': 'INBOX',    
        //   'maxResults': 10
          });
        } catch (err) {
          // document.getElementById('content').innerText = err.message;
          return;
        }
        // console.log("res",response)
        const labels = response.result.labels;
        // if (!labels || labels.length == 0) {
        //   // document.getElementById('content').innerText = 'No labels found.';
        //   return;
        // }
        // Flatten to string to display
        const output = labels.reduce(
            (str, label) => `${str}${label.name}\n`,
            'Labels:\n');
        document.getElementById('content').innerText = output;
      },
      gapiLoaded() {
        gapi.load("client", this.intializeGapiClient);
      },
       handleAuthClick() {
        this.tokenClient.callback = async (resp) => {
            // console.log("callback",resp)
          if (resp.error !== undefined) {
            throw (resp);
          }
          // document.getElementById('signout_button').style.visibility = 'visible';
          // document.getElementById('authorize_button').innerText = 'Refresh';
          await this.listLabels();
          // console.log("s",gapi.client.getToken().access_token, "sdfsdf",)
        };

        if (gapi.client.getToken() === null) {
          // Prompt the user to select a Google Account and ask for consent to share their data
          // when establishing a new session.
          this.tokenClient.requestAccessToken({prompt: 'consent'});
        } else {
          // Skip display of account chooser and consent dialog for an existing session.
          this.tokenClient.requestAccessToken({prompt: ''});
        }
      },
  
      shareonwebwhatapp() {
        window.open(
          "https://wa.me/?text=Zebu offers trading and investment opportunities. Create an account right away. " +
            this.Client_refferal_url
        );
      },
  
      shareViaWebShare() {
        navigator.share({
          title: "Zebu",
          text: "Zebu offers trading and investment opportunities. Create an account right away. ",
          url: this.Client_refferal_url,
        });
      },
  
      getrefferalUrl(c) {
        var respdata = "https://oa.zebull.in/?ref=";
        if (c) {
          // console.log("not Invalid : ","https://oa.zebull.in/?ref=")
          this.Client_refferal_url = respdata + c.toUpperCase();
          this.urlisgenerated = true;
        }
      },
    },
    mounted() {
      // var url_string = window.location.href;
      var url = new URL(window.location.href);
      var c = url.searchParams.get("cid");
      this.gapiLoaded();
      this.gisLoaded();
  
      if (c) {
        //console.log("window.location.href : ",window.location.href);
        this.getrefferalUrl(c);
      } else if (localStorage.getItem("cid")) {
        // console.log("cid from storage : ",localStorage.getItem("cid"))
        var cid = localStorage.getItem("cid");
        this.getrefferalUrl(cid);
      } else {
        this.Client_refferal_url = "";
      }
      this.getMobileOS();
    },
  };
  </script>
  
  <style>
  .v-application,
  .v-application .display-1,
  .v-application .headline,
  .v-application .title,
  .v-application .subtitle-1,
  .v-application .subtitle-2,
  .v-application .body-1,
  .v-application .body-2,
  .v-application .caption {
    font-family: "Inter", sans-serif !important;
  }
  
  ::-webkit-scrollbar {
    width: 0;
  }
  
  .mblframe {
    height: 100% !important;
    overflow-y: hidden !important;
    border-radius: 12px !important;
  }
  
  .innerscreen {
    height: 100vh !important;
    overflow-y: scroll !important;
    scroll-behavior: smooth !important;
  }
  
  .innerscreen::-webkit-scrollbar {
    width: 0 !important;
  }
  
  .innerscreen::-webkit-scrollbar-track {
    border-radius: 10px;
    color: grey;
  }
  
  .innerscreen::-webkit-scrollbar-thumb {
    background: #c4c4c4;
    border-radius: 10px;
  }
  
  .mainbgclr {
    background-color: #eceef0 !important;
    height: 100vh !important;
    overflow-y: hidden !important;
  }
  
  .SsoView {
    height: 100% !important;
    overflow-y: scroll !important;
  }
  
  .crdbgimg {
    background-image: url("@/assets/Artboard.svg") !important;
    background-size: 100% !important;
  }
  
  .btn {
    background-color: white !important;
    color: black !important;
    box-shadow: 0px 8px 16px 2px rgba(22, 34, 51, 0.08) !important;
  }
  
  .v-btn:hover:before,
  .v-btn:focus:before {
    background-color: blue !important;
  }
  
  .v-text-field.v-text-field--enclosed:not(.v-text-field--rounded)
    > .v-input__control
    > .v-input__slot {
    background-color: white !important;
    box-shadow: none !important;
  }
  
  .v-text-field input {
    font-size: 12px !important;
  }
  
  .btninrtxt {
    font-size: 12px !important;
    font-weight: medium !important;
  }
  
  .btmblr {
    background: white !important;
    box-shadow: 0px 8px 16px 2px rgba(22, 34, 51, 0.1) !important;
    overflow-y: scroll !important;
  }
  
  .v-dialog {
    box-shadow: none !important;
  }
  
  @media only screen and (max-width: 425px) {
    .mainbgclr {
      background-color: white !important;
    }
  
    .mblframe {
      width: 100% !important;
      border-radius: 0 !important;
    }
  
    .innerscreen::-webkit-scrollbar {
      width: 0 !important;
    }
  
    .btmblr {
      width: 100% !important;
    }
  }
  </style>