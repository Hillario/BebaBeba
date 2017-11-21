#pragma strict
private var wakeTime:float=20;
function Start () {

}

function Update () {
transform.Rotate(Vector3(0,0,200*Time.deltaTime));
wakeTime-=Time.deltaTime;
if(wakeTime<=0)
{
	wakeTime=0;
	gameObject.GetComponent.<Renderer>().enabled=true;
	gameObject.GetComponent.<Collider>().enabled=true;
}
}
function OnTriggerEnter()
{
	gameObject.GetComponent.<Renderer>().enabled=false;
	gameObject.GetComponent.<Collider>().enabled=false;
	wakeTime=20;			
}	