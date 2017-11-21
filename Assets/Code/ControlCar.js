#pragma strict

//-------Programmed by Hillario Haji-----CodOrps Interactive
//-------copyright 2014 CodOrps Interactive
//-------this Class Library made by CodOrps Interactive is free for anyone to use and modify
//-------Enjoy making games.Asante.
/*
--Take caution when setting the wheel collider..
--do not change the euler angles of the collider so as to get maximum torque and steerangle efficiency
--do NOT set the stiffness of the wheel to a higher value in order to avoid unrealistic sliding during
--handbrake.
*/
	//declare the car wheel collider variables
	var WheelFL:WheelCollider;
	var WheelFR:WheelCollider ;
	var WheelRL:WheelCollider ;
	var WheelRR:WheelCollider ;
	var maxTorque:float =50f;
	//variables for spinning the wheel
	var WheelFLSpin:Transform ;
	var WheelFRSpin:Transform ;
	var WheelRLSpin:Transform ;
	var WheelRRSpin:Transform ;
	//variables for steer handling
	var lowestSpeedAtSteer:float=50;
	var lowSteerAngle:float=40;
	var highSteerAngle:float=10;
	var decelerateSpeed:float=20;
	//variables for speed limit
	var currentSpeed:float;
	var TopSpeed:float=100;
	var reverseTopSpeed=100;
	//variables for light indicator
	var activemat:Material;
	var inactivemat:Material;
	var brakeLightsR:GameObject;
	var brakeLightsL:GameObject;
	var brakeLights:Light;
	//variables for applying the handbrake
	var braked:boolean=false;
	var MaxBrakeTorque:float=50;
	//----private variables for applying friction to tyres
	private var mySideWayFriction:float;
	private var myForwardFriction:float;
	private var slipSideWayFriction:float;
	private var slipForwardFriction:float;	
	//variables for the gearRatio
	var GearRatio:int[];//array	
	var myGear:int;
	//GUI variables
	var Accelerate:GUITexture;
	var Braking:GUITexture;	
	var speedTxt:GUIText;
	var gearTxt:GUIText;
	static var CarSpeed:float;	
	var stringGear:String;
	var objective:GUITexture;
	var GUIContinue:GUITexture;
	var carrots:GUITexture;
	var Pineapples:GUITexture;
	var Potatoes:GUITexture;
	var Glass:GUITexture;
	var Computers:GUITexture;
	var Tomatoes:GUITexture;
	var Corn:GUITexture;
	var Tyres:GUITexture;
	var Desc:GUIText;	
	var Timer:GUIText;
	var distance:float=0;	
	//CarControl input value
	static var MotionValue:int=0;
	static var GPSValue:int=0;	
	//variables for the distance
var target1:Transform;
var target2:Transform;
var target3:Transform;
var target4:Transform;
var target5:Transform;
var target6:Transform;
var target7:Transform;
var target8:Transform;
var RelativePosition:Vector3;
var absoluteSpeed:float=60;	
var TimeTaken:float;
var myTime:float;
var addGUI:GUITexture;
private var killtime=30;
//variables for score system
var mainscore:float=0;
var mainmoney:float=0;
var maincoins:float=0;
var moneyIncremental:float=0;
var coins:GameObject;
var watches:GameObject;
//score system GUIs
var scoreGUI:GUIText;
var moneyGUI:GUIText;
var coinGUI:GUIText;
var home:GUITexture;
var scorePointer:float;
var highscore:float;
var privscore:float;
var allcoins:float;
var sumcoins:float;
var allcash:float;
var sumcash:float;
var detTime:boolean=false;
var difficulty:float=0;
var handling:float=0;
var coinSound:AudioSource;
var watch:AudioSource;
//-------------------------------------------------------------------------------------------score system function 
function ScoreSystem()
{
	sumcoins=allcoins+maincoins;
	sumcash=allcash+mainmoney;
	PlayerPrefs.SetFloat("sumcoins",sumcoins);	
	PlayerPrefs.SetFloat("sumcash",sumcash);
	//start with the score of the player incremented by the system timer.
	mainscore+=Time.deltaTime*20;
	privscore=Mathf.Round(mainscore);
	scoreGUI.text=""+privscore;
	//the main coins score will be determined by the OnTriggerEnter function to the coin gameobject.
	coinGUI.text=""+maincoins;	
	
	//playerprefs-----------------------------------------------------------------saving the scores to the hard-drive
	PlayerPrefs.SetFloat("score",privscore);
	PlayerPrefs.SetFloat("coins",maincoins);
	PlayerPrefs.SetFloat("money",mainmoney);
	PlayerPrefs.SetFloat("achievedscore",scorePointer);	
	if(privscore>highscore)
	{
		scorePointer=privscore;
	}	
	else
	{
		scorePointer=highscore;
	}
}
	//--------------------------------------------------------------------------------------- Use this for initialization
	function Start () {
	//set the parameters if the game according to the options script
	difficulty=PlayerPrefs.GetFloat("difficulty");
	handling=PlayerPrefs.GetFloat("handling");
	lowestSpeedAtSteer=handling;
	absoluteSpeed=difficulty;	
	detTime=false;	
	allcash=PlayerPrefs.GetFloat("allcash");	
	allcoins=PlayerPrefs.GetFloat("allcoins");
	highscore=PlayerPrefs.GetFloat("highscore");
	coins.SetActive(false);
	watches.SetActive(false);
	addGUI.enabled=false;
	//randomize the position of the car
var positionRandom:int=0;
positionRandom=Random.Range(1,9);
/*if(positionRandom==1)
{
	transform.position= new Vector3(115.18,1,116.65);
}
else if(positionRandom==2)
{
	transform.position= new Vector3(365,1,2571.491);
}
else if(positionRandom==3)
{
	transform.position= new Vector3(375.59,1,3674.401);
}
else if(positionRandom==4)
{
	transform.position= new Vector3(1484.596,1,3692.054);
}
else if(positionRandom==5)
{
	transform.position= new Vector3(1708.212,1,2360.466);
}
else if(positionRandom==6)
{
	transform.position= new Vector3(1310.6,1,277.102);
}
else if(positionRandom==7)
{
	transform.position= new Vector3(2695.4,1,190.5965);
}
else if(positionRandom==8)
{
	transform.position= new Vector3(4866.312,1,333.9019);
}*/	
	//------set the car COG
		GetComponent.<Rigidbody>().centerOfMass.y=-0.1;
		GetComponent.<Rigidbody>().centerOfMass.z=0.09;		
		//----set the parameters for the wheelcollider using function SetParameters()
		SetParameters()	;
		//----GUIs disabled		
		objective.enabled=false;
		GUIContinue.enabled=false;
		carrots.enabled=false;
		Pineapples.enabled=false;
		Potatoes.enabled=false;
		Glass.enabled=false;
		Computers.enabled=false;
		Tomatoes.enabled=false;
		Corn.enabled=false;
		Tyres.enabled=false;
		Desc.enabled=false;
		Timer.enabled=false;			
	}
	//----set wheel collider values
	function SetParameters(){
	myForwardFriction=WheelRR.forwardFriction.stiffness;
	mySideWayFriction=WheelRR.sidewaysFriction.stiffness;
	slipSideWayFriction=0.02;
	slipForwardFriction=0.04;
	GetComponent.<AudioSource>().volume=2;
	}	
	//------------------------------------------------------------ Update is called contantly in respect to the game loop
	function FixedUpdate () {	
		
	//call the control function	
	GUIControl();
	Control();	
	HandBrake();		
	CarSpeed=currentSpeed/6;
	CarSpeed=Mathf.Round(CarSpeed);		 
	if(CarSpeed<0)
	{
	CarSpeed=CarSpeed*-1;
	stringGear="R";
	}
	else
	{
	CarSpeed=CarSpeed*1;
	}
	speedTxt.text=""+CarSpeed+"Km/h";
	gearTxt.text=stringGear;
	}	
	//---------------------------------------------------------------------------------- Update is called once per frame
	function Update() 
	{
	//initialize the score system functionality
		ScoreSystem();			
	 	killtime-=Time.deltaTime;
	 	if(killtime<=0)
	 	{
	 	killtime=0;
	 	addGUI.enabled=false;	 	
	 	}	 				
	//-----Going back to game after the player accepts the objective	
	if(Input.GetButtonDown("Jump"))
	{	
		detTime=true;	
		GUIContinue.enabled=false;
		objective.enabled=false;
		carrots.enabled=false;
		Pineapples.enabled=false;
		Potatoes.enabled=false;
		Glass.enabled=false;
		Computers.enabled=false;
		Tomatoes.enabled=false;
		Corn.enabled=false;
		Tyres.enabled=false;
		Desc.enabled=false;	
		Accelerate.enabled=true;
	 	Braking.enabled=true;
	 	Timer.enabled=true;	 	
		//-----Start the game timer here
		//-----set GPS of the car to desired location		
		Shuffle();
		coins.SetActive(true);
		watches.SetActive(true);
		mainmoney=mainmoney+moneyIncremental;
		moneyGUI.text=""+mainmoney+"/=";								    			
	}
	//-------------------------------------------------------------------load the main menu level
		if(Input.GetKeyDown(KeyCode.M))
		{
			Application.LoadLevel(2);
		}	
		
	 if(Input.GetKeyDown(KeyCode.R))
	 {
	 	//---code to reposition the car in the correct position
	 }
	 	EngineSound();
		WheelFLSpin.Rotate (WheelFL.rpm / 60 *  360 * Time.deltaTime,0,0);
		WheelFRSpin.Rotate (WheelFR.rpm / 60 *  360 * Time.deltaTime,0,0);
		WheelRLSpin.Rotate (WheelRL.rpm / 60 *  -360 * Time.deltaTime,0,0);
		WheelRRSpin.Rotate (WheelRR.rpm / 60 *  360 * Time.deltaTime,0,0);
		WheelFLSpin.localEulerAngles.y=WheelFL.steerAngle-WheelFLSpin.localEulerAngles.z;
		WheelFRSpin.localEulerAngles.y=WheelFR.steerAngle-WheelFRSpin.localEulerAngles.z;	
		//invoke the spring function for all wheels
		WheelPosition();	
	 //brake lights
	  BreakLights();	
	  	if(detTime){
	  		TimeTaken-=Time.deltaTime;	  
	  		myTime=Mathf.Round(TimeTaken);
	 			}		  
	  if(myTime<=0)
	  {
	  	//load the mainmenu
	  	Application.LoadLevel(2);
	  	myTime=0;  	
	  }  	  
	  if(myTime>0 && myTime<=5)
	  {
	  Timer.color=Color.red;	 
	  }
	  else
	  {
	  Timer.color=Color.black;
	  }
	  if(myTime>=60)
	  {
	  	var min=myTime-60;
	  	Timer.text="01:"+min.ToString("00");
	  }
	  else if(myTime<60)
	  {
	  	Timer.text="00:"+myTime.ToString("00");
	  }
	}			
	//function that controls the gameobject behaviour from physics to rendering
	function Control(){
	//----move car
		//calculate speed
		currentSpeed=((2*22/7*WheelRL.radius*WheelFL.rpm*60)/1000);
		currentSpeed=Mathf.Round(currentSpeed);
		//validate when speed is below the topspeed
		if(currentSpeed<TopSpeed && currentSpeed>-reverseTopSpeed && !braked){
		WheelRR.motorTorque = maxTorque * Input.GetAxis("Vertical");
		WheelRL.motorTorque = maxTorque * Input.GetAxis("Vertical");
		}
		else{
		WheelRL.motorTorque=0;
		WheelRR.motorTorque=0;
		}		
		//create a variable for lerping that is constant in this game loop
		var speedFactor=GetComponent.<Rigidbody>().velocity.magnitude/lowestSpeedAtSteer;
		var currentSpeedAngle=Mathf.Lerp(lowSteerAngle,highSteerAngle,speedFactor);
		currentSpeedAngle*=Input.GetAxis("Horizontal");//move the steering of the car,//--accelerator.x
		WheelFL.steerAngle = currentSpeedAngle;
		WheelFR.steerAngle = currentSpeedAngle;			
		//decelerate when maxspeed is reached
		/*if(!Input.GetAxis("Vertical"))
		{
		WheelRL.brakeTorque=decelerateSpeed;
		WheelRR.brakeTorque=decelerateSpeed;
		}
		else{
		//if not accelerating,set the torque to 0;
		WheelRL.brakeTorque=0;
		WheelRR.brakeTorque=0;*/		
	}
//function that adds spring suspension to the wheel of the car
function WheelPosition(){
var hit:RaycastHit;
var wheelpos:Vector3;
//spring for wheelCollider WheelFL
if(Physics.Raycast(WheelFL.transform.position,-WheelFL.transform.up,hit,WheelFL.radius+WheelFL.suspensionDistance)){
wheelpos=hit.point+WheelFL.transform.up*WheelFL.radius;
}
else{
wheelpos=WheelFL.transform.position-WheelFL.transform.up*WheelFL.suspensionDistance;
}
WheelFLSpin.transform.position=wheelpos;
//spring for wheelCollider WheelFR
if(Physics.Raycast(WheelFR.transform.position,-WheelFR.transform.up,hit,WheelFR.radius+WheelFR.suspensionDistance)){
wheelpos=hit.point+WheelFR.transform.up*WheelFR.radius;
}
else{
wheelpos=WheelFR.transform.position-WheelFR.transform.up*WheelFR.suspensionDistance;
}
WheelFRSpin.transform.position=wheelpos;
//spring for wheelCollider WheelRL
if(Physics.Raycast(WheelRL.transform.position,-WheelRL.transform.up,hit,WheelRL.radius+WheelRL.suspensionDistance)){
wheelpos=hit.point+WheelRL.transform.up*WheelRL.radius;
}
else{
wheelpos=WheelRL.transform.position -WheelRL.transform.up*WheelRL.suspensionDistance;
}
WheelRLSpin.transform.position=wheelpos;
//spring for wheelCollider WheelRR
if(Physics.Raycast(WheelRR.transform.position,-WheelRR.transform.up,hit,WheelRR.radius+WheelRR.suspensionDistance)){
wheelpos=hit.point+WheelRR.transform.up*WheelRR.radius;
}
else{
wheelpos=WheelRR.transform.position-WheelRR.transform.up*WheelRR.suspensionDistance;
}
WheelRRSpin.transform.position=wheelpos;
}
function HandBrake(){
/*if(Input.GetButton("Jump")){
braked=true;
}
else{
braked=false;
}*/
if(braked){
	WheelRL.brakeTorque=MaxBrakeTorque;
	WheelRR.brakeTorque=MaxBrakeTorque;	
	if(GetComponent.<Rigidbody>().velocity.magnitude>1){
	SetSlip(slipForwardFriction,slipSideWayFriction);	
	}
	else{
	SetSlip(1,1);
	}
}
else{
SetSlip(myForwardFriction,mySideWayFriction);
}
}
//function to slip car when handbrake is invoked
function SetSlip(currentForwardFriction:float,currentSidewaysFriction:float){
//forward friction
WheelRR.forwardFriction.stiffness=currentForwardFriction;
WheelRL.forwardFriction.stiffness=currentForwardFriction;
//WheelFR.forwardFriction.stiffness=currentForwardFriction;
//WheelFL.forwardFriction.stiffness=currentForwardFriction;
//sideways friction
WheelRR.sidewaysFriction.stiffness=currentSidewaysFriction;
WheelRL.sidewaysFriction.stiffness=currentSidewaysFriction;
//WheelFR.sidewaysFriction.stiffness=currentSidewaysFriction;
//WheelFL.sidewaysFriction.stiffness=currentSidewaysFriction;
}
function BreakLights(){
if(currentSpeed>0 && Input.GetAxis("Vertical")<0)
	 {	 
	 brakeLightsL.GetComponent.<Renderer>().material=activemat;
	 brakeLightsR.GetComponent.<Renderer>().material=activemat;
	 brakeLights.enabled=true;
	 }
	 else{
	 brakeLightsL.GetComponent.<Renderer>().material=inactivemat;
	 brakeLightsR.GetComponent.<Renderer>().material=inactivemat;
	 brakeLights.enabled=false;
	 }

}
function EngineSound(){
//set the gear change
for(var i=0;i<GearRatio.length;i++){
if(GearRatio[i]>currentSpeed){
break;
}
}
var gearMinValue:float=0.00;
var gearMaxValue:float=0.00;
myGear=i;
if(myGear==0)
{
    stringGear="N";	
	gearTxt.color=Color.red;
}
else
{
	gearTxt.text=""+myGear;
	gearTxt.color=Color.black;
}
if(i==0){
gearMinValue=0;
}
else{
gearMinValue=GearRatio[i-1];
}
gearMaxValue=GearRatio[i];

var enginePitch=((currentSpeed-gearMinValue)/(gearMaxValue-gearMinValue))+0.7;
GetComponent.<AudioSource>().pitch=enginePitch;//currentSpeed/TopSpeed+1;//set the sound
}
function GUIControl()
{
//GUI controls for the car
	  if(Input.touchCount>0)
	  {
	  if(Accelerate.HitTest(Input.GetTouch(0).position))
	  {
	  if(Input.GetTouch(0).phase==TouchPhase.Began || Input.GetTouch(0).phase==TouchPhase.Stationary)
	  {
	   //event for zoom in here
	   //event for car acceleration
	  MotionValue=1;
	  }	  
	  if(Input.GetTouch(0).phase==TouchPhase.Ended)
	  {
	  //event for zoom out here
	  //decelerate speed invoked
	   MotionValue=0;
	  }
	  }
	  if(Braking.HitTest(Input.GetTouch(0).position))
	  {
	  if(Input.GetTouch(0).phase==TouchPhase.Began || Input.GetTouch(0).phase==TouchPhase.Stationary)
	  {
	  //event for zoom in here
	  //event for braking here
	  MotionValue=-1;	  
	  }	  
	  if(Input.GetTouch(0).phase==TouchPhase.Ended)
	  {
	  //event for zoom out here
	  //decelerate speed invoked
	   MotionValue=0;
	  }
	  }	 
	  if(GUIContinue.HitTest(Input.GetTouch(0).position))
	  {
	  if(Input.GetTouch(0).phase==TouchPhase.Began || Input.GetTouch(0).phase==TouchPhase.Stationary)
	  {
	  //event for zoom in here
	  //event for continue
	    detTime=true;	
		GUIContinue.enabled=false;
		objective.enabled=false;
		carrots.enabled=false;
		Pineapples.enabled=false;
		Potatoes.enabled=false;
		Glass.enabled=false;
		Computers.enabled=false;
		Tomatoes.enabled=false;
		Corn.enabled=false;
		Tyres.enabled=false;
		Desc.enabled=false;	
		Accelerate.enabled=true;
	 	Braking.enabled=true;
	 	Timer.enabled=true;	 	
		//-----Start the game timer here
		//-----set GPS of the car to desired location		
		Shuffle();
		coins.SetActive(true);
		watches.SetActive(true);
		mainmoney=mainmoney+moneyIncremental;
		moneyGUI.text=""+mainmoney+"/=";
	  }	  
	  if(Input.GetTouch(0).phase==TouchPhase.Ended)
	  {
	  //event for zoom out here
	 
	  }
	  }	
	  if(home.HitTest(Input.GetTouch(0).position))
	  {
	  if(Input.GetTouch(0).phase==TouchPhase.Began || Input.GetTouch(0).phase==TouchPhase.Stationary)
	  {
	  	  home.color=Color.blue;
	  }	  
	  if(Input.GetTouch(0).phase==TouchPhase.Ended)
	  {
	  home.color=Color.clear;
	  //--------------------------------------------------load the main menu
	  Application.LoadLevel(2);
	  }
	  }	   
	  }		 
	  } 
	 function OnTriggerEnter(colliderHit:Collider)
	 {
	 if(colliderHit.gameObject.tag=="watch")
	 {
	 	//increase the time by 5 seconds
	 	TimeTaken=TimeTaken+5;
	 	addGUI.enabled=true;
	 	killtime=30;
	 	watch.Play();	
	 }
	 if(colliderHit.gameObject.tag=="Coins")
	 {
	 	//increment the coin score
	 	maincoins++;
	 	coinSound.Play();
	 }
	   var goods:int=Random.Range(1,9);	   
	 	if(colliderHit.gameObject.tag=="A")
	 	{	 				 		 	
	 		objective.enabled=true;
	 		Accelerate.enabled=false;
	 		Braking.enabled=false;	
	 		GUIContinue.enabled=true;	 		
	 		if(goods==8)
	 		{
	 		carrots.enabled=true;
		Pineapples.enabled=false;
		Potatoes.enabled=false;
		Glass.enabled=false;
		Computers.enabled=false;
		Tomatoes.enabled=false;
		Corn.enabled=false;
		Tyres.enabled=false;
		Desc.text=""+
		"Carrots improves your vision\n"+
		"because it has beta-carote which\n"+
		"is converted to vitamin A in the liver,\n"+
		"transport them to the desired place\n"+
		"in time.";		
		Desc.enabled=true;		
	 		}	
	 		else if(goods==7)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=true;
		Potatoes.enabled=false;
		Glass.enabled=false;
		Computers.enabled=false;
		Tomatoes.enabled=false;
		Corn.enabled=false;
		Tyres.enabled=false;
		Desc.text=""+
		"Pineapples strengthens your immune,\n"+
		"you will be less prone to arthritis,\n"+
		"stomach infections & sinusitis.\n"+
		"Transport them to the desired place\n"+
		"in time.";
		Desc.enabled=true;
	 		}
	 		else if(goods==6)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=false;
		Potatoes.enabled=true;
		Glass.enabled=false;
		Computers.enabled=false;
		Tomatoes.enabled=false;
		Corn.enabled=false;
		Tyres.enabled=false;
		Desc.text=""+
		"Potatoes have a possitive effect\n"+
		"on diabetes,Carbohydrates can be\n"+
		"a healthy part of any diabetic meal,\n"+
		"transport them to the desired place\n"+
		"in time.";
		Desc.enabled=true;
	 		}
	 		else if(goods==5)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=false;
		Potatoes.enabled=false;
		Glass.enabled=true;
		Computers.enabled=false;
		Tomatoes.enabled=false;
		Corn.enabled=false;
		Tyres.enabled=false;
		Desc.text=""+
		"The phytochemicals in Onions improve\n"+
		"the working of Vitamin C in the body,\n"+
		"thus gifting you with improved immunity.\n"+
		"transport them to the desired place\n"+
		"in time.";
		Desc.enabled=true;
	 		}
	 		else if(goods==4)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=false;
		Potatoes.enabled=false;
		Glass.enabled=false;
		Computers.enabled=true;
		Tomatoes.enabled=false;
		Corn.enabled=false;
		Tyres.enabled=false;
		Desc.text=""+
		"Oranges are rich in citrus limonoids,\n"+
		"proven to help fight a number of\n"+
		"varieties of cancer\n"+
		"transport them to the desired place\n"+
		"in time.";		
		Desc.enabled=true;
	 		}
	 		else if(goods==3)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=false;
		Potatoes.enabled=false;
		Glass.enabled=false;
		Computers.enabled=false;
		Tomatoes.enabled=true;
		Corn.enabled=false;
		Tyres.enabled=false;
		Desc.text=""+
		"Tomatoes contain a lot of vitamins A\n"+
		"and C,act as an anti-oxidant,working\n"+
		"to neutralize dangerous free radicals\n"+
		"in the blood stream,transport them to\n"+
		"the desired place in time.";	 
		Desc.enabled=true;
	 		}
	 		else if(goods==2)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=false;
		Potatoes.enabled=false;
		Glass.enabled=false;
		Computers.enabled=false;
		Tomatoes.enabled=false;
		Corn.enabled=true;
		Tyres.enabled=false;
		Desc.text=""+
		"Maize is good for digestion,its high\n"+
		"in dietary fiber which comprises of\n"+
		"both soluble and insoluble fiber,\n"+
		"transport them to the desired place\n"+
		"in time.";
		Desc.enabled=true;
	 		}
	 		else if(goods==1)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=false;
		Potatoes.enabled=false;
		Glass.enabled=false;
		Computers.enabled=false;
		Tomatoes.enabled=false;
		Corn.enabled=false;
		Tyres.enabled=true;
		Desc.text=""+
		"Spinach helps prevent high blood\n"+
		"pressure.it contains Vitamin C\n"+
		",vitamin E,beta-carotene,manganese\n"+
		",zinc and selenium,transport them to\n"+
		"the desired place in time.";
		Desc.enabled=true;		
	 		}		
	 	}
	 	if(colliderHit.gameObject.tag=="B")
	 	{	 		
	 	 	objective.enabled=true;
	 		Accelerate.enabled=false;
	 		Braking.enabled=false;
	 		GUIContinue.enabled=true;
	 		
	 		if(goods==8)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=false;
		Potatoes.enabled=false;
		Glass.enabled=false;
		Computers.enabled=false;
		Tomatoes.enabled=false;
		Corn.enabled=false;
		Tyres.enabled=true;
		Desc.text=""+
		"Spinach contains antioxidants,\n"+
		"protect the eye from cataracts\n"+
		"and age-related macular degeneration.\n"+
		"transport them to the desired place\n"+
		"in time.";
		Desc.enabled=true;
	 		}	
	 		else if(goods==7)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=false;
		Potatoes.enabled=false;
		Glass.enabled=false;
		Computers.enabled=false;
		Tomatoes.enabled=false;
		Corn.enabled=true;
		Tyres.enabled=false;
		Desc.text=""+
		"Maize prevents anemia because of\n"+
		"vitamin B12,folic acid and the\n"+
		"important compound iron,\n"+
		"transport them to the desired place\n"+
		"in time.";
		Desc.enabled=true;
	 		}
	 		else if(goods==6)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=false;
		Potatoes.enabled=false;
		Glass.enabled=false;
		Computers.enabled=false;
		Tomatoes.enabled=true;
		Corn.enabled=false;
		Tyres.enabled=false;
		Desc.text=""+
		"Did you know cooking tomatoes\n"+
		"destroys much of vitamin C,so stick \n"+
		"with raw tomatoes for more benefits.\n"+
		"transport them to the desired place\n"+
		"in time.";
		Desc.enabled=true;
	 		}
	 		else if(goods==5)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=false;
		Potatoes.enabled=false;
		Glass.enabled=false;
		Computers.enabled=true;
		Tomatoes.enabled=false;
		Corn.enabled=false;
		Tyres.enabled=false;
		Desc.text=""+
		"Oranges prevent kidney diseases\n"+
		"and reduces the risk of kidney\n"+
		"stones in the body,\n"+
		"transport them to the desired place\n"+
		"in time.";
		Desc.enabled=true;
	 		}
	 		else if(goods==4)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=false;
		Potatoes.enabled=false;
		Glass.enabled=true;
		Computers.enabled=false;
		Tomatoes.enabled=false;
		Corn.enabled=false;
		Tyres.enabled=false;
		Desc.text=""+
		"Onions contain chromium,which\n"+
		"assists in regulating blood sugar\n"+
		"in the body,\n"+
		"transport them to the desired place\n"+
		"in time.";
		Desc.enabled=true;
	 		}
	 		else if(goods==3)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=false;
		Potatoes.enabled=true;
		Glass.enabled=false;
		Computers.enabled=false;
		Tomatoes.enabled=false;
		Corn.enabled=false;
		Tyres.enabled=false;
		Desc.text=""+
		"Potatoes provide a decrease in\n"+
		"cholesterol levels because they\n"+
		"are half soluble and half insoluble,\n"+
		"transport them to the desired place\n"+
		"in time.";
		Desc.enabled=true;
	 		}
	 		else if(goods==2)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=true;
		Potatoes.enabled=false;
		Glass.enabled=false;
		Computers.enabled=false;
		Tomatoes.enabled=false;
		Corn.enabled=false;
		Tyres.enabled=false;
		Desc.text=""+
		"Pineapples are responsible for\n"+
		"a great reduction in pains linked with\n"+
		"arthritis(common in older individuals)\n"+
		"transport them to the desired place\n"+
		"in time.";
		Desc.enabled=true;
	 		}
	 		else if(goods==1)
	 		{
	 		carrots.enabled=true;
		Pineapples.enabled=false;
		Potatoes.enabled=false;
		Glass.enabled=false;
		Computers.enabled=false;
		Tomatoes.enabled=false;
		Corn.enabled=false;
		Tyres.enabled=false;
		Desc.text=""+
		"Carrots prevents premature wrinkling\n"+
		"acne,dry skin,pigmentation,blemishes\n"+
		"and uneven skin tone due to vitamin A,\n"+
		"transport them to the desired place\n"+
		"in time.";
		Desc.enabled=true;
	 		}	 		
	 	}
	 	if(colliderHit.gameObject.tag=="C")
	 	{	 		
	 	 	objective.enabled=true;
	 		Accelerate.enabled=false;
	 		Braking.enabled=false;
	 		GUIContinue.enabled=true;
	 		if(goods==8)
	 		{
	 		carrots.enabled=true;
		Pineapples.enabled=false;
		Potatoes.enabled=false;
		Glass.enabled=false;
		Computers.enabled=false;
		Tomatoes.enabled=false;
		Corn.enabled=false;
		Tyres.enabled=false;
		Desc.text=""+
		"Carrots can reduce the risk of\n"+
		"lung,breast and colon cancer due\n"+
		"to the presence of falcarinol,\n"+
		"transport them to the desired place\n"+
		"in time.";
		Desc.enabled=true;
	 		}	
	 		else if(goods==7)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=true;
		Potatoes.enabled=false;
		Glass.enabled=false;
		Computers.enabled=false;
		Tomatoes.enabled=false;
		Corn.enabled=false;
		Tyres.enabled=false;
		Desc.text=""+
		"Pineapples clear your lungs\n"+
		"because it prevents the accumulation\n"+
		"of mucous in your throat.\n"+
		"transport them to the desired place\n"+
		"in time.";
		Desc.enabled=true;
	 		}
	 		else if(goods==6)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=false;
		Potatoes.enabled=true;
		Glass.enabled=false;
		Computers.enabled=false;
		Tomatoes.enabled=false;
		Corn.enabled=false;
		Tyres.enabled=false;
		Desc.text=""+
		"Potatoes have been used for treating,\n"+
		"bruises,ulcers,and even burns,aiding\n"+
		"in the healing process,\n"+
		"transport them to the desired place\n"+
		"in time.";
		Desc.enabled=true;
	 		}
	 		else if(goods==5)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=false;
		Potatoes.enabled=false;
		Glass.enabled=true;
		Computers.enabled=false;
		Tomatoes.enabled=false;
		Corn.enabled=false;
		Tyres.enabled=false;
		Desc.text=""+
		"Onions have been used to reduce\n"+
		"inflammation and heal infections\n"+
		"in the body,\n"+
		"transport them to the desired place\n"+
		"in time.";
		Desc.enabled=true;
	 		}
	 		else if(goods==4)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=false;
		Potatoes.enabled=false;
		Glass.enabled=false;
		Computers.enabled=true;
		Tomatoes.enabled=false;
		Corn.enabled=false;
		Tyres.enabled=false;
		Desc.text=""+
		"Oranges reduces risk of Liver\n"+
		"cancer,According to two studies\n"+
		"in Japan eating mandarin oranges\n"+
		"reduces liver cancer, transport\n"+
		"them to the desired place in time.";
		Desc.enabled=true;
	 		}
	 		else if(goods==3)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=false;
		Potatoes.enabled=false;
		Glass.enabled=false;
		Computers.enabled=false;
		Tomatoes.enabled=true;
		Corn.enabled=false;
		Tyres.enabled=false;
		Desc.text=""+
		"Tomatoes reduce the damage\n"+
		"smoking does to your body.\n"+
		"Tomatoes contain chlorogenic\n"+
		"acid and coumaric acid transport\n"+
		"them to the desired place in time.";
		Desc.enabled=true;
	 		}
	 		else if(goods==2)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=false;
		Potatoes.enabled=false;
		Glass.enabled=false;
		Computers.enabled=false;
		Tomatoes.enabled=false;
		Corn.enabled=true;
		Tyres.enabled=false;
		Desc.text=""+
		"Are you Skinny!Maize facilitates\n"+
		"weight Gain,a great option for\n"+
		"underweight people,referred to\n"+
		"as‘hard gainers’transport them\n"+
		"to the desired place in time.";
		Desc.enabled=true;
	 		}
	 		else if(goods==1)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=false;
		Potatoes.enabled=false;
		Glass.enabled=false;
		Computers.enabled=false;
		Tomatoes.enabled=false;
		Corn.enabled=false;
		Tyres.enabled=true;
		Desc.text=""+
		"Spinach maintains the strength\n"+
		"and density of our bones One cup\n"+
		"of boiled spinach provides over\n"+
		"1000% of RDA of vitamin K.transport\n"+
		"them to the desired place in time.";
		Desc.enabled=true;
	 		}		 		
	 	}
	 	if(colliderHit.gameObject.tag=="D")
	 	{	 		
	 	 	objective.enabled=true;
	 		Accelerate.enabled=false;
	 		Braking.enabled=false;
	 		GUIContinue.enabled=true;
	 		if(goods==8)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=false;
		Potatoes.enabled=false;
		Glass.enabled=false;
		Computers.enabled=false;
		Tomatoes.enabled=false;
		Corn.enabled=false;
		Tyres.enabled=true;
		Desc.text=""+
		"Spinach strengthens immunity,one\n"+
		"cup of spinach contains over 337%\n"+
		"of the RDA of vitamin A,\n"+
		"transport them to the desired place\n"+
		"in time.";
		Desc.enabled=true;
	 		}	
	 		else if(goods==7)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=false;
		Potatoes.enabled=false;
		Glass.enabled=false;
		Computers.enabled=false;
		Tomatoes.enabled=false;
		Corn.enabled=true;
		Tyres.enabled=false;
		Desc.text=""+
		"Did you know that maize Prevents\n"+
		"Diabetes and Hypertension\n"+
		"in the body,\n"+
		"transport them to the desired place\n"+
		"in time.";
		Desc.enabled=true;
	 		}
	 		else if(goods==6)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=false;
		Potatoes.enabled=false;
		Glass.enabled=false;
		Computers.enabled=false;
		Tomatoes.enabled=true;
		Corn.enabled=false;
		Tyres.enabled=false;
		Desc.text=""+
		"Tomatoes have plenty of the mineral\n"+
		"chromium, which helps diabetics to\n"+
		"keep their blood sugar level under\n"+
		"control,transport them to the desired\n"+
		"place in time.";
		Desc.enabled=true;
	 		}
	 		else if(goods==5)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=false;
		Potatoes.enabled=false;
		Glass.enabled=false;
		Computers.enabled=true;
		Tomatoes.enabled=false;
		Corn.enabled=false;
		Tyres.enabled=false;
		Desc.text=""+
		"Since they’re full of soluble fiber\n"+
		",oranges are helpful in lowering\n"+
		"cholesterol in the body,\n"+
		"transport them to the desired place\n"+
		"in time.";
		Desc.enabled=true;
	 		}
	 		else if(goods==4)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=false;
		Potatoes.enabled=false;
		Glass.enabled=true;
		Computers.enabled=false;
		Tomatoes.enabled=false;
		Corn.enabled=false;
		Tyres.enabled=false;
		Desc.text=""+
		"Raw onion encourages the production\n"+
		"of good cholesterol (HDL),thus\n"+
		"keeping your heart healthy\n"+
		"transport them to the desired place\n"+
		"in time.";
		Desc.enabled=true;
	 		}
	 		else if(goods==3)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=false;
		Potatoes.enabled=true;
		Glass.enabled=false;
		Computers.enabled=false;
		Tomatoes.enabled=false;
		Corn.enabled=false;
		Tyres.enabled=false;
		Desc.text=""+
		"Stress on the body and mind\n"+
		"can be eased by ingesting\n"+
		"potatoes,awesome fact.\n"+
		"Transport them to the desired place\n"+
		"in time.";
		Desc.enabled=true;
	 		}
	 		else if(goods==2)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=true;
		Potatoes.enabled=false;
		Glass.enabled=false;
		Computers.enabled=false;
		Tomatoes.enabled=false;
		Corn.enabled=false;
		Tyres.enabled=false;
		Desc.text=""+
		"Pineapple is a natural source\n"+
		"of anti-coagulant, which is\n"+
		"useful in preventing blood clots,\n"+
		"transport them to the desired place\n"+
		"in time.";
		Desc.enabled=true;
	 		}
	 		else if(goods==1)
	 		{
	 		carrots.enabled=true;
		Pineapples.enabled=false;
		Potatoes.enabled=false;
		Glass.enabled=false;
		Computers.enabled=false;
		Tomatoes.enabled=false;
		Corn.enabled=false;
		Tyres.enabled=false;
		Desc.text=""+
		"Carrots have beta-carotene which\n"+
		"acts as an antioxidant to cell\n"+
		"damage hence reduces aging,\n"+
		"transport them to the desired place\n"+
		"in time."; 
		Desc.enabled=true;
	 		}	 		
	 	}
	 	if(colliderHit.gameObject.tag=="E")
	 	{	 	
	 	 	objective.enabled=true;
	 		Accelerate.enabled=false;
	 		Braking.enabled=false;
	 		GUIContinue.enabled=true;
	 		if(goods==8)
	 		{
	 		carrots.enabled=true;
		Pineapples.enabled=false;
		Potatoes.enabled=false;
		Glass.enabled=false;
		Computers.enabled=false;
		Tomatoes.enabled=false;
		Corn.enabled=false;
		Tyres.enabled=false;
		Desc.text=""+
		"Carrots helps in a Healthy\n"+
		"Glowing Skin (from the inside),\n"+
		"protects the skin from damage,\n"+
		"transport them to the desired place\n"+
		"in time."; 
		Desc.enabled=true;
	 		}	
	 		else if(goods==7)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=true;
		Potatoes.enabled=false;
		Glass.enabled=false;
		Computers.enabled=false;
		Tomatoes.enabled=false;
		Corn.enabled=false;
		Tyres.enabled=false;
		Desc.text=""+
		"Carrots have beta-carotene which\n"+
		"acts as an antioxidant to cell\n"+
		"damage hence reduces aging,\n"+
		"transport them to the desired place\n"+
		"in time."; 
		Desc.enabled=true;
	 		}
	 		else if(goods==6)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=false;
		Potatoes.enabled=true;
		Glass.enabled=false;
		Computers.enabled=false;
		Tomatoes.enabled=false;
		Corn.enabled=false;
		Tyres.enabled=false;
		Desc.text=""+
		"Another amazing thing about\n"+
		"pineapples is that these\n"+
		"fruits ensure oral health.\n"+
		"transport them to the desired place\n"+
		"in time."; 
		Desc.enabled=true;
	 		}
	 		else if(goods==5)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=false;
		Potatoes.enabled=false;
		Glass.enabled=true;
		Computers.enabled=false;
		Tomatoes.enabled=false;
		Corn.enabled=false;
		Tyres.enabled=false;
		Desc.text=""+
		"A powerful compound called\n"+
		"quercetin in onions is known\n"+
		"to play a significant role in\n"+
		"preventing cancer,transport them\n"+
		"to the desired place in time."; 
		Desc.enabled=true;
	 		}
	 		else if(goods==4)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=false;
		Potatoes.enabled=false;
		Glass.enabled=false;
		Computers.enabled=true;
		Tomatoes.enabled=false;
		Corn.enabled=false;
		Tyres.enabled=false;
		Desc.text=""+
		"Oranges are full of potassium\n"+
		"an electrolyte mineral is\n"+
		"responsible for helping the\n"+
		"heart function well.transport\n"+
		"them to the desired place in time."; 
		Desc.enabled=true;
	 		}
	 		else if(goods==3)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=false;
		Potatoes.enabled=false;
		Glass.enabled=false;
		Computers.enabled=false;
		Tomatoes.enabled=true;
		Corn.enabled=false;
		Tyres.enabled=false;
		Desc.text=""+
		"Tomatoes prevent strokes,heart\n"+
		"attack and other potentially\n"+
		"life-threatening heart problems.\n"+
		"transport them to the desired place\n"+
		"in time."; 
		Desc.enabled=true;
	 		}
	 		else if(goods==2)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=false;
		Potatoes.enabled=false;
		Glass.enabled=false;
		Computers.enabled=false;
		Tomatoes.enabled=false;
		Corn.enabled=true;
		Tyres.enabled=false;
		Desc.text=""+
		"Maize strengthens bones,\n"+
		"ligaments, tendons, muscles\n"+
		"and cartilage,\n"+
		"transport them to the desired place\n"+
		"in time."; 
		Desc.enabled=true;
	 		}
	 		else if(goods==1)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=false;
		Potatoes.enabled=false;
		Glass.enabled=false;
		Computers.enabled=false;
		Tomatoes.enabled=false;
		Corn.enabled=false;
		Tyres.enabled=true;
		Desc.text=""+
		"The high amount of vitamin A\n"+
		"in spinach also promotes\n"+
		"healthy skin,\n"+
		"transport them to the desired place\n"+
		"in time."; 
		Desc.enabled=true;
	 		}	 		
	 	}
	 	if(colliderHit.gameObject.tag=="F")
	 	{	 		
	 	 	objective.enabled=true;
	 		Accelerate.enabled=false;
	 		Braking.enabled=false;
	 		GUIContinue.enabled=true;
	 		if(goods==8)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=false;
		Potatoes.enabled=false;
		Glass.enabled=false;
		Computers.enabled=false;
		Tomatoes.enabled=false;
		Corn.enabled=false;
		Tyres.enabled=true;
		Desc.text=""+
		"Spinach contains vitamin K\n"+
		"which is also helpful in\n"+
		"preventing stroke,\n"+
		"transport them to the desired place\n"+
		"in time."; 
		Desc.enabled=true;
	 		}	
	 		else if(goods==7)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=false;
		Potatoes.enabled=false;
		Glass.enabled=false;
		Computers.enabled=false;
		Tomatoes.enabled=false;
		Corn.enabled=true;
		Tyres.enabled=false;
		Desc.text=""+
		"Maize contains beta-carotene which\n"+
		"helps in producing vitamin A\n"+
		",thus supporting better vision.\n"+
		"transport them to the desired place\n"+
		"in time."; 
		Desc.enabled=true;
	 		}
	 		else if(goods==6)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=false;
		Potatoes.enabled=false;
		Glass.enabled=false;
		Computers.enabled=false;
		Tomatoes.enabled=true;
		Corn.enabled=false;
		Tyres.enabled=false;
		Desc.text=""+
		"Because of high amounts of lycopene,\n"+
		"tomatoes are a great agent of skin\n"+
		"care,so ladies what are you waiting\n"+
		"for, transport them to the desired\n"+
		"place in time."; 
		Desc.enabled=true;
	 		}
	 		else if(goods==5)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=false;
		Potatoes.enabled=false;
		Glass.enabled=false;
		Computers.enabled=true;
		Tomatoes.enabled=false;
		Corn.enabled=false;
		Tyres.enabled=false;
		Desc.text=""+
		"Oranges lowers Risk of Disease\n"+
		"by neutralizing free radicals\n"+
		"in the body,\n"+
		"transport them to the desired place\n"+
		"in time."; 
		Desc.enabled=true;
	 		}
	 		else if(goods==4)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=false;
		Potatoes.enabled=false;
		Glass.enabled=true;
		Computers.enabled=false;
		Tomatoes.enabled=false;
		Corn.enabled=false;
		Tyres.enabled=false;
		Desc.text=""+
		"Got bitten by a honeybee? Apply\n"+
		"onion juice on the area for\n"+
		"immediate relief,\n"+
		"transport them to the desired place\n"+
		"in time."; 
		Desc.enabled=true;
	 		}
	 		else if(goods==3)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=false;
		Potatoes.enabled=true;
		Glass.enabled=false;
		Computers.enabled=false;
		Tomatoes.enabled=false;
		Corn.enabled=false;
		Tyres.enabled=false;
		Desc.text=""+
		"To ease any external inflammation,simply\n"+
		"rub a raw potato on the affected area(s)\n"+
		"including any ulcers that may be found in\n"+
		"the mouth,transport them to the desired\n"+
		"place in time."; 
		Desc.enabled=true;
	 		}
	 		else if(goods==2)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=true;
		Potatoes.enabled=false;
		Glass.enabled=false;
		Computers.enabled=false;
		Tomatoes.enabled=false;
		Corn.enabled=false;
		Tyres.enabled=false;
		Desc.text=""+
		"Pineapples Reduces Morning Sickness,\n"+
		"prevents episodes of nausea and\n"+
		"vomiting especially in pregnant women,\n"+
		"transport them to the desired place\n"+
		"in time."; 
		Desc.enabled=true;
	 		}
	 		else if(goods==1)
	 		{
	 		carrots.enabled=true;
		Pineapples.enabled=false;
		Potatoes.enabled=false;
		Glass.enabled=false;
		Computers.enabled=false;
		Tomatoes.enabled=false;
		Corn.enabled=false;
		Tyres.enabled=false;
		Desc.text=""+
		"Carrots helps in cleansing the\n"+
		"body,Vitamin A assists the liver\n"+
		"in flushing out the toxins,\n"+
		"from the body,transport them\n"+
		"to the desired place in time."; 
		Desc.enabled=true;
	 		}	 		
	 	}
	 	if(colliderHit.gameObject.tag=="G")
	 	{	 		
	 	 	objective.enabled=true;
	 		Accelerate.enabled=false;
	 		Braking.enabled=false;
	 		GUIContinue.enabled=true;
	 		if(goods==8)
	 		{
	 		carrots.enabled=true;
		Pineapples.enabled=false;
		Potatoes.enabled=false;
		Glass.enabled=false;
		Computers.enabled=false;
		Tomatoes.enabled=false;
		Corn.enabled=false;
		Tyres.enabled=false;
		Desc.text=""+
		"It’s all in the crunch!\n"+
		"Carrots clean your teeth\n"+
		"and mouth,\n"+
		"transport them to the desired place\n"+
		"in time."; 
		Desc.enabled=true;
	 		}	
	 		else if(goods==7)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=true;
		Potatoes.enabled=false;
		Glass.enabled=false;
		Computers.enabled=false;
		Tomatoes.enabled=false;
		Corn.enabled=false;
		Tyres.enabled=false;
		Desc.text=""+
		"Pineapples prevent Macular Degeneration\n"+
		"which is considered as one of the major\n"+
		"causes of blindness among older people,\n"+
		"transport them to the desired place\n"+
		"in time."; 
		Desc.enabled=true;
	 		}
	 		else if(goods==6)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=false;
		Potatoes.enabled=true;
		Glass.enabled=false;
		Computers.enabled=false;
		Tomatoes.enabled=false;
		Corn.enabled=false;
		Tyres.enabled=false;
		Desc.text=""+
		"Potatoes help Improve Brain Functions\n"+
		"due to high content of copper\n"+
		"and iron,\n"+
		"transport them to the desired place\n"+
		"in time."; 
		Desc.enabled=true;
	 		}
	 		else if(goods==5)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=false;
		Potatoes.enabled=false;
		Glass.enabled=true;
		Computers.enabled=false;
		Tomatoes.enabled=false;
		Corn.enabled=false;
		Tyres.enabled=false;
		Desc.text=""+
		"Onions scavenge free radicals,\n"+
		"thereby reducing your risk of\n"+
		"developing gastric ulcers,\n"+
		"transport them to the desired place\n"+
		"in time."; 
		Desc.enabled=true;
	 		}
	 		else if(goods==4)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=false;
		Potatoes.enabled=false;
		Glass.enabled=false;
		Computers.enabled=true;
		Tomatoes.enabled=false;
		Corn.enabled=false;
		Tyres.enabled=false;
		Desc.text=""+
		"Studies show that the abundance\n"+
		"of polyphenols in oranges protects\n"+
		"against viral infections,\n"+
		"transport them to the desired place\n"+
		"in time."; 
		Desc.enabled=true;
	 		}
	 		else if(goods==3)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=false;
		Potatoes.enabled=false;
		Glass.enabled=false;
		Computers.enabled=false;
		Tomatoes.enabled=true;
		Corn.enabled=false;
		Tyres.enabled=false;
		Desc.text=""+
		"All that vitamin A in tomatoes is\n"+
		"good for keeping your hair strong\n"+
		"and shiny,\n"+
		"transport them to the desired place\n"+
		"in time."; 
		Desc.enabled=true;
	 		}
	 		else if(goods==2)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=false;
		Potatoes.enabled=false;
		Glass.enabled=false;
		Computers.enabled=false;
		Tomatoes.enabled=false;
		Corn.enabled=true;
		Tyres.enabled=false;
		Desc.text=""+
		"Being a rich source of folic acid\n"+
		",maize is particularly beneficial\n"+
		"for pregnant women,\n"+
		"transport them to the desired place\n"+
		"in time."; 
		Desc.enabled=true;
	 		}
	 		else if(goods==1)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=false;
		Potatoes.enabled=false;
		Glass.enabled=false;
		Computers.enabled=false;
		Tomatoes.enabled=false;
		Corn.enabled=false;
		Tyres.enabled=true;
		Desc.text=""+
		"The abundance of vitamin K in\n"+
		"spinach contributes greatly to\n"+
		"a healthy nervous system,\n"+
		"transport them to the desired place\n"+
		"in time."; 
		Desc.enabled=true;
	 		}	 		
	 	}
	 	if(colliderHit.gameObject.tag=="H")
	 	{	 		
	 	 	objective.enabled=true;
	 		Accelerate.enabled=false;
	 		Braking.enabled=false;
	 		GUIContinue.enabled=true;
	 		if(goods==8)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=false;
		Potatoes.enabled=false;
		Glass.enabled=false;
		Computers.enabled=false;
		Tomatoes.enabled=false;
		Corn.enabled=false;
		Tyres.enabled=true;
		Desc.text=""+
		"Spinach contains vitamin K\n"+
		"which is also helpful in\n"+
		"preventing stroke,\n"+
		"transport them to the desired place\n"+
		"in time.";
		Desc.enabled=true;
	 		}	
	 		else if(goods==7)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=false;
		Potatoes.enabled=false;
		Glass.enabled=false;
		Computers.enabled=false;
		Tomatoes.enabled=false;
		Corn.enabled=true;
		Tyres.enabled=false;
		Desc.text=""+
		"Maize contains beta-carotene which\n"+
		"helps in producing vitamin A\n"+
		",thus supporting better vision.\n"+
		"transport them to the desired place\n"+
		"in time.";  
		Desc.enabled=true;
	 		}
	 		else if(goods==6)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=false;
		Potatoes.enabled=false;
		Glass.enabled=false;
		Computers.enabled=false;
		Tomatoes.enabled=true;
		Corn.enabled=false;
		Tyres.enabled=false;
		Desc.text=""+
		"Because of high amounts of lycopene,\n"+
		"tomatoes are a great agent of skin\n"+
		"care,so ladies what are you waiting\n"+
		"for, transport them to the desired\n"+
		"place in time.";
		Desc.enabled=true;
	 		}
	 		else if(goods==5)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=false;
		Potatoes.enabled=false;
		Glass.enabled=false;
		Computers.enabled=true;
		Tomatoes.enabled=false;
		Corn.enabled=false;
		Tyres.enabled=false;
		Desc.text=""+
		"Oranges lowers Risk of Disease\n"+
		"by neutralizing free radicals\n"+
		"in the body,\n"+
		"transport them to the desired place\n"+
		"in time."; 
		Desc.enabled=true;
	 		}
	 		else if(goods==4)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=false;
		Potatoes.enabled=false;
		Glass.enabled=true;
		Computers.enabled=false;
		Tomatoes.enabled=false;
		Corn.enabled=false;
		Tyres.enabled=false;
		Desc.text=""+
		"Got bitten by a honeybee? Apply\n"+
		"onion juice on the area for\n"+
		"immediate relief,\n"+
		"transport them to the desired place\n"+
		"in time.";  
		Desc.enabled=true;
	 		}
	 		else if(goods==3)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=false;
		Potatoes.enabled=true;
		Glass.enabled=false;
		Computers.enabled=false;
		Tomatoes.enabled=false;
		Corn.enabled=false;
		Tyres.enabled=false;
		Desc.text=""+
		"To ease any external inflammation,simply\n"+
		"rub a raw potato on the affected area(s)\n"+
		"including any ulcers that may be found in\n"+
		"the mouth,transport them to the desired\n"+
		"place in time."; 
		Desc.enabled=true;
	 		}
	 		else if(goods==2)
	 		{
	 		carrots.enabled=false;
		Pineapples.enabled=true;
		Potatoes.enabled=false;
		Glass.enabled=false;
		Computers.enabled=false;
		Tomatoes.enabled=false;
		Corn.enabled=false;
		Tyres.enabled=false;
		Desc.text=""+
		"Pineapples Reduces Morning Sickness,\n"+
		"prevents episodes of nausea and\n"+
		"vomiting especially in pregnant women,\n"+
		"transport them to the desired place\n"+
		"in time."; 
		Desc.enabled=true;
	 		}
	 		else if(goods==1)
	 		{
	 		carrots.enabled=true;
		Pineapples.enabled=false;
		Potatoes.enabled=false;
		Glass.enabled=false;
		Computers.enabled=false;
		Tomatoes.enabled=false;
		Corn.enabled=false;
		Tyres.enabled=false;
		Desc.text=""+
		"Carrots helps in cleansing the\n"+
		"body,Vitamin A assists the liver\n"+
		"in flushing out the toxins,\n"+
		"from the body,transport them\n"+
		"to the desired place in time.";
		Desc.enabled=true;
	 		}	 		
	 	}	 	
	 	}
	 function Shuffle()
	 {
	  var rangeInt:int=Random.Range(1,9);
	  if(rangeInt==1)
	  {	  	
	  	GPSValue=1;	
	  		RelativePosition=target1.position-transform.position;	
	 		distance=RelativePosition.x;
	 		TimeTaken=Mathf.Round(distance/absoluteSpeed);
	 		if(TimeTaken<=0)
	 		{
	 		TimeTaken=TimeTaken*-1;
	 		}
	 		moneyIncremental=90;	 			  		
	  }
	  else if(rangeInt==2)
	  {	  
	  	GPSValue=2;	
	  	RelativePosition=target2.position-transform.position;	
	 		distance=RelativePosition.x;
	 		TimeTaken=Mathf.Round(distance/absoluteSpeed);
	 		if(TimeTaken<=0)
	 		{
	 		TimeTaken=TimeTaken*-1;
	 		}
	 		moneyIncremental=180;	 		  	  	
	  }
	  else if(rangeInt==3)
	  {	   
	  	GPSValue=3;	 
	  	RelativePosition=target3.position-transform.position;	
	 		distance=RelativePosition.x;
	 		TimeTaken=Mathf.Round(distance/absoluteSpeed);
	 		if(TimeTaken<=0)
	 		{
	 		TimeTaken=TimeTaken*-1;
	 		}	
	 		moneyIncremental=270; 			  	 	
	  }
	  else if(rangeInt==4)
	  {	   
	  	GPSValue=4;	
	  	RelativePosition=target4.position-transform.position;	
	 		distance=RelativePosition.x;
	 		TimeTaken=Mathf.Round(distance/absoluteSpeed);
	 		if(TimeTaken<=0)
	 		{
	 		TimeTaken=TimeTaken*-1;
	 		}
	 		moneyIncremental=330;	 			  	 	
	  }
	  else if(rangeInt==5)
	  {	   
	  	GPSValue=5; 
	  	RelativePosition=target5.position-transform.position;	
	 		distance=RelativePosition.x;
	 		TimeTaken=Mathf.Round(distance/absoluteSpeed);
	 		if(TimeTaken<=0)
	 		{
	 		TimeTaken=TimeTaken*-1;
	 		}
	 		moneyIncremental=520;	 			  	
	  }
	  else if(rangeInt==6)
	  {	   
	  	GPSValue=6;	
	  	RelativePosition=target6.position-transform.position;	
	 		distance=RelativePosition.x;
	 		TimeTaken=Mathf.Round(distance/absoluteSpeed);
	 		if(TimeTaken<=0)
	 		{
	 		TimeTaken=TimeTaken*-1;
	 		}
	 		moneyIncremental=660;	 		 	  	 	
	  }
	  else if(rangeInt==7)
	  {	  
	  	GPSValue=7;		
	  	RelativePosition=target7.position-transform.position;	
	 		distance=RelativePosition.x;
	 		TimeTaken=Mathf.Round(distance/absoluteSpeed);
	 		if(TimeTaken<=0)
	 		{
	 		TimeTaken=TimeTaken*-1;
	 		}
	 		moneyIncremental=840;	 		  	  	
	  }
	  else if(rangeInt==8)
	  {	  
	  	GPSValue=8;	
	  	RelativePosition=target8.position-transform.position;	
	 		distance=RelativePosition.x;
	 		TimeTaken=Mathf.Round(distance/absoluteSpeed);
	 		if(TimeTaken<=0)
	 		{
	 		TimeTaken=TimeTaken*-1;
	 		}
	 		moneyIncremental=1000;	 			  	  	
	  }	  
	 }
		
	 
	  