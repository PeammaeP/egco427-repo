<template>
 <h1> {{ name.split("") }}</h1>
 <p>
    Counter : {{ counter }}
 </p>
 <p>
    Full Name : {{ getFullName(firstName , lastName) }}
 </p>
 <p>
    Upper First : {{  upperFirst(value) }}
 </p>
</template>

<script>
export default { 
    name : 'Home', 
    props: { 

    }, 
    // data display 
    data() { 
        return { 
            name : 'TomCat',
            counter: 0 , // add counter  
            firstName : "Tom",
            lastName : "Cat",
            value : "hello world"
        }
    },
    // mounted
    mounted() {
        setInterval(() => { 
            this.counter++ // set counter of this as 1000
        },  1000)
    },
    methods: { 
        getFullName: function(first , last) { 
            return first + " " + last
        },
        upperFirst: function(value) {  
            // "HELLO WORLD" => "Hello World"
            // "hello world" => "Hello World"       
            return value.split(" ").map(string => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()).join(" ")
        }
    }
}
</script>