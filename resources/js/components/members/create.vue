<template>
   <div v-if="errors">
  <div v-for="(v, k) in errors" :key="k" class="bg-red-500 text-white rounded font-bold mb-4 shadow-lg py-2 px-4 pr-0">
    <p v-for="error in v" :key="error" class="text-sm">
      {{ error }}
    </p>
  </div>
</div>

    <form class="space-y-6" @submit="formSubmit" enctype="multipart/form-data">
        <div class="space-y-4 rounded-md shadow-sm">
            <div>
                <label for="first_name" class="block text-sm font-medium text-gray-700">First Name</label>
                <div class="mt-1">
                    <input type="text" name="first_name" id="first_name"
                           class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                           v-model="form.first_name">
                </div>
            </div>

            <div>
                <label for="last_name" class="block text-sm font-medium text-gray-700">Last Name</label>
                <div class="mt-1">
                    <input type="text" name="last_name" id="last_name"
                           class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                           v-model="form.last_name">
                </div>
            </div>

            <div>
                <label for="branch_id" class="block text-sm font-medium text-gray-700">Branch</label>
                <div class="mt-1">
                    <select name="branch_id" id="branch_id" v-model="form.branch_id">
                        <option v-for="branch in branches" v-bind:value="branch.id">
                          {{ branch.name }} 
                        </option>
                    </select>
                </div>
            </div>
            <div>
                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                <div class="mt-1">
                    <input type="text" name="email" id="email"
                           class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                           v-model="form.email">
                </div>
            </div>
            
            <div>
                <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
                <div class="mt-1">
                    <input type="text" name="phone" id="phone"
                           class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                           v-model="form.phone">
                </div>
            </div>

            <div>
                <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
                <div class="mt-1">
                   <input type="file" accept="image/*" @change="previewImage" class="form-control-file" id="my-file">
                    <div class="border p-2 mt-3">
                    <p>Preview Here:</p>
                    <template v-if="preview">
                      <img :src="preview" class="img-fluid" style="max-width: 200px;"/>
                      <p class="mb-0">file name: {{ image.name }}</p>
                      <p class="mb-0">size: {{ image.size/1024 }}KB</p>
                    </template>
                  </div>
                </div>
            </div>

        </div>

        <button type="submit"
                class="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase bg-gray-800 rounded-md border border-transparent ring-gray-300 transition duration-150 ease-in-out hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring disabled:opacity-25">
            Create
        </button>
    </form>
</template>

<script>
import { reactive } from "vue";
import useMembers from "../../composables/members";
import useBranches from "../../composables/branches";
import { onMounted } from "vue";

export default {
    data(){
        const { branches, getBranches } = useBranches()
        onMounted(getBranches)
        return {
            form: {
                first_nane: '',
                last_name: '',
                branch_id: '',
                email: '',
                phone: '',
                file: ''
            },
            branches,
            preview: null,
            image: null
        } 
    },
    methods: {
        previewImage: function(event) {
            var input = event.target;
            if (input.files) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.preview = e.target.result;
                }
                this.image=input.files[0];
                reader.readAsDataURL(input.files[0]);
                this.form.file = event.target.files[0];
            }
        },
        formSubmit(e) {
            e.preventDefault();
            let existingObj = this;
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            let data = new FormData();
            data.append('file', this.form.file);
            data.append('branch_id', this.form.branch_id);
            data.append('first_name', this.form.first_name);
            data.append('last_name', this.form.last_name);
            data.append('email', this.form.email);
            data.append('phone', this.form.phone);
            axios.post('/api/members', data, config)
        }
    }
}
</script>
