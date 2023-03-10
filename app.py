from flask import Flask, render_template, request, url_for, redirect, session
from pymongo import MongoClient
import bcrypt

app = Flask(__name__)
app.secret_key = "testing"
app.static_folder = 'static'
app.static_url_path=''
client = MongoClient('localhost', 27017)
db = client.local
records = db.logintest
meterids=db.meterids
mdas=db.mdas
hierarchydb = db.hierarchy

@app.route("/", methods=['post', 'get'])
def index():
    message = ''

    if "email" in session:
        return redirect(url_for("home"))

    if request.method == "POST":
        user = request.form.get("fullname")
        email = request.form.get("email")
        password1 = request.form.get("password1")
        password2 = request.form.get("password2")
        user_found = records.find_one({"name": user})
        email_found = records.find_one({"email": email})
        if user_found:
            message = 'There already is a user by that name'
            return render_template('index.html', message=message)
        if email_found:
            message = 'This email already exists in database'
            return render_template('index.html', message=message)
        if password1 != password2:
            message = 'Passwords should match!'
            return render_template('index.html', message=message)
        else:
            hashed = bcrypt.hashpw(password2.encode('utf-8'), bcrypt.gensalt())
            user_input = {'name': user, 'email': email, 'password': hashed}
            records.insert_one(user_input)
            user_data = records.find_one({"email": email})
            new_email = user_data['email']
            return render_template('home.html', email=new_email)
    return render_template('index.html')

@app.route("/login", methods=["POST", "GET"])
def login():
    message = 'Please login to your account'
    if "email" in session:
        return redirect(url_for("home"))

    if request.method == "POST":
        email = request.form.get("email")
        password = request.form.get("password")
        email_found = records.find_one({"email": email})
        if email_found:
            email_val = email_found['email']
            passwordcheck = email_found['password']
            if bcrypt.checkpw(password.encode('utf-8'), passwordcheck):
                session["email"] = email_val
                return redirect(url_for('home'))
            else:
                if "email" in session:
                    return redirect(url_for("home"))
                message = 'Wrong password'
                return render_template('login.html', message=message)
        else:
            message = 'Email not found'
            return render_template('login.html', message=message)
    else:
        return render_template('login.html')

@app.route('/home', methods=["POST", "GET"])
def home():
    allmeters=meterids.find_one({"meterd":"yes"},{"meteridlist":1,"_id":0})
    if "email" in session:
        email = session["email"]
        return render_template('home.html', email=email,allmeters=allmeters['meteridlist'],allmeterlen=len(allmeters['meteridlist']))
    else:
        return redirect(url_for("login"))

@app.route("/logout", methods=["POST", "GET"])
def logout():
    if "email" in session:
        session.pop("email", None)
        message="you have been logged out sucessfully"
        return render_template('login.html', message=message)
    else:
        return redirect(url_for("login"))

@app.route('/getdata/<meterid>/<tag>', methods=['POST',"GET"])
def remove(meterid,tag):
    if "email" in session:
        m=meterid
        t=tag
        if '&' in t:
            l=tag.split('&');em=[]
            for i in l:
                g2=mdas.find_one({"MeterId":m},{"UTILITYTYPE.D1."+i:1,"_id":0})
                utility=g2['UTILITYTYPE'][0]
                d1=utility['D1'][0]
                final=d1[i]
                em.append(final)
            return "displayed in backend cause it have two values"
        else:
            g2=mdas.find_one({"MeterId":m},{"UTILITYTYPE.D1."+t:1,"_id":0})
            utility=g2['UTILITYTYPE'][0]
            d1=utility['D1'][0]
            final=d1[t]
            if final:
                return 'the value tag '+t+" is "+final
            else:
                return 'no value ra babu'
    else:
        return "offff amma"

@app.route('/hierarchy/create', methods=['POST',"GET"])
def hierarchy():
    if request.method == "POST":
        hierarchy_name= request.form.get("hierarchy")
        email = request.form.get("email")

        email_found = records.find_one({"email": email})
        if email_found:
            hierarchy_name_found=hierarchydb.find_one({"hierarchy_name": hierarchy_name})
            if hierarchy_name_found:
                message="hierarchy name alrady found"
                return render_template('hierarchy.html',message=message)
            else:
                insertvalue={'hierarchy_name':hierarchy_name,'email':email,'levelscreated':0,'fixlevel':10,'levelnames':{}}
                hierarchydb.insert_one(insertvalue)
        return render_template('hierarchy.html')
    else:
        return render_template('hierarchy.html')


@app.route('/myhierarchy/', methods=['POST',"GET"])
def myhierarchyshwolevels():
    if "email" in session:
        email = session["email"]
    findhierarchy_name=hierarchydb.find_one({"email": email},{'_id':0,'hierarchy_name':1})
    if findhierarchy_name:
        findlevelnames=hierarchydb.find_one({"email": email},{'_id':0,'levelnames':1})
        if findlevelnames:
            levelnames=findlevelnames.get('levelnames');levelnameslist=list(levelnames.keys())
            return render_template('myhierarchy.html',showhierarchy=findhierarchy_name['hierarchy_name'],email=email,list=levelnameslist,leng=len(levelnameslist))
        else:
            return render_template('myhierarchy.html',showhierarchy=findhierarchy_name['hierarchy_name'],email=email,list=0)
    return render_template('myhierarchy.html',showhierarchy=0,email=email,list=0)


@app.route('/myhierarchy/create', methods=['POST',"GET"])
def myhierarchycreate():
    if "email" in session:
        email = session["email"]
    level_find=hierarchydb.find_one({"email": email},{'levelscreated':1,'fixlevel':1,'_id':0})
    if level_find:
        levelscreated=level_find['levelscreated']
        fixlevel=level_find['fixlevel']
        if request.method == "POST":
            levelname = request.form.get("levelname")
            if int(levelscreated)<fixlevel:
                levelstr='level'+str(levelscreated)
                levelpossition=levelscreated
                levelscreated=levelscreated+1
                hierarchydb.update_one({"email": email},{"$set": 
                                                                {levelstr: 
                                                                        {'levelname':levelname,
                                                                        'levels':{

                                                                        }
                                                                        },
                                                                        "levelscreated":levelscreated}})
                hierarchydb.update_one({"email": email},{"$set":
                                                                {'levelnames.'+levelname:
                                                                                        {'levelstr':levelstr,
                                                                                        'possition':levelpossition
                                                                }}})
                return redirect(url_for("myhierarchyshwolevels"))
            else:
                return redirect(url_for("myhierarchyshwolevels"))
        return render_template('levelcreate.html')
    return "no hirearchy found to create level"


@app.route('/<levelname>/details', methods=['POST',"GET"])
def myleveldetails(levelname):
    l=levelname
    if "email" in session:
        email = session["email"]
    findlevelnames=hierarchydb.find_one({"email": email},{'_id':0,'levelnames':1})
    if findlevelnames:
        levelnames=findlevelnames.get('levelnames');levelnameslist=list(levelnames.keys())
        if l in levelnameslist:
            levelnumber=levelnames[l]['levelstr']
            levelnumberfind=hierarchydb.find_one({"email": email},{'_id':0,levelnumber:1})
            m=levelnumberfind.get(levelnumber);lvlnm=m.get('levelname');lvldt=m.get('levels')
            if lvlnm:
                if lvldt:
                    return render_template('leveldetails.html',levelname=lvlnm,levels=lvldt,email=email,levelnumber=levelnumber)
                else:
                    return render_template('leveldetails.html',levelname=lvlnm,levels=0,email=email,levelnumber=levelnumber)
            else:
                return render_template('leveldetails.html',levelname=0,levels=0,email=email,levelnumber=levelnumber)
        else:
            return "no such level found"
    else:
        return "you dont have any levels"


@app.route('/<levelname>/adddata', methods=['POST',"GET"])
def leveladd(levelname):
    l=levelname
    if "email" in session:
        email = session["email"]
    findlevelnames=hierarchydb.find_one({"email": email},{'_id':0,'levelnames':1})
    if findlevelnames:
        levelnames=findlevelnames.get('levelnames');levelnameslist=list(levelnames.keys())
        if l in levelnameslist:
            levelnumber=levelnames[l]['levelstr']
            possition=levelnames[l]['possition']
            possition=possition-1
            if possition<0:
                if request.method == "POST":
                    levelnumberfind=hierarchydb.find_one({"email": email},{'_id':0,levelnumber:1})
                    m=levelnumberfind.get(levelnumber);lvlnm=m.get('levelname');lvldt=m.get('levels')
                    name = request.form.get("name")
                    meterid = request.form.get("meterid")
                    address = request.form.get("address")
                    pincode = request.form.get("pincode")

                    insertlevel={lvlnm+'meterid':meterid,lvlnm+'address':address,lvlnm+'pincode':pincode}
                    hierarchydb.update_one({"email": email},{"$set": {levelnumber+'.levels.'+name:insertlevel}})
                    return redirect(url_for('myleveldetails',levelname=l))

                else:
                    levelnumberfind=hierarchydb.find_one({"email": email},{'_id':0,levelnumber+".levelname":1,levelnumber+".levels":1})
                    m=levelnumberfind.get(levelnumber);lvlnm=m.get('levelname');lvldt=m.get('levels')
                    return render_template('leveladd.html',levelname=lvlnm,level=0)
            else:
                if request.method == "POST":
                    levelnumberfind=hierarchydb.find_one({"email": email},{'_id':0,levelnumber:1})
                    m=levelnumberfind.get(levelnumber);lvlnm=m.get('levelname');lvldt=m.get('levels')
                    linkingto=request.form.get("linkingto")
                    name = request.form.get("name")
                    meterid = request.form.get("meterid")
                    address = request.form.get("address")
                    pincode = request.form.get("pincode")
                    beforelevel=levelnameslist[possition]
                    findbeforelevel=hierarchydb.find_one({"email": email},{'_id':0,"levelnames."+beforelevel:1})
                    beforelevelnumber=findbeforelevel['levelnames'][beforelevel]['levelstr']
                    levelnumberfind=hierarchydb.find_one({"email": email},{'_id':0,beforelevelnumber+".levels."+linkingto:1})
                    insertlevel={'linkstring':beforelevelnumber+".levels."+linkingto,'linkvalue':linkingto,lvlnm+'meterid':meterid,lvlnm+'address':address,lvlnm+'pincode':pincode}
                    hierarchydb.update_one({"email": email},{"$set": {levelnumber+'.levels.'+name:insertlevel}})
                    return redirect(url_for('myleveldetails',levelname=l))
                else:
                    beforelevel=levelnameslist[possition]
                    findbeforelevel=hierarchydb.find_one({"email": email},{'_id':0,"levelnames."+beforelevel:1})
                    beforelevelnumber=findbeforelevel['levelnames'][beforelevel]['levelstr']
                    levelnumberfind=hierarchydb.find_one({"email": email},{'_id':0,beforelevelnumber+".levelname":1,beforelevelnumber+".levels":1})
                    clevelnumberfind=hierarchydb.find_one({"email": email},{'_id':0,levelnumber+".levelname":1})
                    lvlnm=clevelnumberfind[levelnumber]['levelname']
                    lvldt=levelnumberfind[beforelevelnumber]['levels']
                    levelist=list(lvldt.keys())
                    return render_template('leveladd.html',levelname=lvlnm,email=email,levelist=levelist)
        else:
            return "level name not found"
    else:
        return "you cannot add levels to no existing level"

if __name__ == "__main__":
  app.run(debug=True, host='0.0.0.0', port=5000)
