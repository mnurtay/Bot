var SlackBot = require('slackbots');
 
var users = [
    [ "Maksat Nurtay", "internship", 40, "IT" ],
    [ "Alisher Tasanov", "TA", 0, "none" ],
    [ "Adilbek Amanov", "internship", 40, "IT"],
    [ "Madina Akim", "internship", 40, "nonIT" ],
    [ "Iliyas Akhmetov", "internship", 40, "nonIT" ],
    [ "Hakim Abdrakhman", "TA", 0, "none" ],
    [ "Sabina Skakova", "internship", 40, "IT" ],
    [ "Zhanar Khalym", "internship", 40, "IT" ],
    [ "Tansuluu Myrzabaeva", "internship", 40, "IT" ],
    [ "Zhandos Seisembayev", "internship", 40, "IT" ],
    [ "Medet Kozhabayev", "internship", 40, "IT" ],
    [ "Diana Suleimenova", "internship", 40, "nonIT" ],
    [ "Adilet Tuleuov", "internship", 40, "IT" ],
    [ "Adina Kelisyzy", "internship", 40, "IT" ],
    [ "Alibek Akhmetov", "internship", 40, "IT" ],
    [ "Aizada Kakimova", "internship", 40, "IT" ],
    [ "Akerke Makhmut", "internship", 40, "nonIT" ]
];

var randomTeams = [users.length];

// create a bot
var bot = new SlackBot({
    token: 'xoxb-394304271476-394432978403-nowQmKjO6HPBRmzVLs1mSBs5',
    name: 'jarvis'
});
 
bot.on('start', function() {
    var params = {
        icon_emoji: ':cat:'
    };
    bot.postMessageToChannel('general', "Hello Guys!", params);

});

var control = 0;

bot.on('message', function(data) {
    if(data.username!=="jarvis" && data.subtype !== 'bot_message'){
        if((data.text == "_hello bot" || data.text == "_hello jarvis") && data.username != null){
            bot.postMessageToChannel('general', "Hi,\n "+data.username);
        }
        else if(data.text == "_set coins" || data.text == "_set coin"){
            bot.postMessageToChannel('general', "Choose user");
            bot.postMessageToChannel('general', "For example: <name>  <surname>  <coins>");
            control = 1;
        }
        else if(control == 1 && data.text != null){
            text = data.text;
            arr = text.split(" ");
            var ind=0, ind2=-1;
            for(let i=0; i<users.length; i++){
                if(data.username == users[1]) ind2=i;
            }
            if(ind2 >= 0){
                if(arr[2] > 15 && users[ind2][1]=="TA") arr[2] = 15;
                if(arr[2] > 20 && users[ind2][1]=="Teacher") arr[2] = 20;
                if(arr[2] > 3 && users[ind2][1]=="internship") arr[2] = 3;
            }
            for(var i=0; i<users.length; i++){
                if(users[i][0] == (arr[0]+" "+arr[1]) && users[i][1]!="TA"){
                    users[i][2] += parseInt(arr[2]); ind = i; break;
                }
            }
            bot.postMessageToChannel('general', "Ok"); 
            //bot.postMessageToChannel('general', users[ind][0]+" "+users[ind][1]+" "+users[ind][2]);
            control = 0;
        }
        else if(data.text == "_list users"){
            for (let i = 0; i < users.length; i++) {
                var user;
                if(users[i][1] !== "TA")
                    user = users[i][0]+"  "+users[i][2];
                else user = users[i][0];
                bot.postMessageToChannel('general', user);
            }
        }
        else if(data.text == "_random team"){
            var arr = [];
            arr[0] = parseInt(Math.random()*12);
            for (let i = 1; i < users.length; i++) {
                num = parseInt(Math.random()*users.length);
                ch = true;
                for(let k=0; k<arr.length; k++){
                    if(arr[k] == num) { ch=false; i--; break; }
                }
                if(ch) arr[i] = num;
            }
            for (let i = 0; i < arr.length; i++) {
                temp = [];
                temp = users[i];
                users[i] = users[arr[i]];
                users[arr[i]] = temp;
            }
            var ind = 0, k=0;
            for(let i=0; i<users.length; i++){
                if(users[i][3] == "IT"){
                    if(i%4 != 0)
                        randomTeams[ind][k++] = users[i];
                    else {
                        ind++; 
                        if(i != users.length-1){
                            k = 0;
                            randomTeams[ind][k++] = users[i];
                        } else randomTeams[ind-1][k++] = users[i];
                    }
                }
            }
            k=0;
            for(let i=0; i<users.length; i++){
                if(users[i][3] == "nonIT"){
                    if(i%4 != 0)
                        randomTeams[ind][k++] = users[i];
                    else {
                        ind++;
                        if(i != users.length-1){
                            k = 0;
                            randomTeams[ind][k++] = users[i];
                        } else randomTeams[ind-1][k++] = users[i];
                    }
                }
            }
        }
        else if(data.text == "_list team"){
            console.log(randomTeams.length)
            for(var i=0; i<randomTeams.length; i++){
                console.log(randomTeams[i]);
            }
        }
    }
});
