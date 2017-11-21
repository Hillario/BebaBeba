#pragma strict
//controls the Input GUI of the mainMenu
var playGUI:GUITexture;
var optionsGUI:GUITexture;
var extrasGUI:GUITexture;
var quitGUI:GUITexture;
var brag:GUITexture;
var twitter:GUITexture;
var myscore:float;
var mycoins:float;
var mymoney:float;
var coins:GUIText;
var score:GUIText;
var cash:GUIText;
var highscore:GUIText;
var totalcoins:GUIText;
var totalcash:GUIText;
var achievedScore:float;
var sumcoins:float;
var sumcash:float;
var gammaLight:Light;
var gamma:float;
var tip:GUIText;
function Start () {
	gamma=PlayerPrefs.GetFloat("gamma");
	playGUI.color=Color.grey;
	optionsGUI.color=Color.grey;
	extrasGUI.color=Color.grey;
	quitGUI.color=Color.grey;
	brag.color=Color.grey;
	twitter.color=Color.grey;	
	//load the saved scores from the controlCar.js	
	myscore=PlayerPrefs.GetFloat("score");
	mycoins=PlayerPrefs.GetFloat("coins");
	mymoney=PlayerPrefs.GetFloat("money");	
	achievedScore=PlayerPrefs.GetFloat("achievedscore");	
	sumcoins=PlayerPrefs.GetFloat("sumcoins");
	sumcash=PlayerPrefs.GetFloat("sumcash");
	PlayerPrefs.SetFloat("allcoins",sumcoins);
	PlayerPrefs.SetFloat("allcash",sumcash);
	//randomize the tip information in the main menu 
	var randomInt:int;
	randomInt=Random.Range(1,11);
	switch(randomInt)
	{
	 case 1:
	 tip.text="Follow the road for more coins,points and money.";
	 break;
	 case 2:
	 tip.text="More Coins and Money gives you bragging rights!";
	 break;
	 case 3:
	 tip.text="If the game's too hard,change difficulty in options.";
	 break;
	 case 4:
	 tip.text="You can see the specs of your phone in extras.";
	 break;
	 case 5:
	 tip.text="Go to extras to view the tutorial of playing BebaBeba.";
	 break;
	 case 6:
	 tip.text="Free roam in the game instead of going on a mission.";
	 break;
	 case 7:
	 tip.text="Complete the objective before time expires.";
	 break;
	 case 8:
	 tip.text="Support the game if you care...>>>>>>>>>>>>>>>>>";
	 break;
	 default:
	 tip.text="The old warehouses is where the objective is located.";
	 break;
	}
}

function Update () {	
	if(Input.GetButtonDown("Jump"))
	{
		Application.LoadLevel(1);
	}	
	gammaLight.intensity=gamma;	
}
function OnGUI()
{
	//call the control GUI function
	ControlGUI();
	score.text="Score:"+myscore;
	coins.text="Coins:"+mycoins;
	cash.text="Cash:"+mymoney+"/=";	
	highscore.text="Highscore:"+achievedScore;
	totalcoins.text="TotalCoins:"+sumcoins;
	totalcash.text="Totalcash:"+sumcash+"/=";
	PlayerPrefs.SetFloat("highscore",achievedScore);		
}
//function that will be called in the OnGUI function
function ControlGUI()
{
	if(Input.touchCount>0)
	{
		if(playGUI.HitTest(Input.GetTouch(0).position))
	  {
	  if(Input.GetTouch(0).phase==TouchPhase.Began || Input.GetTouch(0).phase==TouchPhase.Stationary)
	  {
	   //change color here	   
	  playGUI.color=Color.blue;
	  }	  
	  if(Input.GetTouch(0).phase==TouchPhase.Ended)
	  {
	  //change color here
	  playGUI.color=Color.grey;
	  //open scene to play the game
	   Application.LoadLevel(1);
	  }
	  }
	  if(optionsGUI.HitTest(Input.GetTouch(0).position))
	  {
	  if(Input.GetTouch(0).phase==TouchPhase.Began || Input.GetTouch(0).phase==TouchPhase.Stationary)
	  {
	   //change color here	   
	  	optionsGUI.color=Color.blue;
	  }	  
	  if(Input.GetTouch(0).phase==TouchPhase.Ended)
	  {
	  //change color here
	  optionsGUI.color=Color.grey;
	  //open the options scene
	   Application.LoadLevel(3);
	  }
	  }
	  if(extrasGUI.HitTest(Input.GetTouch(0).position))
	  {
	  if(Input.GetTouch(0).phase==TouchPhase.Began || Input.GetTouch(0).phase==TouchPhase.Stationary)
	  {
	   //change color here	   
	  extrasGUI.color=Color.blue;
	  }	  
	  if(Input.GetTouch(0).phase==TouchPhase.Ended)
	  {
	  //change color here
	  extrasGUI.color=Color.grey;
	  //open the extras scene
	   Application.LoadLevel(4);
	  }
	  }
	  if(quitGUI.HitTest(Input.GetTouch(0).position))
	  {
	  if(Input.GetTouch(0).phase==TouchPhase.Began || Input.GetTouch(0).phase==TouchPhase.Stationary)
	  {
	   //change color here	   
	  	quitGUI.color=Color.blue;
	  }	  
	  if(Input.GetTouch(0).phase==TouchPhase.Ended)
	  {
	  //change color here
	  quitGUI.color=Color.grey;
	  //quit the game
	   Application.Quit();
	  }
	  }
	  if(brag.HitTest(Input.GetTouch(0).position))
	  {
	  if(Input.GetTouch(0).phase==TouchPhase.Began || Input.GetTouch(0).phase==TouchPhase.Stationary)
	  {
	   //change color here	   
	  brag.color=Color.blue;
	  }	  
	  if(Input.GetTouch(0).phase==TouchPhase.Ended)
	  {
	  //change color here
	  brag.color=Color.grey;
	  //post to facebook
	   
	  }
	  }
	  if(twitter.HitTest(Input.GetTouch(0).position))
	  {
	  if(Input.GetTouch(0).phase==TouchPhase.Began || Input.GetTouch(0).phase==TouchPhase.Stationary)
	  {
	   //change color here	   
	  twitter.color=Color.blue;
	  }	  
	  if(Input.GetTouch(0).phase==TouchPhase.Ended)
	  {
	  //change color here
	  twitter.color=Color.grey;
	  //like us on twitter
	   
	  }
	  }
	}
}