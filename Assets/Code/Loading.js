#pragma strict
//property of CodOrps Interactive
//Programmed by Hillario Haji
//Controls the loading of contents in the main contents
var Progress:GUIText;
var LoadInt:GUIText;
private var maxIndex:float=0;
private var realNumber:float;
private var range:float=13;
function Start () {

}

function Update () {
maxIndex+=range*Time.deltaTime;
realNumber=Mathf.Round(maxIndex);
if(realNumber==1)
{
	Progress.text="Loading GPS...";
}
else if(realNumber==10)
{
	Progress.text="Updating scores...";
}
else if(realNumber==15)
{
	Progress.text="Loading world...";
}
else if(realNumber==45)
{
	Progress.text="Setting up Truck...";
}
else if(realNumber==55)
{
	Progress.text="Setting up Roads...";
}
else if(realNumber==65)
{
	Progress.text="Setting up goods...";
}
else if(realNumber==75)
{
	Progress.text="Loading Game Data...";
}
else if(realNumber==100)
{
	maxIndex=100;
	Progress.text="Finalizing...";
	Application.LoadLevel(2);
}
LoadInt.text=""+realNumber+"%";
}