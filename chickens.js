G.AddData({
name:'Chickens',
author:'ExaltedFish',
desc:'A basic mod that adds Chickens, Eggs, and Feathers.',
engineVersion:1,
manifest:'chickenManifest.js',
requires:['Default dataset*'],
sheets:{'chickenSheet':'http://i.imgur.com/bhNRZSv.png'},//custom stylesheet (note : broken in IE and Edge for the time being)
func:function()
{
	//Test mod to add honeycomb.bees/honey/mead
	
	//First we add the new resources (honeycomb, bees, and honey)
	new G.Res({
		name:'eggs',
		desc:'[eggs] are produced by [chickens] and are packed with protein.',
		icon:[1,0,'chickenSheet'],
		turnToByContext:{'eat':{'health':0.03,'happiness':0.01},'decay':{'spoiled food':0.5}},//this basically translates to : "when eaten, generate some health and happiness; when rotting, turn into either nothing or some spoiled food"
		partOf:'food',
		category:'food',
	});
	new G.Res({
		name:'chickens',
		desc:'[chickens] are feathered, flight-less birds that are raised for their meat and eggs.',
		icon:[1,0,'chickenSheet'],
		partOf:'misc materials',
		category:'misc',
	});
	new G.Res({
		name:'feathers',
		desc:'[chickens] can be plucked for [feathers].',
		icon:[1,0,'chickenSheet'],
		turnToByContext:{'decay':{'feather':0.5}},//that last part makes hot sauce effectively have a 95% chance of simply not rotting (in effect, it decays into itself)
		partOf:'misc materials',
		category:'misc',
	});
	
	//Then we augment the base data to incorporate our new resources :
		//adding honeycomb and bees as something that can be gathered from grass
	G.getDict('grass').res['gather']['feathers']=0.1;
		//adding a new mode to artisans so they can make honeycomb from wild bees
	G.getDict('artisan').modes['feathers']={name:'Pluck feathers',desc:'Pluck feathers from wild chickens.',req:{'husbandry':true}};
		//adding a new effect to artisans that handles the actual honeycomb creation and is only active when 'make honeycomb' is active.
	//G.getDict('artisan').effects.push({type:'convert',from:{'hot pepper':3,'bees':3},into:{'hot sauce':1},every:3,mode:'hot sauce'});
	G.getDict('artisan').effects.push({type:'convert',from:{'chickens':1},into:{'feathers':3},every:5,mode:'feathers'});
	//beekeeping makes gatherers find bees
	G.getDict('gatherer').effects.push({type:'gather',context:'gather',what:{'chickens':0.05},amount:1,max:1,req:{'husbandry':true}});           
	//Then we add a new technology which is required by the artisans to gain access to the "hot sauce" mode :
	new G.Tech({
		name:'husbandry',
		desc:'@[gatherer]s can find chickens@[artisan]s can now produce [feathers] from [chickens]//With a lot of work, wild chickens can be tamed to lay eggs for our use.',
		icon:[0,1,'chickenSheet'],
		cost:{'insight':10},
		req:{'cooking':true},
	});
	
	//Finally, we add a trait that amplifies the benefits of consuming hot sauce; it will take on average 20 years to appear once the conditions (knowing the "Hot sauce preparing" tech) is fulfilled.
	//new G.Trait({
	//	name:'hot sauce madness',
	//	desc:'@your people appreciate [hot sauce] twice as much and will be twice as happy from consuming it.',
	//	icon:[1,1,'spicySheet'],
	//	chance:20,
	//	req:{'hot sauce preparing':true},
	//	effects:[
	//		{type:'function',func:function(){G.getDict('hot sauce').turnToByContext['eat']['happiness']=0.2;}},//this is a custom function executed when we gain the trait
	//	],
	//});
	
	//There are many other ways of adding and changing content; refer to /data.js, the default dataset, if you want to see how everything is done in the base game. Good luck!
}
});