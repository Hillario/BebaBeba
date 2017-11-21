#pragma strict
//script that rotates the UI car in the mainmenu
function Start () {

}

function Update () {
transform.Rotate(0,40*Time.deltaTime,0);
}