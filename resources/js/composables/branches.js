import { ref } from 'vue'
import axios from "axios";
import { useRouter } from 'vue-router';

export default function useBranches() {
    const branches = ref([])
    const branch = ref([])
    const router = useRouter()
    const errors = ref('')

    const getBranches = async () => {
        let response = await axios.get('/api/branches')
        branches.value = response.data.data;
    }

    const getBranch = async (id) => {
        let response = await axios.get('/api/branches/' + id)
        branch.value = response.data.data;
    }

    const storeBranch = async (data) => {
        errors.value = ''
        try {
            await axios.post('/api/branches', data)
            await router.push({name: 'branches.index'})
        } catch (e) {
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }

    const updateBranch = async (id) => {
        errors.value = ''
        try {
            await axios.put('/api/branches/' + id, branch.value)
            await router.push({name: 'branches.index'})
        } catch (e) {
            if (e.response.status === 422) {
               errors.value = e.response.data.errors
            }
        }
    }

    const destroyBranch = async (id) => {
        await axios.delete('/api/branches/' + id)
    }


    return {
        branches,
        branch,
        errors,
        getBranches,
        getBranch,
        storeBranch,
        updateBranch,
        destroyBranch
    }
}
