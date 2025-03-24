<template>
    <div>
        <p>
            Showing {{ filteredTitle.length }} results for {{ query }}
        </p>
        <ul>
            <li v-for="title in filteredTitle" :key="title" style="list-style-type: '';">
               {{ title.Name }}
            </li>
        </ul>
    </div>
</template>

<script>
import { computed , onMounted } from 'vue';
import titles from '../post-data.json'

export default { 
    props: {
        query : String
    },
    setup(props) { 
        const filteredTitle = computed(() => { 
            return titles.filter(title => title.Name.toLowerCase().includes(props.query.toLowerCase()))
        })
        return { 
            filteredTitle
        }
    }
}
</script>
<style scoped>
    .root {
        width: 400px;
        margin: 0 auto;
    }
    .root p {
        text-align: right;
        font-size: 0.7em;
        margin: 0;
    }
    ul {
        list-style:  none;
        width: 50px 0;
        padding: 0;
        background-color: #fafafa;
        border-radius: 5px;
        border: 1px solid #ddd;
    }
    li {
        text-align: left;
        padding: 20px;
        border-bottom: 1px solid #ddd;
    }
    li:nth-last-of-type(1) {
        border-bottom: none;
    }
</style>
