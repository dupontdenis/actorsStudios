// FILE: transform.mjs
import { films, actorSalaries } from './dataFilms.mjs';

// Step 1: Transform films into an array of objects { name: actor, profit: totalSalary }
const actorProfits = films.flatMap(film => 
    film.actors.map(actor => ({
        name: actor,
        profit: actorSalaries.get(actor) || 0
    }))
);

console.log(actorProfits);

// Step 2: Aggregate total salary for each actor
const totalProfits = actorProfits.reduce((acc, { name, profit }) => {
    if (!acc[name]) {
        acc[name] = { name, profit: 0 };
    }
    acc[name].profit += profit;
    return acc;
}, {});


const uniqueActorProfits = Object.values(totalProfits);
console.log(uniqueActorProfits);

// Step 3: Use Object.groupBy to group actors by their salary
const groupedActors = Object.groupBy(uniqueActorProfits, actor => actor.profit > 8000 ? 'Actors Studio > 8000💲' : 'Supporting roles');

// Convert groupedActors to an array format suitable for listArray.html
const resultArray = Object.entries(groupedActors).map(([group, actors]) => {
    actors = actors.map(actor => actor.name);
    return {
    group,
    actors
}});

console.log(resultArray);

export { resultArray as transformation };