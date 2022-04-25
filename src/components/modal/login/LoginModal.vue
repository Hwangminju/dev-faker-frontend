<!--template> 
    <v-app id="app"> 
        <v-main> 
            <v-container class="text-xs-center"> 
                <v-layout class="text-xs-center"> 
                    <v-flex>
                        <v-card flat class="mx-auto" max-width="800">
                            <v-row style="margin-top: 60px">
                                <v-col>
                                    <v-form style="width: 400px; height: 300px">
                                        <div class="mx-3">
                                            <v-icon color="black" size="30px">person</v-icon>
                                            ID
                                            <div class="mx-1">
                                                <v-text-field
                                                    placeholder="userId"
                                                    v-model="userId"
                                                    required
                                                ></v-text-field> 
                                            </div> 
                                        </div> 
                                        <div class="mx-3"> 
                                            <v-icon color="black" size="30px">lock</v-icon>
                                            Password
                                            <div class="mx-1">
                                                <v-text-field 
                                                    placeholder="userPassword"
                                                    type="password"
                                                    v-model="userPassword"
                                                    required
                                                ></v-text-field>
                                            </div>
                                        </div>
                                        <v-card-actions>
                                            <v-btn 
                                                color="#2c4f91"
                                                dark 
                                                large 
                                                block 
                                                @click="loginSubmit"
                                            >
                                            Login
                                            </v-btn>
                                        </v-card-actions>
                                    </v-form>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-card-actions>
                                    <v-btn
                                        color="#2c4f91"
                                        dark 
                                        large 
                                        block
                                    >
                                        <router-link :to="`/`">
                                        Home
                                        </router-link>
                                    </v-btn>
                                </v-card-actions>
                            </v-row>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-main>
    </v-app>
</template>

<script> 
export default {
    data() {
        return {
            userId: null,
            userPassword: null
        };
    }, 
    methods: {
        loginSubmit() {
            let saveData = {};
            let HOST = "http://localhost:5000";
            saveData.userId = this.userId;
            saveData.userPassword = this.userPassword;
            
            try {
                this.$axios
                    .post(HOST + "/signin", JSON.stringify(saveData), {
                        headers: {
                            "Content-Type": `application/json`
                        }
                    })
                    .then(res => {
                        if (res.status === 200) { 
                            // 로그인 성공시 처리해줘야할 부분 
                        }
                    }); 
            } catch (error) { 
                console.error(error);
            } 
        },
        goHome() {

        }
    }
}; 
</script-->
<!-- template for the modal component -->
<script type="text/x-template" id="modal-template">
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              default header
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              default body
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              default footer
              <button class="modal-default-button" @click="$emit('close')">
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</script>

<!-- app -->
<div id="app">
  <button id="show-modal" @click="showModal = true">Show Modal</button>
  <!-- use the modal component, pass in the prop -->
  <modal v-if="showModal" @close="showModal = false">
    <!--
      you can use custom content here to overwrite
      default content
    -->
    <h3 slot="header">custom header</h3>
  </modal>
</div>