<template>
    <div>

    </div>
</template>

<script setup>
import apiService from "../../services/api";
import DataTable from "../Component/DataTable.vue";
import BaseModal from "../Component/BaseModal.vue";
import BaseInput from "../Component/BaseInput.vue";
import BaseButton from "../Component/BaseButton.vue";
import SearchBox from "../Component/SearchBox.vue";
import { ref, onMounted, reactive } from "vue";
import EditIcon from "../icons/EditIcon.vue";
import BaseSelect from "../Component/BaseSelect.vue";

const props = defineProps({
    proj_name: String,
    proj_id: Number,
})
</script>

<style scoped>

</style>