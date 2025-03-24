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

    <ul>
        <h3>
            The Loop of each Element Name
        </h3>
        <li v-for="(value , propertyName) in person">
            {{ propertyName }} : {{ value }}
        </li>
    </ul>

    <ul>
        <li v-for="(n , index) in 10">
            {{ index }} * {{ n }} = {{  index * n }}
        </li>
    </ul>

    <ul>
        <li v-for="(person  , key) in employee">
            index  {{ key }} -> {{  person.name }} , {{  person.title }}
        </li>
    </ul>

    <ul>
        <li v-for="(data , key) in categories">
            <h3>            
                {{ data.name }}
            </h3>
            <li v-for="(dataArray , keyArray) in data.sub" style="list-style-type: '-';">
                {{ dataArray }}
            </li>
        </li>
    </ul>

    <ul>
        <li v-for="n in numbers">{{ n }}</li>
    </ul>
    <button v-on:click="changeNumber()">Change Number</button>

    <p>{{counter}}</p>
    <p>{{fullName}}</p>
    <p>{{fullName}}</p>
    
    <button v-on:click="counter++">Increase Counter</button>
    <button v-on:click="changeName">Change Name</button>
    <button v-on:click="changeNameSetter">Change Name (Setter)</button>

    <span>Student Name: </span>
    <input v-model="newData.studentName">
        <br><br>
    <span>Score: </span>
    <input v-model="newData.score">
    <   br><br>
    <button   button @click="addScore">Add Score</button>
        <br><br>
    <span>Average Score {{averageScore}}</span>
    <ul>
        <li v-for="data in datas"> 
            {{data.studentName}}, Score:  {{data.score}}
        </li>
        </ul>
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
            name : ' ',
            person : { 
                firstName : "Tom",
                lastName : "Cat"
            },
            employee : [
                {
                    name : 'Abby',
                    title : 'Accountant'
                },
                {
                    name : 'Andy',
                    title : 'Marketing Manager'
                },
                {
                    name : 'Brandon',
                    title : 'Vue.js Expert'
                },
            ],
            categories: [
                { name: 'Javascript', sub: ['Vue.js', 'React', 'Angular2']},
                { name: 'Database', sub: ['MySQL', 'PostgreSQL', 'MariaDB']},
                { name: 'Javascript', sub: ['Operating System', 'Linux', 'Windows']}
            ],
            numbers : [1,2,3,4,5],
            myElement: {
                counter: 1,
                firstName: 'Bob',
                lastName: 'Cat'
            },
            newData: {
                studentName: '',
                score: 0
            },
            datas: [
                {
                    studentName: "Student 1",
                    score: 50
                },
                {
                    studentName: "Student 2",
                    score: 5
                }
            ]
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
        },
        changeNumber: function() { 
            this.numbers[1] = 10
            alert(this.numbers[1])
        },
        changeName: function(){
            this.firstName = 'Tim';
            this.lastName = 'Fox'
        },
        changeNameSetter: function(){
            this.fullName = 'Dean Bear'
        },
        addScore: function() {
            this.datas.push({
                studentName: this.newData.studentName,
                score: this.newData.score
            });
            this.newData.studentName = '';
            this.newData.score = 0;
        }
    },
    computed: {
        fullName: {
            get: function() {
                alert("Assembling full name...");
                return this.firstName + ' ' + this.lastName;
            },
            set: function(newValue) {
                alert("Setting new name: " + newValue);
                var parts = newValue.split(' ');
                this.firstName = parts[0];
                this.lastName = parts[parts.length - 1];
            }
        },
        averageScore: function() {
            var sum = this.datas.reduce(function(accumulate, data) {
                return accumulate + Number(data.score);
            }, 0);
            return (sum / this.datas.length).toFixed(2);
        }
    }
}
</script>