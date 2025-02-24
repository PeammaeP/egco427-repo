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

    <a v-bind:href="url"> Visit Vue Page</a>
    <span v-bind:title="url"> Test The Message </span>

    <h3> Click Me using @ </h3>
    <button @click="clickHandler('@@@' , $event)">
    Click Me @@@ 
    </button>

    <h3> Click Me using V-On </h3>
    <button v-on:click="clickHandler('hello' , $event)">
    Click Me V-On
    </button>

    <h3> Enter to Display EventClickHandling with TextField Alert</h3>
    <input type="text" v-on:keyup.enter="clickHandler($event.target.value)">

    <h3> Type Your Text : Using V-model as a Data Binding</h3>
    <input type="text" v-model="value">
    <p> {{ value }}</p>
    <div v-html="html"></div> 

    <p v-if="itemsInStock>=10">ItemInStock : {{ itemsInStock }}</p>
    <p v-else-if="itemsInStock<0">Hurry Up , Not Perfect , Current Item {{ itemsInStock }}</p>

    <p v-show="isShow">Show My Data</p>
    <p v-show="!isShow">Hidden My Data</p>

    <ul>
    <li v-for="title in titles" :key="title">{{  title }}</li>
    </ul>

    <h2>=============================================</h2>
    <h2>Here is the Practice-01</h2>
    <div>
    <p>Title: {{this.title}}</p>
    <p>Released: {{this.release}}</p>
    <p>The movie is: {{ movieYearCompare(this.release)}}</p>
    </div>

    <div v-bind:title="title">Hover your mouse here</div>

    <div id="data" class="demo">
        <input type="text" v-model="name">
        Output: {{ name }}
    </div>

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
            value : "hello world",
            url: "https://vuejs.org/",
            html: '<h2>Hello This is VUE</h2>',
            itemsInStock: 10,
            isShow : true,
            titles : ["VueJS","Angular","ReactJS"],
            title: "Star War",
            release: "2002",
            name : ' '
        }
    },
    // mounted
    mounted() {
        setInterval(() => { 
            this.counter++ // set counter of this as 1000
            this.isShow = false
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
        },
        clickHandler: function(message , event) { 
            alert(message)
            console.log(event)
        },
        movieYearCompare: function(movieYear , compareYear = 2000) { 
            if(movieYear >= compareYear) {
                return 'new'
            }
            else { 
                return 'old'
            }
        }
    }
}
</script>