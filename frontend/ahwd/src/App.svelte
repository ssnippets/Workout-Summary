<script>
  import { startDate, endDate, processedData } from "./Data.js";
  // export let startDate;
  // export let endDate;
  // export let json = getData();

  // let year = 2019;
  // async function process(data) {
  //   const rtv = {};
  //   data.forEach(w => {
  //     let start = new Date(w.startDate);
  //     if (start.getFullYear() != year) {
  //       return;
  //     }
  //     if (!startDate || start < startDate) {
  //       startDate = new Date(w["startDate"]);
  //     }
  //     if (!endDate || new Date(w["endDate"]) > endDate) {
  //       endDate = new Date(w["endDate"]);
  //     }
  //     let type = w.workoutActivityType.replace("HKWorkoutActivityType", "");
  //     if (!rtv[type]) {
  //       rtv[type] = { distance: 0, duration: 0, totalEnergyBurned: 0 };
  //     }
  //     rtv[type].distance += Number(w.totalDistance);
  //     rtv[type].duration += Number(w.duration);
  //     rtv[type].totalEnergyBurned += Number(w.totalEnergyBurned);
  //   });
  //   return rtv;
  // }
  // async function getData() {
  //   const res = await fetch("workouts.json");
  //   if (res.ok) {
  //     let tmp = await res.json();

  //     json = await process(tmp);
  //     console.log("test");
  //     console.log(json);

  //     // process the data...
  //   } else {
  //     alert("HTTP Error: " + res.status);
  //   }
  // }
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <h1>Jorge's Workout logs</h1>
  <h2>Start Date: {$startDate}</h2>
  <h2>End Date: {$endDate}</h2>
  {#await $processedData}
    <p>Loading Data</p>
  {:then data}

    <table>
      <tr>
        <th>Workout</th>
        <th>Distance (mi)</th>
        <th>Time (min)</th>
        <th>Total Energy (kcal)</th>
      </tr>
      {#each Object.keys(data) as wk}
        <tr>
          <td>{wk}</td>
          <td>{data[wk].distance.toFixed(2)}</td>
          <td>{data[wk].duration.toFixed(2)}</td>
          <td>{data[wk].totalEnergyBurned.toFixed(2)}</td>
        </tr>
      {/each}
      <tr />
    </table>
    <!-- <p>Todo ... {data}</p> -->
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
  <!-- <p>
    Visit the
    <a href="https://svelte.dev/tutorial">Svelte tutorial</a>
    to learn how to build Svelte apps.
  </p> -->
</main>
