const db = require("../data/db-config");

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
  update,
  remove
};

function find() {
  return db("schemes");
}

function findById(id) {
  return db("schemes")
    .where({ id })
    .first();
}

function findStepById(id){
  //Helper function to find a specific step
  return db("steps")
    .where({ id })
    .first();
}

function findSteps(id) {
  /*
select sc.scheme_name as scheme
    , s.step_number as step
    , s.instructions
from schemes as sc
join steps as s
    on s.scheme_id = sc.id
order by s.scheme_id asc, s.step_number asc;
 */
  return db("schemes as sc")
    .select(
      "sc.id",
      "sc.scheme_name as scheme",
      "s.step_number as step",
      "s.instructions"
    )
    .join("steps as s", "s.scheme_id", "sc.id")
    .orderBy("s.step_number")
    .where("s.scheme_id", id);
}

function add(sc) {
  return db("schemes")
    .insert(sc, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function addStep(step) {
  return db("steps")
    .insert(step, "id")
    .then(ids => {
      const [id] = ids; 
      return findStepById(id);
    });
}

function update(changes, id) {
  return db("schemes")
    .update(changes)
    .where({ id });
}

function remove(id) {
  /*
  select sc.id
    , s.id
  from schemes as sc
  join steps as s
    on s.scheme_id = sc.id
  */
  return db("schemes as sc")
    .select('sc.id', 's.id')
    .join('steps as s', 's.scheme_id', 'sc.id')
    .where('sc.id', id)
    .del();
}
