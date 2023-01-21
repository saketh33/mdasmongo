from pymongo import MongoClient
import bson
client = MongoClient('localhost', 27017)
db = client.local
mdas = db.mdas
meterids=db.meterids
hierarchydb=db.hierarchy
#f= list(mdas.find({'MeterId': {'$exists': True}},{'MeterId':1,'_id':0}).MeterId)



m={'meteridlist':
                ["DGSM 2656", "DGSM 2660", "DGSM 2662", "DGSM 2667", "DGSM 2668", "DGSM 2668", "DGSM 2668", "DGSM 2673", "DGSM 2674", "DGSM 2676", "DGSM 2677", "DGSM 2677", "DGSM 2678", "DGSM 2680", "DGSM 2684", "DGSM 2685", "DGSM 2687", "DGSM 2689", "DGSM 2690", "DGSM 2693", "DGSM 2700", "DGSM 2700", "DGSM 2700", "DGSM 2700", "DGSM 2703", "DGSM 2707", "DGSM 2710", "DGSM 2727", "DGSM 2730", "DGSM 2740", "DGSM 2742", "DGSM 2752", "DGSM 2761", "DGSM 2761", "DGSM 2765", "DGSM 2771", "DGSM 2771", "DGSM 2773", "DGSM 2773", "DGSM 2773", "DGSM 2774", "DGSM 2783", "DGSM 2784", "DGSM 2785", "DGSM 2785", "DGSM 2791", "DGSM 2796", "DGSM 2798", "DGSM 2803", "DGSM 2803", "DGSM 2804", "DGSM 2805", "DGSM 2805", "DGSM 2807", "19349661", "18495615", "18495615", "18495615", "18495786", "18495786", "18495810", "18495811", "18495811", "18495811", "LT1915685", "LT2201227", "LT2201227" ]
}
#meterids.insert_one(m)

'''x='UTILITYTYPE.D1.G2'
g2=mdas.find_one({"MeterId":"DGSM 2656"},{"UTILITYTYPE.D1.G2":1,"_id":0})
print(g2)'''

'''level_found=hierarchydb.find({"name": /.*m.*/})'''
'''level_found=hierarchydb.find_one({"email": "deekshith@deekshith.com"},{'_id':0,"level0.levels":1})
m=level_found.get('level0')
f=m.get('levels')'''

'''f=hierarchydb.find_one({"email": 'saipavansaketh@gmail.com'},{'_id':0,'hierarchy_name':1})'''
demail='deekshith@deekshith.com'
'''f=hierarchydb.find_one({"email": demail},{'levelscreated':0,'fixlevel':0,'_id':0,'hierarchy_name':0,'email':0})
l=list(f.keys())
x=[]
for i in l:
    sad=hierarchydb.find_one({"email": demail},{'_id':0,i+'.levelname':1})
    x=sad.get(i)
    name=x.get('levelname')
    print(name)'''

f=hierarchydb.find_one({"email": demail},{'_id':0,'levelnames.zone.levelstr':1})
print(f['levelnames'])
if f:
    print("yes")
else:
    print("no")