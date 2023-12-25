<template>
  <table id="myTable" class="table" v-bind="$attrs" :class="{ 'table-striped': striped }">
    <thead class="bg-red">
      <tr class="tr-custom">
        <th
          scope="col"
          v-for="(head, index) in heads"
          class="th-custom fw-bold col-auto"
          :class="
            { 'border-left': index == 0 },
            { 'border-right': index == heads.length - 1 },
            { 'text-left': !head.align },
            { ['text-' + head.align]: head.align }
          "
        >
          {{ head.title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) in items"
        class="tr-custom border-start border-end"
        :class="{ 'tb-hov': hovers }"
        @click="clickable && clickReturn && handleRowClick(_.get(item, clickReturn))"
      >
        <td v-for="head in heads" :class="{ ['text-' + head.align]: head.align }">
          <span>{{ _.get(item, head.key) }}</span>
          <slot
            :index="index"
            :data="item"
            :name="head.key"
            v-if="!_.get(item, head.key)"
          ></slot>
        </td>
      </tr>
    </tbody>
  </table>

  <div class="row my-2" v-if="total">
    <hr />
    <span class="col-5">รายการทั้งหมด {{ total || 0 }} รายการ</span>

    <!-- <div class="col" v-if="paginate">
      <nav>
        <ul class="pagination">
          <li class="page-item">
            <a
              v-if="page > 1"
              class="page-link border-0 rounded-circle"
              href="#"
              @click="setCurrentPage(--page)"
              aria-label="Previous"
            >
              <span aria-hidden="true">&lt</span>
            </a>
          </li>

          <li v-for="(pageNum, index) in pageMax" class="page-item">
            <router-link
              :id="'p' + index"
              aria-current="page"
              to="#"
              class="page-link rounded-circle mx-1"
              @click="setCurrentPage(pageNum)"
              :class="{ active: index == page - 1 }"
            >
              {{ pageNum }}
            </router-link>
          </li>

          <li class="page-item">
            <a
              v-if="page < pageMax"
              class="page-link border-0 rounded-circle"
              href="#"
              @click="setCurrentPage(++page)"
              aria-label="Next"
            >
              <span aria-hidden="true">></span>
            </a>
          </li>
        </ul>
      </nav>
    </div> -->
  </div>

  <div class="row" v-if="items.length < 1">
    <span class="text-center h5 mt-5">ไม่พบข้อมูล</span>
  </div>
</template>

<script setup>
import _ from "lodash";
import { onMounted, ref } from "vue";

const page = ref(1)

const emit = defineEmits(["clicked"]);

const props = defineProps({
  heads: [Array, Boolean],
  items: [Array, Boolean],
  hovers: [Boolean],
  striped: [Boolean],
  total: [Number, Boolean],
  clickable: [Boolean],
  clickReturn: [String, Boolean],
  paginate: [Boolean],
  itemsPerPage: [Number, String, Boolean],
  activePage: [Number, String, Boolean],
});

function handleRowClick(value) {
  emit("clicked", value);
}

onMounted(() => {

})
</script>

<style scoped>
.th-custom {
  color: white !important;
  background-color: transparent !important;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-collapse: collapse;
  overflow: hidden;
}

.tr-custom {
  line-height: 40px;
  min-height: 30px;
  height: 30px;
}

.border-left {
  border-radius: 8px 0 0 0px;
}

.border-right {
  border-radius: 0 8px 0 0;
}
</style>
