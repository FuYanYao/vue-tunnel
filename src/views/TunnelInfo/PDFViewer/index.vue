<template>
    <img :src="pdfUrl">
</template>

<script setup>
import { useRoute } from "vue-router"
import { onMounted, ref } from "vue"
import api from '@/api/index.js'

const route = useRoute()

const pdfUrl = ref('')

onMounted(()=>{
    api.getPdfPreview({
        id: route.params.id
    }).then(({data:res})=> {
        if(res.status===200){
            pdfUrl.value="http://localhost:3000/" + res.result.url
            console.log(pdfUrl.value);
        }
    }).catch(error=> {
        console.log(error);
    })
})

// console.log(route.params.id);
</script>

<style scoped>

</style>