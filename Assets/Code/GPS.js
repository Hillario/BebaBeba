#pragma strict
//programmed by hillario Haji.
//CodOrps Interactive.
//Geographical Positioning System
var target1:Transform;
var target2:Transform;
var target3:Transform;
var target4:Transform;
var target5:Transform;
var target6:Transform;
var target7:Transform;
var target8:Transform;
var RelativePosition:Vector3;
private var AiGps:int=0;
private var speed:float=0;
private var TimeTaken:float=0;
function Start () {

}
function Update () {
AiGps=ControlCar.GPSValue;
speed=ControlCar.CarSpeed;
if(AiGps==1)
{
	RelativePosition=target1.position-transform.position;
	transform.rotation=Quaternion.LookRotation(RelativePosition);
	target1.GetComponent.<Collider>().enabled=true;
	target2.GetComponent.<Collider>().enabled=false;
	target3.GetComponent.<Collider>().enabled=false;
	target4.GetComponent.<Collider>().enabled=false;
	target5.GetComponent.<Collider>().enabled=false;
	target6.GetComponent.<Collider>().enabled=false;
	target7.GetComponent.<Collider>().enabled=false;
	target8.GetComponent.<Collider>().enabled=false;		
}
else if(AiGps==2)
{
	RelativePosition=target2.position-transform.position;
	transform.rotation=Quaternion.LookRotation(RelativePosition);
	target1.GetComponent.<Collider>().enabled=false;
	target2.GetComponent.<Collider>().enabled=true;
	target3.GetComponent.<Collider>().enabled=false;
	target4.GetComponent.<Collider>().enabled=false;
	target5.GetComponent.<Collider>().enabled=false;
	target6.GetComponent.<Collider>().enabled=false;
	target7.GetComponent.<Collider>().enabled=false;
	target8.GetComponent.<Collider>().enabled=false;				
}
else if(AiGps==3)
{
	RelativePosition=target3.position-transform.position;
	transform.rotation=Quaternion.LookRotation(RelativePosition);
	target1.GetComponent.<Collider>().enabled=false;
	target2.GetComponent.<Collider>().enabled=false;
	target3.GetComponent.<Collider>().enabled=true;
	target4.GetComponent.<Collider>().enabled=false;
	target5.GetComponent.<Collider>().enabled=false;
	target6.GetComponent.<Collider>().enabled=false;
	target7.GetComponent.<Collider>().enabled=false;
	target8.GetComponent.<Collider>().enabled=false;				
}
else if(AiGps==4)
{
	RelativePosition=target4.position-transform.position;
	transform.rotation=Quaternion.LookRotation(RelativePosition);
	target1.GetComponent.<Collider>().enabled=false;
	target2.GetComponent.<Collider>().enabled=false;
	target3.GetComponent.<Collider>().enabled=false;
	target4.GetComponent.<Collider>().enabled=true;
	target5.GetComponent.<Collider>().enabled=false;
	target6.GetComponent.<Collider>().enabled=false;
	target7.GetComponent.<Collider>().enabled=false;
	target8.GetComponent.<Collider>().enabled=false;				
}
else if(AiGps==5)
{
	RelativePosition=target5.position-transform.position;
	transform.rotation=Quaternion.LookRotation(RelativePosition);
	target1.GetComponent.<Collider>().enabled=false;
	target2.GetComponent.<Collider>().enabled=false;
	target3.GetComponent.<Collider>().enabled=false;
	target4.GetComponent.<Collider>().enabled=false;
	target5.GetComponent.<Collider>().enabled=true;
	target6.GetComponent.<Collider>().enabled=false;
	target7.GetComponent.<Collider>().enabled=false;
	target8.GetComponent.<Collider>().enabled=false;				
}
else if(AiGps==6)
{
	RelativePosition=target6.position-transform.position;
	transform.rotation=Quaternion.LookRotation(RelativePosition);
	target1.GetComponent.<Collider>().enabled=false;
	target2.GetComponent.<Collider>().enabled=false;
	target3.GetComponent.<Collider>().enabled=false;
	target4.GetComponent.<Collider>().enabled=false;
	target5.GetComponent.<Collider>().enabled=false;
	target6.GetComponent.<Collider>().enabled=true;
	target7.GetComponent.<Collider>().enabled=false;
	target8.GetComponent.<Collider>().enabled=false;				
}
else if(AiGps==7)
{
	RelativePosition=target7.position-transform.position;
	transform.rotation=Quaternion.LookRotation(RelativePosition);
	target1.GetComponent.<Collider>().enabled=false;
	target2.GetComponent.<Collider>().enabled=false;
	target3.GetComponent.<Collider>().enabled=false;
	target4.GetComponent.<Collider>().enabled=false;
	target5.GetComponent.<Collider>().enabled=false;
	target6.GetComponent.<Collider>().enabled=false;
	target7.GetComponent.<Collider>().enabled=true;
	target8.GetComponent.<Collider>().enabled=false;				
}
else if(AiGps==8)
{
	RelativePosition=target8.position-transform.position;
	transform.rotation=Quaternion.LookRotation(RelativePosition);
	target1.GetComponent.<Collider>().enabled=false;
	target2.GetComponent.<Collider>().enabled=false;
	target3.GetComponent.<Collider>().enabled=false;
	target4.GetComponent.<Collider>().enabled=false;
	target5.GetComponent.<Collider>().enabled=false;
	target6.GetComponent.<Collider>().enabled=false;
	target7.GetComponent.<Collider>().enabled=false;
	target8.GetComponent.<Collider>().enabled=true;				
}
}