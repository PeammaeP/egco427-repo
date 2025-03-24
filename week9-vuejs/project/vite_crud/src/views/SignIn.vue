<template>
    <div class="container">
        <h1>Sign In</h1>
        <br><br>
        <div class="row">
            <div class="col-lg-3"/>
            <div class="col-lg-6">
                <input type="email" v-model="formData.email" class="form-control" placeholder="email"/> 
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="password" v-model="formData.password" class="form-control" placeholder="password"/>
                <br> 
                <button class="btn btn-success btn-block full-width" @click="signIn">Sign In</button>
            </div>
            <div class="col-lg-3"/>
        </div>
    </div>
</template>

<script>
import { getAuth , signInWithEmailAndPassword } from 'firebase/auth'

export default { 
    name: 'SignIn',
    data() { 
        return { 
            formData: { 
                email: '',
                password: ''
            },
            errorMessages : '', 
            successMessage: '',
            xhrRequest : false
        }
    },
    methods: { 
        signIn() { 
            const auth = getAuth()

            signInWithEmailAndPassword(auth , this.formData.email , this.formData.password)
            .then((user) => { 
                this.successMessage = 'User signed in successfully'
                this.errorMessages = ''
                this.formData.email = ''
                this.formData.password = ''
                this.$router.push('/users') // redirect to users page 
            })
            .catch((error) => { 
                alert(error.message)
            })
        }
    }
}
</script>