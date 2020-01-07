<script>
  import { startDate, endDate, processedData } from "./Data.js";
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
