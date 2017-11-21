using UnityEngine;
using System.Collections;

public class rotateLogo : MonoBehaviour {

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		transform.Rotate (0f, 100 * Time.deltaTime, 0,Space.World);
	}
}
