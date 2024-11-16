<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useDisciplineStore } from "@/stores/discipline";
import { useCourseStore } from "@/stores/course";
import BaseButton from "@/components/buttons/BaseButton.vue";
import BaseSelect from "@/components/select/BaseSelect.vue";
import BaseNoDataAlert from "@/components/BaseNoDataAlert.vue";
import BaseLoading from "@/components/BaseLoading.vue";
import BaseTable from "@/components/table/BaseTable.vue";
import BaseDropdown from "@/components/dropdown/BaseDropdown.vue";

import formatDate from "@/utils/date";
import { useRouter } from "vue-router";
import { useTaskStore } from "@/stores/task";

const taskStore = useTaskStore();
const { getTasksAndGrades } = taskStore;

const courseStore = useCourseStore();
const { getMyCourses } = courseStore;

const disciplineStore = useDisciplineStore();
const { getDisciplinesStudent } = disciplineStore;

const selectValueCourse = ref({
  label: "",
  value: null,
});

const optionsCourses = ref([]);

const filteredOptionsCourses = computed(() => {
  if (!selectValueCourse.value.label) return optionsCourses.value;
  return optionsCourses.value.filter((item) =>
    item.label
      .toLowerCase()
      .includes(selectValueCourse.value.label.toLowerCase())
  );
});

const optionsDisciplines = ref([]);

const filteredOptionsDisciplines = computed(() => {
  if (!selectValueDiscipline.value.label) return optionsDisciplines.value;
  return optionsDisciplines.value.filter((item) =>
    item.label
      .toLowerCase()
      .includes(selectValueDiscipline.value.label.toLowerCase())
  );
});

const selectValueDiscipline = ref({
  label: "",
  value: null,
});

const router = useRouter();

const fields = [
  { key: "tarefa_id", label: "id" },
  { key: "tarefa_nome", label: "Nome da Tarefa" },
  { key: "nota", label: "Nota" },
];

const tableData = ref([]);
const filteredData = computed(() => {
  if (!search.value) return tableData.value;
  return tableData.value.filter((item) =>
    item.nome.toLowerCase().includes(search.value.toLowerCase())
  );
});

const aluno = ref(null);

const loading = ref(false);
loading.value = true;
loading.value = false;

const search = ref(null);

const handleSearch = async () => {
  loading.value = true;
  tableData.value = await getTasksAndGrades(selectValueDiscipline.value.value);
  loading.value = false;
};

const initFunction = async () => {
  const courses = await getMyCourses();
  courses.forEach((course) => {
    optionsCourses.value.push({
      label: course.nome,
      value: course.id,
    });
  });
};

watch(
  () => selectValueCourse.value.label,
  async (newVal) => {
    if (newVal == "") {
      console.log("zerei");

      selectValueCourse.value = {
        label: "",
        value: null,
      };

      selectValueDiscipline.value = {
        label: "",
        value: null,
      };

      optionsDisciplines.value = [];
    } else {
      const disciplines = await getDisciplinesStudent(
        selectValueCourse.value.value
      );
      disciplines.forEach((discipline) => {
        optionsDisciplines.value.push({
          label: discipline.nome,
          value: discipline.id,
        });
      });
    }
  }
);

onMounted(async () => {
  await initFunction();
});
</script>

<template>
  <div class="page-background">
    <div class="top">
      <BaseSelect
        class="select"
        placeholder="Selecione um curso..."
        :options="filteredOptionsCourses"
        v-model="selectValueCourse.label"
        @select="selectValueCourse = $event"
      />
      <BaseSelect
        class="select"
        :disabled="!selectValueCourse.value"
        placeholder="Selecione uma disciplina... "
        :options="filteredOptionsDisciplines"
        v-model="selectValueDiscipline.label"
        @select="selectValueDiscipline = $event"
      />
      <BaseButton
        label="Buscar"
        @click="handleSearch"
        :disabled="!selectValueDiscipline.value"
      />
    </div>
    <div class="tasks" v-if="!loading">
      <div v-if="tableData.tarefas" class="flex flex-column gap-1">
        <span style="font-size: 20px"
          ><span style="font-weight: 600">Média Final: </span
          >{{ tableData.media_final }}</span
        >

        <BaseTable :fields="fields" :has-options="false">
          <template v-slot:body>
            <tr v-for="(row, index) in filteredData.tarefas" :key="index">
              <td v-for="field in fields" :key="field.key">
                {{
                  field.key == "created_at"
                    ? formatDate(row[field.key])
                    : row[field.key]
                }}
              </td>
            </tr>
          </template>
        </BaseTable>
      </div>
      <div v-else>
        <pre>{{ filteredData.tarefas }}</pre>
        <BaseNoDataAlert
          text="Não foi encontrado nenhuma nota para sua busca"
          title="Nenhuma Nota Encontrada!"
        />
      </div>
    </div>
    <div v-else class="loading">
      <BaseLoading class="loading-icon" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.loading {
  height: 400px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 630px) {
    .loading-icon > svg {
      width: 100px;
      height: 100px;
    }
  }
}

.top {
  display: flex;
  width: 100%;
  gap: 10px;
}

.tasks {
  width: 100%;
  gap: 40px;
  margin-top: 50px;
  justify-content: space-around;
  flex: 1;
  @media (max-width: 630px) {
    margin-top: 20px;
  }
}

.page-background {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  height: 100%;
  @media (max-width: 630px) {
    padding: 1rem;
  }
}
</style>
