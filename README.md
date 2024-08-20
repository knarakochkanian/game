

To build the application in the apk file you need to install Android Studio

- next build
- npx cap sync
- npx cap open android

npm run dev




<strong>Вся дата находится в папке data</strong>
1. Добавить или удалить, Регион можно в файле attackRegionsData.tsx
2. Добавить или удалить, Отрасль можно в файле industryData.ts
3. currentAction это текущая атака или защита на странице обратного отчета она добавляется в local Storage и если это не отложенный запуск она completedActions если отложенный добавляктся в actionsInQueue
4. currentAction хранится в редаксе до обратного отчета дальше идет в local Storage
5. Новости в proccessNewsData.ts
6. Текст в саммари формируется из /data/consequencesParagraph.tsx

