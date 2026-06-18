<template>
  <div class="overflow-x-auto rounded-lg border border-gray-100">
    <table class="w-full text-sm">
      <thead>
        <tr class="bg-gray-50 text-beike-heading text-left border-b border-gray-200">
          <th
            v-for="col in columns"
            :key="col.key"
            class="px-3 py-3 font-semibold whitespace-nowrap first:rounded-tl-lg last:rounded-tr-lg text-xs tracking-wide uppercase"
            :class="[col.class, col.width ? '' : '']"
            :style="col.width ? { width: col.width } : {}"
          >
            <button
              v-if="col.sortable"
              class="inline-flex items-center gap-1 hover:text-beike-primary transition-colors"
              @click="$emit('sort', col.key)"
            >
              {{ col.label }}
              <ArrowUpDown v-if="sortBy !== col.key" class="w-3 h-3 text-beike-light" />
              <ArrowUp v-else-if="sortOrder === 'asc'" class="w-3 h-3 text-beike-primary" />
              <ArrowDown v-else class="w-3 h-3 text-beike-primary" />
            </button>
            <span v-else class="select-none">{{ col.label }}</span>
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-50">
        <tr
          v-for="(row, idx) in rows"
          :key="row.id || idx"
          class="hover:bg-orange-50/40 transition-colors"
        >
          <td
            v-for="col in columns"
            :key="col.key"
            class="px-3 py-3 whitespace-nowrap text-xs"
            :class="col.class"
          >
            <slot :name="col.key" :row="row" :value="getNestedValue(row, col.key)">
              {{ getNestedValue(row, col.key) }}
            </slot>
          </td>
        </tr>
        <tr v-if="!rows.length">
          <td :colspan="columns.length" class="px-4 py-16 text-center text-beike-light text-sm">
            {{ emptyText }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-vue-next'

defineProps({
  columns: { type: Array, required: true },
  rows: { type: Array, default: () => [] },
  sortBy: { type: String, default: '' },
  sortOrder: { type: String, default: 'desc' },
  emptyText: { type: String, default: 'No data' },
})

defineEmits(['sort'])

function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, key) => acc?.[key], obj)
}
</script>
