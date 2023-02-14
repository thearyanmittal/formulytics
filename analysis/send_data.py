import pandas as pd
import requests
import time

out = pd.read_excel('data/out.xlsx')

curr_lap = 1
for (index, row) in out.iterrows():
    name = row['driver_name']
    lap = row['lap_index']
    laptime = row['lap_time']
    pitstoptime = row['pit_stop_time']
    prevelapsed = row['prev_elapsed']
    position = row['position']
    probability = [row['prob_up'], row['prob_down'], row['prob_same'], row['prob_podium'], row['prob_win']]

    if lap in (57, 56, 55, 54):
        requests.post(
            f'http://ec2-3-22-63-209.us-east-2.compute.amazonaws.com:8080/addRacerData?name={name}&lap={lap}&laptime={laptime}&pitstoptime={pitstoptime}&prevelapsed={prevelapsed}&position={position}&probability={probability}'
        )
        time.sleep(10)
        
    # if out.iloc[index + 1]['lap_index'] > curr_lap:
    #     if (out.iloc[index + 1]['lap_index'] > 4):
    #         break
    #     curr_lap = lap
        