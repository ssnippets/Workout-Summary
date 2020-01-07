import { readable, derived } from "svelte/store";
let _startDate;
let _endDate;
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
  const rtv = {};
  data.forEach(w => {
    let start = new Date(w.startDate);
    if (start.getFullYear() != year) {
      return;
    }
    if (!_startDate || start < _startDate) {
      _startDate = new Date(w["startDate"]);
    }
    if (!_endDate || new Date(w["endDate"]) > _endDate) {
      _endDate = new Date(w["endDate"]);
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

export const startDate = readable(undefined, set => {
  let isSet = false;
  let interval = setInterval(() => {
    if (!isSet) {
      set(_startDate && _startDate);
      isSet = true;
    }
  }, 100);

  return () => clearInterval(interval);
});

export const endDate = readable(undefined, set => {
  let isSet = false;
  let interval = setInterval(() => {
    if (!isSet && _endDate) {
      set(_endDate);
      isSet = true;
    }
  }, 100);

  return () => clearInterval(interval);
});

export const processedData = derived(data, $data => process($data));
