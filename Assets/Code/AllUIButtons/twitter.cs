using UnityEngine;
using System.Collections;

public class twitter : MonoBehaviour {

	void OnMouseEnter()
	{
		GetComponent<GUITexture>().color = Color.blue;
	}
	void OnMouseExit()
	{
		GetComponent<GUITexture>().color = Color.grey;
	}
	void OnMouseDown()
	{
		//like us on twitter
		Application.OpenURL("https://www.twitter.com/codorpsgames/");
	}	

}
