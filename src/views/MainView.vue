<template>
    <v-container>
        <v-row style="height: 200px">
        </v-row>
        <v-row>
            <v-col key="1" cols="12" md="4">
                <div class="card_title">Fast Data Generation</div>
                <v-card class="mx-5" style="height: 300px">
                    <v-container class="card_hc card_vc">
                        <v-img :src="require('@/assets/fast.png')" max-width="200" max-height="150"></v-img>
                            Dev-Faker에서 제공하는 UI를 사용하여 빠르게 가짜 데이터를 생성하여 사용 가능
                        </v-container>
                </v-card>
            </v-col>

            <v-col key="2" cols="12" md="4">
                <div class="card_title">Template Feature</div>
                <v-card class="mx-5" style="height: 300px">
                    <v-container class="card_hc card_vc">
                        <v-img :src="require('@/assets/template.png')" max-width="200" max-height="150"></v-img>
                            저장된 Template 기능을 사용하여 빠르고 다양한 Dummy Data 생성 가능
                        </v-container>
                </v-card>
            </v-col>

            <v-col key="3" cols="12" md="4">
                <div class="card_title">Sub Data Structure Support</div>
                <v-card class="mx-5" style="height: 300px">
                    <v-container class="card_hc card_vc">
                        <v-img :src="require('@/assets/tree.png')" max-width="200" max-height="400"></v-img>
                        <span class="text">하위 데이터를 추가하여 사용할 수 있어서 복잡한 데이터도 생성 가능</span>
                    </v-container>
                </v-card>
            </v-col>

        </v-row>
        <v-row>
        </v-row>
    </v-container>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainView',

  components: {

  },
});
</script>


<style scoped>
.card_title {
    font-size: 25px;
    margin-bottom: 30px;
}

.card_vc{
    height:40px;
    top: 0;
    bottom:0;
    margin-top:auto;
    margin-bottom:auto;
}
.card_hc{
    width:200px;
    left:0;
    right:0;
    margin-left:auto;
    margin-right:auto;
}

.cards {
    background-color: lightgray;
    padding: 10px;
}

.text {
    margin-top: 200px;
}
</style>