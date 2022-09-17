<template>
    <div class="signupbgclr">
      <v-container fill-height class="SsoView">
        <v-card
          max-width="400px"
          class="mx-auto my-auto elevation-0 pb-1 rounded-lg"
        >
          <v-card
            color="teal lighten-5"
            class="elevation-0 py-4 px-4 px-sm-6 px-md-8"
          >
            <v-card-title
              class="headline font-weight-bold pl-0"
              style="color: black"
            >
              <p class="mr-16">Invite friend to zebu</p>
            </v-card-title>
  
            <v-card-subtitle class="text-left pl-0">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
                odio nam adipisci saepe,
              </p>
            </v-card-subtitle>
  
            <v-btn
              dark
              color="blue"
              class="mb-2 rounded-xl elevation-0 text-capitalize"
              >see offer</v-btn
            >
          </v-card>
  
          <div class="px-2 px-sm-3 px-md-4">
            <v-row no-gutters class="my-2">
              <v-col cols="4"> Share </v-col>
              <v-col cols="8" class="text-right">
                refferal code <b>{{clientId}}</b>
                <v-btn x-small fab icon>
                  <v-icon>mdi-content-copy</v-icon>
                </v-btn>
              </v-col>
            </v-row>
  
            <v-card
              color="blue-grey lighten-5"
              outlined
              class="px-2 px-sm-3 px-md-4 rounded-lg"
            >
              <v-card-subtitle class="text-left pl-0">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
                  odio nam adipisci saepe,
                </p>
              </v-card-subtitle>
  
              <v-btn
                block
                color="blue white--text"
                @click="shareWithwhatsapp"
                href="whatsapp://send?text=https://zkyc.zebull.in/zebuetrade/signup/refercode/COynT1isacQ="
                class="mb-2 rounded-xl elevation-0 text-capitalize"
              >
                <!-- <a class="sharewhatsapp" href="whatsapp://send?text=Hi everyone i am Magesh">Share on whatsApp</a> -->Share
                on whatsApp
              </v-btn>
              <v-btn
                @click="shareViaWebShare"
                block
                dark
                text
                color="blue"
                class="mb-2 rounded-xl elevation-0 text-capitalize"
                >More ways to share
              </v-btn>
            </v-card>
  
            <v-card height="150" class="px-2 px-sm-3 px-md-4 elevation-0">
              <v-card-subtitle class="text-left pl-0">
                <p>phone contacts</p>
              </v-card-subtitle>
            </v-card>
          </div>
        </v-card>
      </v-container>
    </div>
  </template>
  
  <script>
    import axios from "axios";
  export default {
    name: "dashBoard",
  
    data: () => ({
        clientId:''
    }),
  
    methods: {
      copyLink() {
        document.getElementById("copyCBRef").style.display = "none";
        document.getElementById("copiedCBRef").style.display = "block";
        var copyText = document.getElementById("refLink");
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */
        document.execCommand("copy");
      },
      shareWithwhatsapp() {
        window.open(
          "https://wa.me/?text=Click%20this%20link%20to%20open%20a%20Trading%20account%20with%20Zebu%20and%20Gain%20an%20unified%20Trading%20and%20Investment%20Experience.%20" +
            "https://zkyc.zebull.in/zebuetrade/signup/refercode/COynT1isacQ=",
          "_blank"
        );
      },
      shareViaWebShare() {
        navigator.share({
          title: "Zebuetrade",
          text: "Invite your friends",
          url: "https://zkyc.zebull.in/zebuetrade/signup/refercode/COynT1isacQ=",
        });
      },
      shareButton() {
        navigator.share({
          text: "share",
          url: "https://zkyc.zebull.in/zebuetrade/signup/refercode/COynT1isacQ=",
        });
      },
    },
    mounted() {
        var authCode = localStorage.getItem("auth")
        if (authCode != null) {
      var axiosThis = this;
      axios
        .post('https://bebsk.zebull.in/ssoclient_check?code='+authCode)
        .then(function (response) {
          //console.log("mounted response :", response.data);
          if (response.data.client_code) {
            axiosThis.clientId = response.data.client_code;
            // localStorage.setItem("SessionId", response.data.clientsession);
            // axiosThis.fetchBasketDetails();
          }
        })
        .catch(function (error) {
          alert(
            `Error has occurred please reload the page with a new session ${error}`
          );
        });
    }
    },
    computed: {
      webShareApiSupported() {
        return navigator.share;
      },
    },
  };
  </script>
  <style>
  ::-webkit-scrollbar {
    width: 0;
  }
  .sharewhatsapp {
    text-decoration: none;
    color: wheat;
  }
  .signupbgclr {
    background-color: #eceef0 !important;
    height: 100vh !important;
    overflow-y: hidden !important;
  }
  
  .SsoView {
    height: 100vh !important;
    overflow-y: scroll !important;
  }
  
  @media only screen and (max-width: 600px) {
    .signupbgclr {
      background-color: white !important;
    }
  }
  </style>
  