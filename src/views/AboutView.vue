<template>
  <MainLayout>
      <div class="about">
          <div class="container">
              <answer :author="getRomens()" :text="$t('Привет, я Romens!')"></answer>
              <div class="card mb-2">
                <div class="card-header">
                  Моя цель!
                </div>
                <div class="card-body">
                  Я создаю лучшую платформу для ваших шуток!
                </div>
              </div>
              <div class="help">
                <div class="card mb-2">
                  <div class="card-header">
                    <h4>Вы можете помочь проекту следующими способами:</h4>
                  </div>
                  <div class="list-group list-group-flush">
                    <a class="list-group-item list-group-item-action" href="https://gitlab.com/Romens/Romens.org">Если вы разработчик - то можете <b>помочь с кодом</b> для понимания шуток</a>
                    <a class="list-group-item list-group-item-action" href="https://boosty.to/romens">Если вы не бедный человек - можете поддержать нас на <b>Boosty</b></a>
                    <div class="list-group-item">Если вы бедный человек - можете просто писать шутки!</div>
                  </div>
                </div>
              </div>
            <div class="contacts">
              <div class="card mb-2">
                <div class="card-header">
                  <h4>Мои контакты</h4>
                </div>
                <div class="list-group list-group-flush">
                  <a class="list-group-item list-group-item-action" href="https://t.me/romens_org">Telegram: <b>@romens_org</b></a>
                  <a class="list-group-item list-group-item-action" href="mailto:romens@romens.org">Email: <b>romens@romens.org</b></a>
                </div>
              </div>
            </div>
          </div>
      </div>
  </MainLayout>
</template>

<style></style>
<script setup lang="ts">
import MainLayout from "@/layouts/MainLayout.vue";
import Answer from "@/components/chat/Answer.vue";
import {useUserStore} from "@/stores/user";

const { getRomens } = useUserStore();

</script>
