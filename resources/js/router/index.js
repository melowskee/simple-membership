import { createRouter, createWebHistory } from "vue-router";

import CompaniesIndex from '../components/companies/index'
import CompaniesCreate from '../components/companies/create'
import CompaniesEdit from '../components/companies/edit'
import BranchesIndex from '../components/branches/index'
import BranchesCreate from '../components/branches/create'
import BranchesEdit from '../components/branches/edit'
import MembersIndex from '../components/members/index'
import MembersCreate from '../components/members/create'
import MembersEdit from '../components/members/edit'
const routes = [
    {
        path: '/companies',
        name: 'companies.index',
        component: CompaniesIndex
    },
    {
        path: '/companies/create',
        name: 'companies.create',
        component: CompaniesCreate
    },
    {
        path: '/companies/:id/edit',
        name: 'companies.edit',
        component: CompaniesEdit,
        props: true
    },
    {
        path: '/branches',
        name: 'branches.index',
        component: BranchesIndex
    },
    {
        path: '/branches/create',
        name: 'branches.create',
        component: BranchesCreate
    },
    {
        path: '/branches/:id/edit',
        name: 'branches.edit',
        component: BranchesEdit,
        props: true
    },
    {
        path: '/members',
        name: 'members.index',
        component: MembersIndex
    },
    {
        path: '/members/create',
        name: 'members.create',
        component: MembersCreate
    },
    {
        path: '/members/:id/edit',
        name: 'members.edit',
        component: MembersEdit,
        props: true
    }
]

export default createRouter({
    history: createWebHistory(),
    routes
})
