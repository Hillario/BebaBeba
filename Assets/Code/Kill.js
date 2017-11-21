#pragma strict
//----Property of CodOrps Interactive
//----programmed by Hillario Haji
//----Destroying a GameObject Script
var DestroyTime:float=2;
private var Timer:float;
function Start () {

}

function Update () {
Timer+=Time.deltaTime;
if(DestroyTime<=Timer){
Destroy(gameObject);
}
}
