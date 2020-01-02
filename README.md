# Apple Health Workout Display

## Quickstart

- Get an export from Apple Health, decompress and put it into this folder. Convert using something like:

```
python parseData.py ../apple_health_export/export.xml | tee frontend/ahwd/public/workouts.json
```

2. Go to the frontend folder, do an `npm install`
3. `npm run dev` and navigate to `localhost:5000` to view the results.
4. `npm run build` builds the package into `public/bundle/build`

## What can be done right now?

1. There's a ton that still needs to be implemented:
   - heart rate correlation
   - gpx route display
   - individual workout display
   - ...
2. right now, you can change the year that's filtered (clunkily) by updating `App.svelte`'s `year` parameter.
3. Also, `parseData.py` can be altered to spit out the workouts into csv...
