<template>
  <MainLayout></MainLayout>
  <section>
    <div class="search container">
      <h1>Поиск видео</h1>
      <SearchForm></SearchForm>
    </div>
  </section>
</template>

<script>
import SearchForm from '@/components/SearchForm';
import MainLayout from '@/layouts/MainLayout';

export default {
  name: 'SearchView',
  components: {
    SearchForm,
    MainLayout,
  },
};
</script>
