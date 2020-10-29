<template>
  <v-container>
    <v-card>
      <v-container>
        <v-form ref="form" v-model="isValid" @submit.prevent="onSubmitForm">
          <v-textarea
            v-model="contents"
            class="mb-2"
            outlined
            auto-grow
            clearable
            label="내용을 적어주세요."
            :hide-details="hideDetails"
            :success="success"
            :success-messages="successMessages"
            :rules="[(v) => !!(v || '').trim() || '내용을 입력하세요.']"
            @input="onChangeTextarea"
          />

          <v-btn>이미지 추가</v-btn>
          <v-btn color="success" type="submit" absolute right>
            작성하기
          </v-btn>
        </v-form>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      hideDetails: true,
      success: false,
      successMessages: "",
      isValid: false,
      contents: "",
    };
  },
  computed: {
    ...mapState("users", ["user"]),
  },
  methods: {
    onChangeTextarea() {
      this.hideDetails = true;
      this.success = false;
      this.successMessages = "";
    },
    onSubmitForm() {
      if (!this.$refs.form.validate()) return;
      this.$store
        .dispatch("posts/ADD", {
          contents: this.contents,
          user: {
            nickname: this.user.nickname,
          },
          id: Date.now().toString() + Math.floor(Math.random() * 300),
          createdAt: Date.now(),
        })
        .then(() => {
          console.log("success");
          this.success = true;
          this.hideDetails = false;
          this.successMessages = "등록 성공!";
          this.contents = " ";
        });
    },
  },
};
</script>

<style scoped></style>
