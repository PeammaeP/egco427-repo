<template>
    <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="input-group">
                <input type="text" class="form-control" placeholder="Search for..." v-model="search">
                <span class="input-group-btn">
                  &nbsp;&nbsp;<button class="btn btn-primary" type="button">
                    <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                    Search
                  </button>
                </span>
              </div><!-- /input-group -->
            </div><!-- /.col-lg-6 -->
          </div><!-- /.row -->
        </div>
        <br>
        <table class="table table-stripped table-borderes">
            <thead>
                <tr>
                <th class="center">Firstname</th>
                <th class="center">Lastname</th>
                <th class="center">Email</th>
                <th class="center">Action</th>
                </tr>
            </thead>
            <tbody>
              <tr v-for="user_alias in filterUsers" v-bind:key="user_alias.id">
                    <td class="text-left">{{ user_alias.firstName }}</td>
                    <td class="text-left">{{ user_alias.lastName }}</td>
                    <td class="text-left">{{ user_alias.email }}</td>
                    <td class="text-left">
                    <router-link :to="{ path: 'updateuser', name: 'UpdateUser', params:{userId: user_alias._id} }">
                          <button class="btn btn-xs btn-warning">Edit</button>&nbsp;
                    </router-link>
                    <router-link to="/">
                        <button class="btn btn-xs btn-danger" data-toggle="modal" data-target=".bd-example-modal-sm" @click="DELETE(user_alias._id)"><span class="glyphicon glyphicon-trash">Delete</span></button>
                    </router-link>
                    </td>
                </tr>
            </tbody>
        </table>
        <router-link to="/adduser">
            <button class="btn btn-large btn-block btn-success full-width">Add User</button>
        </router-link>
        <br>
</template>

<script>
import axios from 'axios'

export default { 
    name: 'Users', 
    data() { 
        return { 
            Users: [],
            search: '',
            uid: ''
        }
    },
    computed: { 
        filterUsers() { 
            return this.Users.filter((user) => {
                return user.firstName.toLowerCase().includes(this.search.toLowerCase())
            })
        }
    },
    methods: { 
        DELETE(userId) { 
            var url = `http://localhost:3000/users/${userId}`
            axios.delete(url).then(response => {
                console.log(response)
            }).catch(error => { 
                console.log(error)
            })
            window.location.reload()
        }
    },
    // from the backend service
    async mounted() { 
        try { 
            const response = await axios.get('http://localhost:3000/users')
            console.log(response.data)
            this.Users = response.data
        }
        catch(error) { 
            console.log(error)
        }
    }
}
</script>