<template>
    <!-- block 안의 inline만 text-align 적용 가능 -->
    <table v-for="project in projects" :key="project.name">
        <div class="proj_name">
            <span>{{ project.name }}</span>
        </div>
        <tr>
            <th>Data Group</th>
            <th>Description</th>
            <th>수정하기</th>
        </tr>
        <tr v-for="group in project.dataGroup" :key="group.name">
            <!--td><a target="_blank" :href="item.link">{{item.link}}</a></td>
            <td><img v-bind:src="item.image"></td-->
            <td><span>{{ group.name }}</span></td>
            <td><span>{{ group.description }}</span></td>
            <td><button class="edit_btn">Edit</button></td>
        </tr>
    </table>
</template>
<script>
import { ref } from "vue";

export default {
    name: 'ProjectList',
    setup() {
        const projects = ref([
            {
                "id": 1,
                "name": "Dev-Space",
                // "link": "https://movie.naver.com/movie/bi/mi/basic.nhn?code=161967",
                // "image": "https://ssl.pstatic.net/imgmovie/mdi/mit110/1619/161967_P153_134645.jpg",
                "dataGroup": [
                    {
                        "name": "User",
                        "description": "Dev-Space 사용자",
                    }, 
                    {
                        "name": "Project",
                        "description": "Dev-Space 수용 프로젝트",
                    }
                ]
            },
            {
                "id": 2,
                "name": "APPDU",
                "dataGroup": [
                    {
                        "name": "DevStatus",
                        "description": "앱두 과제 개발 현황",
                    },
                    {
                        "name": "RegionalFigure",
                        "description": "광역본부별 과제 현황",
                    },
                ]
            }
        ]);

        return { 
            projects
        }
    }
}
</script>

<style>
table {
    width: 100%;
    padding: 20px;
}
th {
    background-color: #F5EEFA;
}
td, th {
    padding: 10px;
    border: 0.5px solid #D4B2D9;
}
body {
    padding: 1rem;
}
.proj_name {
    font-size: 25px;
    text-align: left;
    margin-top: 20px;
}
.edit_btn {
    background-color: #E1E6F2;
    padding: 5px;
    border: 0.5px solid #E1ADF2;
    border-radius: 10px;
}
</style>