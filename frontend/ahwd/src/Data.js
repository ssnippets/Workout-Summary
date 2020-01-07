import { readable, writable, derived } from "svelte/store";
let year = 2019;
async function getData() {
  const res = await fetch("workouts.json");
  if (res.ok) {
    return await res.json();
  } else {
    throw String("HTTP Error: " + res.status);
  }
}
function process(data) {
  let _startDate;
  let _endDate;
  const rtv = {};
  data.forEach(w => {
    let start = new Date(w.startDate);
    if (start.getFullYear() != year) {
      return;
    }
    if (!_startDate || start < _startDate) {
      _startDate = new Date(w["startDate"]);
      startDateStore.set(_startDate);
    }
    if (!_endDate || new Date(w["endDate"]) > _endDate) {
      _endDate = new Date(w["endDate"]);
      endDateStore.set(_endDate);
    }
    let type = w.workoutActivityType.replace("HKWorkoutActivityType", "");
    if (!rtv[type]) {
      rtv[type] = { distance: 0, duration: 0, totalEnergyBurned: 0 };
    }

    rtv[type].distance += Number(w.totalDistance);
    rtv[type].duration += Number(w.duration);
    rtv[type].totalEnergyBurned += Number(w.totalEnergyBurned);
  });
  return rtv;
}

export const data = readable([], async function start(set) {
  let _data = await getData();
  set(_data); // set the data

  return function stop() {
    set({});
  };
});

const startDateStore = writable(new Date());
const endDateStore = writable(new Date());

export const startDate = derived(startDateStore, $s => $s);
export const endDate = derived(endDateStore, $e => $e);
export const processedData = derived(data, $data => process($data));
