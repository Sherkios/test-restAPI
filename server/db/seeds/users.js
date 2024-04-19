
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    { id: 1, name: 'Hettie Marshall', email: 'lantunde@acbo.va', password: "123" },
    { id: 2, name: 'Hester Owens', email: 'zo@girih.lv', password: "fdyh24" },
    { id: 3, name: 'Henry Jackson', email: 'bekamohi@owo.mt', password: "b/324fd1" }
  ]);
};
