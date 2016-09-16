var request = require('superagent');

export function getAllUsers(){
	var req = 'api/users/';
	request.get(req).end(export 
	function(err,res){
        if(err==null){
        	return res;
        }else{
        	console.log(err);
        }
        
    });
}

export function getSingleUser(userId){
	var req = 'api/users/'+userId;
	request.get(req).end(export 
	function(err,res){
        if(err==null){
        	return res;
        }else{
        	console.log(err);
        }
        
    });
}

export function getMyProfile(){
	var req = 'api/profile/';
	request.get(req).end(export 
	function(err,res){
        if(err==null){
        	return res;
        }else{
        	console.log(err);
        }
        
    });
}

export function getFacebookLogin(){
	var req = 'facebook/login/';
	request.get(req).end(export 
	function(err,res){
        if(err==null){
        	return res;
        }else{
        	console.log(err);
        }
        
    });
}

export function getFacebookAuth(){
	var req = 'facebook/auth/';
	request.get(req).end(export 
	function(err,res){
        if(err==null){
        	return res;
        }else{
        	console.log(err);
        }
        
    });
}

export function getAllDrops(){
	var req = 'api/feeds/';
	request.get(req).end(export 
	function(err,res){
        if(err==null){
        	return res;
        }else{
        	console.log(err);
        }
        
    });
}

export function getSingleDropComments(dropId){
	var req = 'api/feeds/comments/'+dropId;
	request.get(req).end(export 
	function(err,res){
        if(err==null){
        	return res;
        }else{
        	console.log(err);
        }
        
    });
}