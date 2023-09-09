from flask import Flask, url_for
from pybaseball import statcast_batter
from sklearn.cluster import KMeans

import pandas as pd

app = Flask(__name__)

pitching_types = pd.read_csv(('./static/pitch_arsenals.csv'))
pitching_types = pitching_types.rename(columns={
    'n_ff': 'FF',
    'n_si': 'SI',
    'n_fc': 'FC',
    'n_sl': 'SL',
    'n_ch': 'CH',
    'n_cu': 'CU',
    'n_fs': 'FS',
    'n_kn': 'KN',
    'n_st': 'ST',
    'n_sv': 'SV',
})


pitching_types['player_name'] = pitching_types.apply(
    lambda x: f"{x[' first_name']} {x['last_name']}", axis=1)

cols = pitching_types.columns.tolist()
cols = cols[-1:] + cols[:-1]

pitching_types = pitching_types[cols]
pitching_types = pitching_types.drop(columns=['last_name', ' first_name'])
pitching_types = pitching_types.fillna(0.0)

clustering_data = pitching_types.loc[:, ~pitching_types.columns.isin(['pitcher', 'player_name', 'cluster'])]
kmeans = KMeans(n_clusters=4, init="k-means++", random_state=0)
kmeans.fit(clustering_data)
y = kmeans.predict(clustering_data)

pitching_types['cluster'] = y

@app.route("/api/clustered")
def clustered():
    return pitching_types.to_dict('r')


@app.route("/api/matchup/<batter_id>")
def matchup(batter_id):
    pitcher_with_cluster = pitching_types[['pitcher', 'cluster']]
    batter_df = statcast_batter(start_dt="2023-03-31", end_dt="2023-12-01", player_id=int(batter_id))
    batter_df = batter_df[['pitcher', 'events', 'p_throws', 'woba_value', 'babip_value', 'iso_value']].dropna()
    batter_df = batter_df.merge(pitcher_with_cluster, left_on='pitcher', right_on='pitcher')
    result = batter_df[['woba_value', 'babip_value', 'iso_value', 'cluster']] \
        .groupby('cluster').agg({'woba_value': 'mean', 'babip_value': 'mean', 'iso_value': 'mean', 'cluster': 'size'}) \
        .rename(columns={'woba_value':'woba', 'babip_value': 'babip', 'iso_value': 'iso', 'cluster':'count'}) \
        .merge(pitching_types['cluster'].value_counts(), left_index=True, right_index=True)
    return result.to_dict('r')

