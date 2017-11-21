using UnityEngine;
using System.Collections;

public class extras : MonoBehaviour {
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
		Application.LoadLevel (4);
	}
}
