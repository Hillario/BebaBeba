#pragma strict  
var difficulty:float=50.0;
var handling:float=50.0;
var gamma:float=0.7;
var mystyle:GUIStyle;
var subheading:GUIStyle;
var heading:GUIStyle;
var savedDifficulty:float=50.0;
var savedHandling:float=50.0;
var savedGamma:float=0.7;
var deviceText:GUIText;
function Start () {
 difficulty=50.0;
 handling=50.0;
 gamma=0.7;
 savedDifficulty=PlayerPrefs.GetFloat("difficulty");
 savedHandling=PlayerPrefs.GetFloat("handling");
 savedGamma=PlayerPrefs.GetFloat("gamma");
 difficulty=savedDifficulty;
 handling=savedHandling;
 gamma=savedGamma;
}

function Update () {
	PlayerPrefs.SetFloat("difficulty",difficulty);
	PlayerPrefs.SetFloat("handling",handling);
	PlayerPrefs.SetFloat("gamma",gamma);
}
function OnGUI()
{
	GUILayout.Label("");
	GUILayout.Label("");
	GUI.Label(Rect(Screen.width/2-50,0,50,50),"*Options*",heading);
	GUI.Label(Rect(0,15,50,50),"AI Difficulty",subheading);
	GUI.Label(Rect(0,35,50,50),"Easy",mystyle);
	GUI.Label(Rect(Screen.width/2,35,50,50),"Hard",mystyle);	
	difficulty=GUILayout.HorizontalSlider(difficulty,40.0,80.0,GUILayout.Width(Screen.width/2));	
	GUILayout.Label("");	
	GUILayout.Label("");
	GUI.Label(Rect(0,80,50,50),"Car Handling",subheading);
	GUI.Label(Rect(0,100,50,50),"Smooth",mystyle);
	GUI.Label(Rect(Screen.width/2,100,50,50),"Rough",mystyle);	
	handling=GUILayout.HorizontalSlider(handling,40.0,100.0,GUILayout.Width(Screen.width/2));
	GUILayout.Label("");	
	GUILayout.Label("");
	GUI.Label(Rect(0,145,50,50),"Gamma",subheading);
	GUI.Label(Rect(0,165,50,50),"Low",mystyle);
	GUI.Label(Rect(Screen.width/2,165,50,50),"High",mystyle);	
	gamma=GUILayout.HorizontalSlider(gamma,0.4,2.0,GUILayout.Width(Screen.width/2));
	GUILayout.Label("");	
	GUILayout.Label("");
	if(GUI.Button(Rect(0,Screen.height-50,100,50),"Back"))
	{
		//open the main menu
		Application.LoadLevel(2);
	}
	if(GUI.Button(Rect(Screen.width-100,Screen.height-50,100,50),"Defaults"))
	{
		//reset all to default values
		difficulty=50.0;
	 	handling=50.0;
 		gamma=0.7;
	}
	deviceText.text="Player:"+SystemInfo.deviceName+"\n"+	
	"Type:"+SystemInfo.deviceType+"\n"+
	"Graphics:"+SystemInfo.graphicsDeviceName+"\n"+
	"Size:"+SystemInfo.graphicsMemorySize;		
}
