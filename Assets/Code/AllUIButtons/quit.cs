using UnityEngine;
using System.Collections;

public class quit : MonoBehaviour {

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
		Application.Quit ();
	}
}
