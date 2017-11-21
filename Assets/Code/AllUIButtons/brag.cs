using UnityEngine;
using System.Collections;

public class brag : MonoBehaviour {
	private const string FACEBOOK_APP_ID = "349468091882096";
	private const string FACEBOOK_URL = "http://www.facebook.com/dialog/feed";
	public float difficulty;
	public float achievedScore;
	public float sumcoins;
	public float sumcash;
	void start()
	{
		difficulty = PlayerPrefs.GetFloat("difficulty");
		achievedScore=PlayerPrefs.GetFloat("achievedscore");	
		sumcoins=PlayerPrefs.GetFloat("sumcoins");
		sumcash=PlayerPrefs.GetFloat("sumcash");
	}
	void ShareToFacebook(string linkParameter, string nameParameter, string captionParameter, string descriptionParameter, string pictureParameter, string redirectParameter)
	{
		Application.OpenURL(FACEBOOK_URL + "?app_id=" + FACEBOOK_APP_ID +
		                    "&link=" + WWW.EscapeURL(linkParameter) +
		                    "&name=" + WWW.EscapeURL(nameParameter) +
		                    "&caption=" + WWW.EscapeURL(captionParameter) +
		                    "&description=" + WWW.EscapeURL(descriptionParameter) +
		                    "&picture=" + WWW.EscapeURL(pictureParameter) +
		                    "&redirect_uri=" + WWW.EscapeURL(redirectParameter));
	}
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
		//facebook
		ShareToFacebook("https://www.facebook.com/codorpstudios", "Am playing BebaBeba",
		                "New High Score! BEAT THAT!",
		                "I got a Highscore of " + achievedScore + ", " +
		                sumcoins + " coins and a total amount of " +
		                sumcash + " Kshs" + " using an " +
		                "AI Difficulty of  Level " + difficulty +
		                " while transporting goods to their destinations.Beat that!",
		                "http://i.imgur.com/oDlszXS.png",
		                " http://www.facebook.com/");
	}
}
