#!/env python3
import sys
import xml.etree.cElementTree as ET
import json
def outputJSON(root):
    pass
def process(root):
    workouts = root.findall("Workout")
    workoutStr, workoutObj = _processWorkouts(workouts) # for CSV, enable workoutStr
    #print(workoutStr)
    print(json.dumps(workoutObj))
#    for w in workouts:
#        print (repr(w.attrib))

def _processWorkouts(workoutList):
    rtv = []
    objRtv = []
    params = [
            'workoutActivityType',
            'duration',
            'durationUnit',
            'totalDistance',
            'totalDistanceUnit',
            'totalEnergyBurned',
            'totalEnergyBurnedUnit',
            'creationDate',
            'startDate',
            'endDate',
            ]
    rtv.append(','.join(params))
    for idx,w in enumerate(workoutList):
        attribs = w.attrib
        o = {"id": idx}
#        print(repr(attribs))
        str_list = []
        for i in params:
            str_list.append(attribs[i])
            o[i] = attribs[i]
        rtv.append(','.join(str_list))
        objRtv.append(o)
    return '\n'.join(rtv), objRtv


if __name__ == "__main__":
    if not len(sys.argv) > 1:
        print("usage: %s <file name>" % sys.argv[0])
        sys.exit(1)
    fname = sys.argv[1]
    root = ET.parse(fname).getroot()
    process(root)
