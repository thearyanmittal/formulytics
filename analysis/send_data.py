import pandas as pd
import requests

out = pd.read_excel('data/out.xlsx')

for (index, row) in out.iterrows():
    name = row['driver_name']
    lap = row['lap_index']
    laptime = row['lap_time']
    pitstoptime = row['pit_stop_time']
    prevelapsed = row['prev_elapsed']
    position = row['position']
    probability = round(1 / position, 2) # expected finish position
    requests.post(
        f'http://ec2-3-22-63-209.us-east-2.compute.amazonaws.com:8080/addRacerData?name={name}&lap={lap}&laptime={laptime}&pitstoptime={pitstoptime}&prevelapsed={prevelapsed}&position={position}&probability={probability}'
    )