<template>
    <div class="container">
        <div class="columns is-multiline add_poll">
            <div class="container p-t-20 p-b-20 text-center">
              <h2 class="f1-l-1 cl2">
                Add Poll
              </h2>
            </div>

            <div class="column is-12 text-center" >
                <div class="image">
                  <form @submit.prevent="submitImage">
                    <input hidden class="p-rl-15" type="file" accept="image/jpeg" id="image_file" ref="file" @change="uploadImage">
                    <label style="margin: 20px auto; cursor: pointer; width:300px; text-align: center; padding: 8px 0;" for="image_file" class="size-a-20 bg2 borad-3 f1-s-12 cl0 hov-btn1 trans-03 p-rl-15">
                      Upload Main Image  <i class="fa fa-cloud-upload-alt"></i>
                    </label>
                    <img v-bind:src="previewImage" class="uploading-image" style="width:100%; margin-bottom: 20px;"/>
                  </form>
                </div>

                <form @submit.prevent="submitForm" class="pollform">
                  <div class="row justify-content-center">
                    <div class="col-md-12 col-lg-12 p-b-20">
                      <div class="row">
                        <div class="col-md-6 ">
                          <select class="bo-1-rad-3 bocl13 size-a-19 f1-s-13 cl5 plh6 p-rl-18 m-b-20" v-model="selectedGroup" @change="getCategory()">
                            <option disabled value="">Please select group</option>
                            <option
                                  v-for="group in groups"
                                  v-bind:key="group.id"
                                  v-bind:value="group.id"
                            >{{ group.title }}</option>
                          </select>
                        </div>
                        <div class="col-md-6 ">
                          <select style="display: none;" class="categories bo-1-rad-3 bocl13 size-a-19 f1-s-13 cl5 plh6 p-rl-18 m-b-20" v-model="selectedCategory">
                            <option disabled value="">Please select category</option>
                            <option
                                  v-for="category in categories"
                                  v-bind:key="category.id"
                                  v-bind:value="category.id"
                            >{{ category.title }}</option>
                          </select>
                        </div>
                      </div>

                      <input type="text" class="bo-1-rad-3 bocl13 size-a-19 f1-s-13 cl5 plh6 p-rl-18 m-b-20" v-model="title" placeholder="Title">

                      <ckeditor :editor="editor" v-model="description" :config="editorConfig"></ckeditor>

                    </div>
                  </div>
                </form>

                <button class="size-a-20 bg2 borad-3 f1-s-12 cl0 hov-btn1 trans-03 p-rl-15 m-b-20" @click="submit()">
                  Add Poll
                </button>

            </div>
        </div>
        <div class="columns is-multiline add_choices" style="display: none;">
            <div class="container p-t-20 p-b-20 text-center">
              <h2 class="f1-l-1 cl2">
                Add Choices
              </h2>
            </div>

            <div class="column is-12 text-center">
              <div class="row choice" v-for="(choice,k) in choices" :key="k">
                <div class="col-md-8 p-r-0">
                  <input type="text" name="choice_text" class="bo-1-rad-3 bocl13 size-a-19 f1-s-13 cl5 plh6 p-rl-18 m-b-20" v-model="choice.choice_text" placeholder="Title*">
                </div>
                <div class="col-md-2 p-l-0 p-r-0">
                  <input type="color" name="color" class="bo-1-rad-3 bocl13 size-a-19 f1-s-13 cl5 plh6 p-rl-0 m-b-20" v-model="choice.color">
                </div>
                <div class="col-md-1 p-l-1 p-r-1">
                  <button class="size-a-19 bg2 borad-3 f1-s-12 cl0 hov-btn1 trans-03 p-rl-18 m-b-20" @click="add_choice(k)" v-show="k || ( !k && choices.length > 0)">
                    Add
                  </button>
                </div>
                <div class="col-md-1 p-l-1">
                  <button class="size-a-19 bg2 borad-3 f1-s-12 cl0 hov-btn1 trans-03 p-rl-18 m-b-20" @click="remove_choice(k)" v-show="k == choices.length-1">
                    Delete
                  </button>
                </div>
              </div>
              <button class="size-a-20 bg2 borad-3 f1-s-12 cl0 hov-btn1 trans-03 p-rl-15 m-b-20" @click="save_choices()">
                Save Choices
              </button>
            </div>
        </div>
    </div>
</template>

<style>
  .ck-editor__editable_inline {
      min-height: 200px;
  }
</style>

<script>
    import axios from 'axios'
    import { toast } from 'bulma-toast'
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

    export default {
        name: 'AddPoll',
        data() {
            return {
                title: '',
                description: '',
                groups: [],
                selectedGroup: '',
                categories: [],
                selectedCategory: '',
                editor: ClassicEditor,
                editorData: '<p>Content of the editor.</p>',
                editorConfig: {
                    language: 'en'
                },
                previewImage:null,
                image_file:null,
                poll: {},
                color: "#17b978",
                choice_text: '',
                choices: []
            }
        },
        mounted() {
            this.getGroup()
        },
        methods: {
            uploadImage(e){
                const image = e.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(image);
                reader.onload = e =>{
                    this.previewImage = e.target.result;
                    console.log(this.previewImage);
                };
            },
            add_choice(index) {
              this.choices.push({'choice_text': '', 'color': "#17b978", "uid": this.poll});
            },
            remove_choice(index) {
              this.choices.splice(index, 1);
            },
            async save_choices() {
                this.$store.commit('setIsLoading', true)
                for(let i=0;i<this.choices.length;i++){
                  await axios
                    .post(`/api/v1/choices/`, this.choices[i])
                    .then(response => {
                        console.log(1111)
                    })
                    .catch(error => {
                        console.log(error)
                    })
                }
                this.$router.push('/polls/' + this.poll)
                this.$store.commit('setIsLoading', false)
            },
            async getGroup() {
                this.$store.commit('setIsLoading', true)
                await axios
                    .get(`/api/v1/groups/`)
                    .then(response => {
                        this.groups = response.data
                    })
                    .catch(error => {
                        console.log(error)
                    })
                this.$store.commit('setIsLoading', false)
            },
            async getCategory() {
                this.$store.commit('setIsLoading', true)
                const group_id = this.selectedGroup
                await axios
                    .get(`/api/v1/groups/${group_id}/categories/`)
                    .then(response => {
                        this.categories = response.data
                        $('.categories').fadeIn();
                    })
                    .catch(error => {
                        console.log(error)
                    })
                this.$store.commit('setIsLoading', false)
            },
            async submitImage() {
                let image = {
                    title: this.title,
                    path: this.previewImage,
                    main: true,
                    poll: this.poll,
                }
                await axios
                    .post('/api/v1/images/', image)
                    .then(response => {
                        toast({
                            message: 'The lead was added',
                            type: 'is-success',
                            dismissible: true,
                            pauseOnHover: true,
                            duration: 2000,
                            position: 'bottom-right',
                        })
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            async submitForm() {
                const poll = {
                    title: this.title,
                    description: this.description,
                    category: this.selectedCategory,
                }
                await axios
                    .post('/api/v1/polls/', poll)
                    .then(response => {
                        toast({
                            message: 'The lead was added',
                            type: 'is-success',
                            dismissible: true,
                            pauseOnHover: true,
                            duration: 2000,
                            position: 'bottom-right',
                        })
                        this.poll = response.data.uid;
                        this.choices.push({'choice_text': '', 'color': "#17b978", "uid": this.poll});
                        this.submitImage();
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            submit() {
                this.$store.commit('setIsLoading', true)
                this.submitForm();
                $('.add_poll').fadeOut();
                $('.add_choices').fadeIn();
                // this.$router.push('/polls/' + response.data.poll)
                this.$store.commit('setIsLoading', false)
            },
        }
    }
</script>