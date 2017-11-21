#pragma strict
//script that controls the ui elements of the extras window
//GUI text instructions
var instructions:GUIText;
var credits:GUIText;
var mine:Light;
function Start () {

}

function Update () {

}
function OnGUI()
{	
    instructions.text=">>>_How to play_<<<\n"+
    "-There are old warehouses scattered all over the game world.\n"+
    "-Just drive into one and then the Objective hud will appear.\n"+
    "-The GPS will be initiated,follow it to the desired place.\n"+
    "-Complete the task given before the time given expires.\n"+
    "-To obtain additional time,pick up the time packs in red boxes.\n"+
    "-Collect as much coins as possible as this gives you Bragging rights.\n"+
    "-ENJOY BEBABEBA!!!.";
    credits.text=">>>_Credits_<<<\n"+
    "<Designed and Developed by CodOrps Interactive>\n"+
    "                        -Hillary Haji.\n"+
    "                        -Tamba Sylvester.\n"+
    "                        -Mang'eli Simon.";
    
    if(GUI.Button(Rect(0,Screen.height-50,70,50),"Back"))
    {
    	Application.LoadLevel(2);
    }
    if(GUI.Button(Rect(Screen.width-70,Screen.height-50,70,50),"Website"))
    {
    	//website url
    	Application.OpenURL("https://www.codorps.com/");
    }
}