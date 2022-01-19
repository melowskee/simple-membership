require('./bootstrap');

require('alpinejs');

import { createApp } from "vue";
import router from './router'
import CompaniesIndex from './components/companies/index'
import BranchesIndex from './components/branches/index'
import MembersIndex from './components/members/index'

createApp({
    components: {
    	CompaniesIndex,
        BranchesIndex,
        MembersIndex

    }
}).use(router).mount('#app')