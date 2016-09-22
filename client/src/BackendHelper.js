var request = require('superagent');

//usage example
//getAllDrops().then(function(response){
//      console.log(response);
//    });

//request.get('http://localhost:3000/api/feeds').end(function(err,res){
//      console.log(',',res);
//    });

const HOST = 'https://dropins.space/';

function defaultPromise(req){
    return new Promise(function(resolve, reject) {
        var final = HOST+req;
        request.get(final).end(
            function(err,res){
                if(err==null){
                	if(res.body.error){
                		console.log(res.body + "error on server");
                	}
                    //console.log(res);
                    resolve(res);
                }else{
                    console.log(err);
                    reject(err);
                }
            });
    });
}

//TODO: Use local drops later
/*LIST PAGE*/
// Example: {{base_url}}api/feeds?longitude=123.212&latitude=23.33&user_id=6
export function getAllDrops(user_id){
    var req = 'api/feeds/?';
    if(user_id==null){
        req = req+'user_id='+user_id+'&';
    }
    /*if((longitude!==null)&&(latitude!==null)){
        req = req+'longitude='+longitude+'&';
        req = req+'latitude='+latitude+'&';
    }*/
    return defaultPromise(req);
}

/*PROFILE PAGE*/








/*NOT USED*/
export function getAllUsers(){
	var req = 'api/users/';
	return defaultPromise(req);
}

export function getSingleUser(userId){
	var req = 'api/users/'+userId;
	return defaultPromise(req);
}

export function getMyProfile(){
	var req = 'api/profile/';
	return defaultPromise(req);
}

export function getFacebookLogin(){
	var req = 'facebook/login/';
	return defaultPromise(req);
}

export function getFacebookAuth(){
	var req = 'facebook/auth/';
	return defaultPromise(req);
}



export function getMyDrops(userId){
    var req = 'api/users/'+userId+'/feeds';
    return defaultPromise(req);
}

export function getMyComments(userId){
    var req = 'api/users/'+userId+'/comments';
    return defaultPromise(req);
}

export function getVotesForDrop(dropId){
    var req = 'api/feeds/'+dropId+'/votes';
    return defaultPromise(req);
}

export function getMyVotes(userId){
    var req = 'api/users/'+userId+'/votes';
    return defaultPromise(req);
}

//api/comments/feeds/1
export function getSingleDropComments(dropId){
    console.log('dropid',dropId);
	var req = 'api/feeds/'+dropId+'/comments';
	return defaultPromise(req);
}
