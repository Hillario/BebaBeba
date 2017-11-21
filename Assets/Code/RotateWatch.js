#pragma strict
private var killtime:float=20;
function Start () {
	
}

function Update () {
transform.Rotate(Vector3(0,250*Time.deltaTime,0));
killtime-=Time.deltaTime;
if(killtime<=0)
{
	killtime=0;
	gameObject.GetComponent.<Renderer>().enabled=true;
	gameObject.GetComponent.<Collider>().enabled=true;
}
}
function OnTriggerEnter()
{
	gameObject.GetComponent.<Renderer>().enabled=false;
	gameObject.GetComponent.<Collider>().enabled=false;
	killtime=20;			
}
