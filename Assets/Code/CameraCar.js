#pragma strict
//Programmed by Hillario Haji
//CodOrps Interactive
//Intelligent Camera
var car:Transform;
	var distance:float=6f;
    var height:float=3f;
	var rotationDamping:float=3f;
	var heightDamping:float=3f;
	var zoomRatio:float=0.5f;
	private var rotationVector:Vector3;
	var defaultFOV:float=100f;		
function Start () {

}


function LateUpdate () {
var wantedAngel = rotationVector.y;
		var wantedHeight = car.position.y + height;
		var myangel = transform.eulerAngles.y;
		var myheight = transform.position.y;
		myangel = Mathf.LerpAngle (myangel, wantedAngel, rotationDamping * Time.deltaTime);
		myheight = Mathf.Lerp (myheight, wantedHeight, heightDamping * Time.deltaTime);
		var currentRotation = Quaternion.Euler (0f, myangel, 0f);
		transform.position = car.position;
		transform.position -= currentRotation * Vector3.forward * distance;
		transform.position.y=myheight;		
		transform.LookAt (car);
}
function FixedUpdate()
{
var localVelocity = car.InverseTransformDirection (car.GetComponent.<Rigidbody>().velocity);
		if (localVelocity.z < -0.5f) {
						rotationVector.y = car.eulerAngles.y + 180f;
				} else {
			rotationVector.y=car.eulerAngles.y;
				}
		var acc = car.GetComponent.<Rigidbody>().velocity.magnitude;
		GetComponent.<Camera>().fieldOfView = defaultFOV + acc * zoomRatio;
}
