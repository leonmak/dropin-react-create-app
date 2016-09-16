var request = require('superagent');

//usage example
//getAllDrops().then(function(response){
//      console.log(response);
//    });

function defaultPromise(req){
    return new Promise(function(resolve, reject) {
        request.get(req).end( 
            function(err,res){
                if(err==null){
                    resolve(res);
                }else{
                    console.log(err);
                    reject(err);
                }
            });
    });
}

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

export function getAllDrops(){
	var req = 'api/feeds/';
    return defaultPromise(req);
}

export function getSingleDropComments(dropId){
	var req = 'api/feeds/comments/'+dropId;
	return defaultPromise(req);
}