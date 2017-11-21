#pragma strict
//----Property of CodOrps Interactive
//----Programmed by Hillario Haji
//----This is the script of controlling the skidding sound of the car
//this is the read only friction value of the tyres
private var currentFriction:float;
var SkidSound:GameObject;
var SkidAt:float=1.5;
//var for controlling the amount of sound emitted
var SoundEmitted:float=15;
private var EmitWait:float;
//variables for skidMarks;
var markWidth:float=1.5;
private var skidding:int;//check if the skidmarks is generated once.
private var lastPos=new Vector3[2];//holding saved values of 2 and 3 in the hit.point array. 
var SkidMaterial:Material;
//variables for skidSmoke
var SkidSmoke:GameObject;
var SmokeDepth:float=0.4;
//MOTIONVALUE SCRIPT FROM THE CONTROLCAR CLASS
var MyMotion:int=0;
function Start () {
SkidSmoke.transform.position=transform.position;//set to the position of the wheel
SkidSmoke.transform.position.y-=SmokeDepth;//down on the y axis
}

function Update () {
MyMotion=ControlCar.MotionValue;
var hit:WheelHit;
transform.GetComponent(WheelCollider).GetGroundHit(hit);
//remove the negative values using the mathf absolute function.
currentFriction=Mathf.Abs(hit.sidewaysSlip);
//manipulate the skidsound
var rpm=transform.GetComponent(WheelCollider).rpm;
if(SkidAt<=currentFriction && EmitWait<=0 || rpm<300 && Input.GetAxis("Vertical")>0 && EmitWait<=0){
Instantiate(SkidSound,hit.point,Quaternion.identity);
EmitWait=1;
}
EmitWait-=Time.deltaTime*SoundEmitted;
if(SkidAt<=currentFriction || rpm<300 && Input.GetAxis("Vertical")>0){
//set the skidSmoke gameObject to true
SkidSmoke.GetComponent.<ParticleEmitter>().emit=true;
//invoke Skid mesh function
SkidMesh();
}
else{
SkidSmoke.GetComponent.<ParticleEmitter>().emit=false;
skidding=0;
}
}
function SkidMesh(){
var hit:WheelHit;
transform.GetComponent(WheelCollider).GetGroundHit(hit);
var mark:GameObject=new GameObject("Mark");
var filter:MeshFilter=mark.AddComponent(MeshFilter);
mark.AddComponent(MeshRenderer);
var markMesh:Mesh=new Mesh();
var vertices=new Vector3[4];
var triangles=new int[6];
if(skidding==0){
vertices[0]=hit.point+Quaternion.Euler(transform.eulerAngles.x,transform.eulerAngles.y,transform.eulerAngles.z)*Vector3(markWidth,0.2,0);
vertices[1]=hit.point+Quaternion.Euler(transform.eulerAngles.x,transform.eulerAngles.y,transform.eulerAngles.z)*Vector3(-markWidth,0.2,0);
vertices[2]=hit.point+Quaternion.Euler(transform.eulerAngles.x,transform.eulerAngles.y,transform.eulerAngles.z)*Vector3(-markWidth,0.2,0);
vertices[3]=hit.point+Quaternion.Euler(transform.eulerAngles.x,transform.eulerAngles.y,transform.eulerAngles.z)*Vector3(markWidth,0.2,0);
lastPos[0]=vertices[2];
lastPos[1]=vertices[3];
skidding=1;
}
else{
vertices[1]=lastPos[0];
vertices[0]=lastPos[1];
vertices[2]=hit.point+Quaternion.Euler(transform.eulerAngles.x,transform.eulerAngles.y,transform.eulerAngles.z)*Vector3(-markWidth,0.2,0);
vertices[3]=hit.point+Quaternion.Euler(transform.eulerAngles.x,transform.eulerAngles.y,transform.eulerAngles.z)*Vector3(markWidth,0.2,0);
lastPos[0]=vertices[2];
lastPos[1]=vertices[3];
}
triangles=[0,1,2,2,3,0];
markMesh.vertices=vertices;
markMesh.triangles=triangles;
markMesh.RecalculateNormals();
var uvm=new Vector2[markMesh.vertices.Length];
for(var i=0;i<uvm.length;i++){
uvm[i]=Vector2(markMesh.vertices[i].x,markMesh.vertices[i].z);
}
markMesh.uv=uvm;
filter.mesh=markMesh;
mark.GetComponent.<Renderer>().material=SkidMaterial;//add the texture to the skidMark Renderer
mark.AddComponent(Kill);
}